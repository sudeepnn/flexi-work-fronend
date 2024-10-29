import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Paper,
  Snackbar,  // Import Snackbar
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
import Alert from '@mui/material/Alert'; // Import Alert
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface Booking {
  userId?: string;
  vehicalnumber: string;
  contact: number;
  startTime: Date;
  slot_number: string;
  _id: string;
}

interface AllBookingDetails {
  _id: string;
  slot_number: string;
  floor: number;
  parkingtype: string;
  available: boolean;
  booking: Booking;
}

const AdminParking: React.FC = () => {
  const [bookings, setBookings] = useState<AllBookingDetails[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<AllBookingDetails | null>(null);
  const [formData, setFormData] = useState({
    floor: '',
    parkingSlot: '',
    parkingType: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/parking')
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching parking data:', error));
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:3000/api/v1/parking')
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching parking data:', error));
  };

  const handleClickOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleClickOpenEdit = (booking: AllBookingDetails) => {
    setSelectedBooking(booking);
    setFormData({
      floor: booking.floor.toString(),
      parkingSlot: booking.slot_number,
      parkingType: booking.parkingtype,
    });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setFormData({ floor: '', parkingSlot: '', parkingType: '' });
    setOpenEdit(false);
    setSelectedBooking(null);
  };
  
  const handleClickOpenView = (booking: AllBookingDetails) => {
    setSelectedBooking(booking);
    setOpenView(true);
  };
  const handleCloseView = () => {
    setOpenView(false);
    setSelectedBooking(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/v1/parking', {
      floor: formData.floor,
      parkingtype: formData.parkingType,
      slot_number: formData.parkingSlot,
    })
      .then((response) => {
        // Fetch bookings again to refresh the list
        fetchBookings();
        setFormData({ floor: '', parkingSlot: '', parkingType: '' });
        handleCloseAdd();
        setSnackbarMessage('Parking slot added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error submitting parking data:', error);
        setSnackbarMessage('Failed to add parking slot.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };
  const handleEditBooking = () => {
    if (selectedBooking) {
      axios.put(`http://localhost:3000/api/v1/parking/${selectedBooking._id}`, {
        floor: formData.floor,
        parkingtype: formData.parkingType,
        slot_number: formData.parkingSlot,
      })
        .then((response) => {
          const updatedBookings = bookings.map((b) => (b._id === selectedBooking._id ? response.data : b));
          setBookings(updatedBookings);
          setFormData({ floor: '', parkingSlot: '', parkingType: '' });
          handleCloseEdit();
        })
        .catch((error) => console.error('Error editing booking:', error));
    }
  };

  const handleDeleteBooking = (id: string) => {
    axios.delete(`http://localhost:3000/api/v1/parking/${id}`)
      .then(() => setBookings(bookings.filter((b) => b._id !== id)))
      .catch((error) => console.error('Error deleting booking:', error));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
              '& fieldset': { borderColor: isFocused ? '#016375' : 'gray' },
              '&:hover fieldset': { borderColor: isFocused ? '#016375' : 'darkgray' },
              '&.Mui-focused fieldset': { borderColor: '#016375' },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpenAdd}
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          Add Parking
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Parking Slot</TableCell>
                <TableCell>Floor</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Booking Status</TableCell>
                <TableCell>Actions</TableCell> {/* Added Actions Column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={booking._id} >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{booking.slot_number}</TableCell>
                  <TableCell>{booking.floor}</TableCell>
                  <TableCell>{booking.parkingtype}</TableCell>
                  <TableCell>{booking.available ? 'Available' : 'Booked'}</TableCell>
                  <TableCell>
                    { (
                      <>
                        { !booking.available && <Button onClick={() => handleClickOpenView(booking)} color="primary">Details</Button>}
                        <Button onClick={() => handleClickOpenEdit(booking)} color="primary">Edit</Button>
                        <Button onClick={() => handleDeleteBooking(booking._id)} color="secondary">Delete</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      {/* Add Parking Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Parking Slot Details</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="floor" label="Floor" fullWidth variant="outlined" value={formData.floor} onChange={handleChange} />
          <TextField margin="dense" name="parkingSlot" label="Parking Slot No" fullWidth variant="outlined" value={formData.parkingSlot} onChange={handleChange} />
          <TextField select margin="dense" name="parkingType" label="Parking Type" fullWidth variant="outlined" value={formData.parkingType} onChange={handleChange}>
            <MenuItem value="2-wheeler">2-Wheeler</MenuItem>
            <MenuItem value="4-wheeler">4-Wheeler</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Parking Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Parking Slot Details</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="floor" label="Floor" fullWidth variant="outlined" value={formData.floor} onChange={handleChange} />
          <TextField margin="dense" name="parkingSlot" label="Parking Slot No" fullWidth variant="outlined" value={formData.parkingSlot} onChange={handleChange} />
          <TextField select margin="dense" name="parkingType" label="Parking Type" fullWidth variant="outlined" value={formData.parkingType} onChange={handleChange}>
            <MenuItem value="2-wheeler">2-Wheeler</MenuItem>
            <MenuItem value="4-wheeler">4-Wheeler</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEditBooking}>Save</Button>
        </DialogActions>
      </Dialog>

     

<Dialog open={openView} onClose={handleCloseView}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <>
              <Typography variant="body1"><strong>Slot Number:</strong> {selectedBooking.slot_number}</Typography>
              <Typography variant="body1"><strong>Floor:</strong> {selectedBooking.floor}</Typography>
              <Typography variant="body1"><strong>Type:</strong> {selectedBooking.parkingtype}</Typography>
              <Typography variant="body1"><strong>Booking Status:</strong> {selectedBooking.available ? 'Available' : 'Booked'}</Typography>
              {selectedBooking.booking && (
                <>
                  <Typography variant="body1"><strong>User ID:</strong> {selectedBooking.booking.userId}</Typography>
                  <Typography variant="body1"><strong>Vehicle Number:</strong> {selectedBooking.booking.vehicalnumber}</Typography>
                  <Typography variant="body1"><strong>Contact:</strong> {selectedBooking.booking.contact}</Typography>
                  <Typography variant="body1"><strong>Start Time:</strong> {new Date(selectedBooking.booking.startTime).toLocaleString()}</Typography>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminParking;
