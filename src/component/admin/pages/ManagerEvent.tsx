import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Venue = {
  _id: string;
  venue_name: string;
  capacity: number;
  isAvailable: boolean;
  imgurl: string;
};

const ManagerEvent = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    venueId: ''
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/v1/venue');
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };

    fetchVenues();
  }, []);

  const openDialog = (venueId: string) => {
    setEventDetails({ ...eventDetails, venueId });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Event details submitted:', eventDetails);
    setIsDialogOpen(false);
  };

  const availableVenues = venues.filter(venue => venue.isAvailable);
  const notAvailableVenues = venues.filter(venue => !venue.isAvailable);

  return (
    <div className="adminevent">
      <h3>Event Venue List:</h3>

      <h4>Available Venues:</h4>
      <div className="allvenue">
        {availableVenues.map((venue: Venue) => (
          <VenueCard 
            key={venue._id} 
            venueName={venue.venue_name} 
            capacity={venue.capacity} 
            isAvailable={venue.isAvailable} 
            imgUrl={venue.imgurl} 
            onClick={() => openDialog(venue._id)} 
          />
        ))}
      </div>

      <h4>Not Available Venues:</h4>
      <div className="allvenue">
        {notAvailableVenues.map((venue: Venue) => (
          <VenueCard 
            key={venue._id} 
            venueName={venue.venue_name} 
            capacity={venue.capacity} 
            isAvailable={venue.isAvailable} 
            imgUrl={venue.imgurl} 
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Fill Event Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            name="eventName"
            fullWidth
            margin="dense"
            value={eventDetails.eventName}
            onChange={handleInputChange}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            margin="dense"
            value={eventDetails.startDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            fullWidth
            margin="dense"
            value={eventDetails.endDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagerEvent;
