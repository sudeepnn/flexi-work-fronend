import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    MenuItem,
  } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';
  import AddIcon from '@mui/icons-material/Add';

// Define the types for the booking data
interface Booking {
  id: number;
  uid: string;
  name: string;
  parkingSlot: string;
  bookedTime: string;
  phone:number,
  bookingstatus: string;
}

// Sample booking data
const bookingData: Booking[] = [
  { id: 1, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 2, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 3, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 4, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 5, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 6, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 7, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 8, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 9, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 10, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
  { id: 11, uid: '123234', name: 'Sudeep Naik', parkingSlot: 'P-001', bookedTime: '24-01-2024 9:00 AM',phone:1234567890, bookingstatus: 'Success' },
];

const AdminParking: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    floor: '',
    parkingSlot: '',
    parkingType: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here (e.g., send data to API)
    console.log('Parking details submitted:', formData);
    handleClose(); // Close the dialog after submission
  };
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Parking Bookings</Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: isFocused ? '#016375' : 'gray',
              },
              '&:hover fieldset': {
                borderColor: isFocused ? '#016375' : 'darkgray',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#016375',
              },
            },
          }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />}
          onClick={handleClickOpen}
         sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}>
          Add Parking
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Box sx={{
            maxHeight: 400,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Parking Slot</TableCell>
                <TableCell>Booked Time</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Booking Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingData.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.uid}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.parkingSlot}</TableCell>
                  <TableCell>{booking.bookedTime}</TableCell>
                  <TableCell>{booking.phone}</TableCell>
                  <TableCell>{booking.bookingstatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      {/* Dialog for Adding Parking Details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Parking Slot Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="floor"
            label="Floor"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.floor}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="parkingSlot"
            label="Parking Slot No"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.parkingSlot}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="parkingType"
            label="Parking Type"
            fullWidth
            variant="outlined"
            value={formData.parkingType}
            onChange={handleChange}
          >
            <MenuItem value="2-wheeler">2-Wheeler</MenuItem>
            <MenuItem value="4-wheeler">4-Wheeler</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminParking;
