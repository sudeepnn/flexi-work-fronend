import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

type Props = {}

type DecodedToken = {
  userId: string;
  role: string;
};

// Update Event interface to reflect the structure of the data you are receiving
interface Event {
  _id: string;
  event_name: string;
  organizer_id: string;
  venue_id: { 
    _id: string;
    venue_name: string;
  };
  start_time: string;
  end_time: string;
  event_attendees: any[];
  __v: number;
}

const EventsRegister = (props: Props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [venueName, setVenueName] = useState<string>('');
  const [userId, setUserid] = useState<string>('');

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
          const decoded: DecodedToken = jwtDecode(token);
          const userId = decoded.userId;

          const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
          setUserid(userId);
      } catch (error) {
          console.error('Error fetching user role:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/v1/allVenues');
        const data: Event[] = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchRole();
    fetchEvents();
  }, []);

  const handleEventChange = (event: SelectChangeEvent<string>) => {
    const eventId = event.target.value;
    const eventDetails = events.find(e => e._id === eventId) || null;
    setSelectedEvent(eventDetails);

    if (eventDetails) {
      setVenueName(eventDetails.venue_id.venue_name);
    } else {
      setVenueName('');
    }
  };

  const handleRegister = async () => {
    if (!selectedEvent) {
      setSnackbarSeverity('error');
      setSnackbarMessage("Please select an event to register.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/api/v1/event/register', {
        event_id: selectedEvent._id,
        user_id: userId,
      });


      if (response.status === 201) {
        setSnackbarSeverity('success');
        setSnackbarMessage("Successfully registered for the event!");
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage("Failed to register for the event. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setSnackbarSeverity('error');
      setSnackbarMessage("An error occurred. Please try again later.");
    } finally {
      setSnackbarOpen(true); // Open the snackbar regardless of success or failure
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = (
    event: globalThis.Event | React.SyntheticEvent<any, globalThis.Event>
  ) => {
    
    setSnackbarOpen(false);
  };

  return (
    <div className='parkingbook'>
      <h3>Register for an Event</h3>
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel id="project-select-label">Events</InputLabel>
          <Select
            labelId="project-select-label"
            name="project"
            value={selectedEvent ? selectedEvent._id : ''}
            onChange={handleEventChange}
            label="Events"
            required
          >
            {Array.isArray(events) && events.length > 0 ? (
              events.map(event => (
                <MenuItem key={event._id} value={event._id}>
                  {event.event_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No events available</MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          className="signupinput"
          margin="normal"
          fullWidth
          name="venue"
          label="Venue"
          type="text"
          value={venueName}
          disabled
        />
        <TextField
          className="signupinput"
          margin="normal"
          fullWidth
          name="start_date"
          label="Start Date"
          type="text"
          value={selectedEvent ? selectedEvent.start_time : ''}
          disabled
        />
        <TextField
          className="signupinput"
          margin="normal"
          fullWidth
          name="end_date"
          label="End Date"
          type="text"
          value={selectedEvent ? selectedEvent.end_time : ''}
          disabled
        />

        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EventsRegister;
