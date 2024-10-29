import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface ParkingSlotProps {}

type DecodedToken = {
  userId: string; 
  role: string;   
};

const Parking: React.FC<ParkingSlotProps> = () => {
  const [floorNumber, setFloorNumber] = useState<string>(''); // Changed to string for Select
  const [slotNumber, setSlotNumber] = useState<string>(''); // Changed to string for Select
  const [vehicleNumber, setVehicleNumber] = useState<string>(''); // State for Vehicle Number
  const [contactNumber, setContactNumber] = useState<string>(''); // State for Contact Number
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [userphone, setUserphone] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

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
        setRole(userResponse.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Prepare data for the POST request
    const bookingData = {
      userId: userid, // assuming userId is stored in localStorage
      vehicalnumber: vehicleNumber,
      contact: userphone,
      startTime: new Date().toISOString(), // Current time as start time
      slot_number: slotNumber,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/parking/book', bookingData);
      console.log('Booking successful:', response.data);
      // Handle success (e.g., show a notification, redirect, etc.)
    } catch (error) {
      console.error('Error booking parking slot:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className='parkingbook'>
      <h3>Book A Parking Slot</h3>
      <form onSubmit={handleSubmit}> {/* Added onSubmit */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="floor-select-label">Floor</InputLabel>
          <Select
            labelId="floor-select-label"
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value as string)}
            label="Floor"
            required
          >
            <MenuItem value="1">Floor 1</MenuItem>
            <MenuItem value="2">Floor 2</MenuItem>
          </Select>
        </FormControl>

        <TextField
          className="signupinput"
          margin="normal"
          fullWidth
          label="Vehicle No"
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)} // Handle vehicle number change
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="vehical-select-label">Vehicle Type</InputLabel>
          <Select
            labelId="vehical-select-label"
            required
          >
            <MenuItem value="twowheeler">Two-Wheeler</MenuItem>
            <MenuItem value="fourwheeler">Four-Wheeler</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="slot-select-label">Parking Slot</InputLabel>
          <Select
            labelId="slot-select-label"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value as string)} // Handle slot number change
            required
          >
            <MenuItem value="SLOT-1">SLOT-1</MenuItem>
            <MenuItem value="slot212">slot212</MenuItem>
            <MenuItem value="SLOT-2">SLOT-2</MenuItem>
            {/* Add more slots as necessary */}
          </Select>
        </FormControl>

        

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          Book Slot
        </Button>
      </form>
    </div>
  );
};

export default Parking;
