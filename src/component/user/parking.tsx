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
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface ParkingSlotProps {}

type DecodedToken = {
  userId: string; 
  role: string;   
};

interface Floor {
  floor: number;
}

interface Slot {
  _id: string;
  slot_number: string;
  floor: number;
  parkingtype: string;
  available: boolean;
}

const Parking: React.FC<ParkingSlotProps> = () => {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [floorNumber, setFloorNumber] = useState<string>('');
  const [slotNumber, setSlotNumber] = useState<string>('');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [user, setUser] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [userphone, setUserphone] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState<boolean>(false); // Success Snackbar state

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const decoded: DecodedToken = jwtDecode(token); 
        const userId = decoded.userId;

        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setUser(userResponse.data.name);
        setUserid(userId);
        setUserphone(userResponse.data.phone);
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
    fetchFloors();
  }, []);

  const fetchFloors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/parkingFloors');
      setFloors(response.data);
    } catch (error) {
      console.error('Error fetching floors:', error);
    }
  };

  const fetchSlots = async (floorId: string, parkingType: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parking/floor/${floorId}?parkingtype=${parkingType}`);
      setSlots(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setSnackbarMessage('No available parking slots on this floor for the specified vehicle type.');
          setSnackbarOpen(true);
          setSlots([]); // Clear slots if there are none available
        } else {
          console.error('Error fetching slots:', error);
        }
      } else {
        console.error('Error fetching slots:', error);
      }
    }
  };

  const handleFloorChange = (event: SelectChangeEvent<string>) => {
    const selectedFloor = event.target.value as string;
    setFloorNumber(selectedFloor);
    setSlotNumber(''); // Clear selected slot
    setSlots([]); // Clear previous slots

    if (vehicleType) {
      fetchSlots(selectedFloor, vehicleType);
    }
  };

  const handleVehicleTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedVehicleType = event.target.value as string;
    setVehicleType(selectedVehicleType);
    setSlotNumber(''); // Clear selected slot
    setSlots([]); // Clear previous slots

    if (floorNumber) {
      fetchSlots(floorNumber, selectedVehicleType);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bookingData = {
      userId: userid,
      name: user,
      vehicalnumber: vehicleNumber,
      contact: userphone,
      startTime: new Date().toISOString(),
      slot_number: slotNumber,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/parking/book', bookingData);
      console.log('Booking successful:', response.data);
      setSnackbarSuccessOpen(true); // Show success Snackbar
      // Clear the form fields after successful booking
      setFloorNumber('');
      setSlotNumber('');
      setVehicleNumber('');
      setVehicleType('');
      setSlots([]); // Clear available slots
    } catch (error) {
      console.error('Error booking parking slot:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };

  return (
    <div className='parkingbook'>
      <h3>Book A Parking Slot</h3>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="floor-select-label">Floor</InputLabel>
          <Select
            labelId="floor-select-label"
            value={floorNumber}
            onChange={handleFloorChange}
            label="Floor"
            required
          >
            {floors.map(floor => (
              <MenuItem key={floor.floor} value={floor.floor.toString()}>
                {`Floor-${floor.floor}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="vehicaltype-select-label">Vehicle Type</InputLabel>
          <Select
            labelId="vehicaltype-select-label"
            value={vehicleType}
            onChange={handleVehicleTypeChange}
            required
          >
            <MenuItem value="2-wheeler">Two-Wheeler</MenuItem>
            <MenuItem value="4-wheeler">Four-Wheeler</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="Parking-slot-select-label">Parking Slot</InputLabel>
          <Select
            labelId="Parking-slot-select-label"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value as string)}
            required
          >
            {slots.map(slot => (
              <MenuItem key={slot._id} value={slot.slot_number}>
                {slot.slot_number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="signupinput"
          margin="normal"
          fullWidth
          label="Vehicle No"
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          Book Slot
        </Button>
      </form>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for success messages */}
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%' }}>
          Booking successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Parking;
