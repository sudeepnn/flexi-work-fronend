import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Snackbar, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type VenueRes = {
  _id: string;
  venue_name: string;
  capacity: number;
  isAvailable: boolean;
};

const VenueList = () => {
  const [venues, setVenues] = useState<VenueRes[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<VenueRes | null>(null);
  const [venueName, setVenueName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });

  const fetchVenues = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/v1/venue');
      setVenues(response.data);
    } catch (error) {
      console.error("Failed to fetch venues", error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleAddOrUpdateVenue = async () => {
    try {
      const data = { venue_name: venueName, capacity: parseInt(capacity) };

      if (isEditing && selectedVenue) {
        await axios.put(`http://localhost:3003/api/v1/venueupdate/${selectedVenue._id}`, data);
        setSnackbar({ open: true, message: 'Venue updated successfully!', type: 'success' });
      } else {
        await axios.post('http://localhost:3003/api/v1/venue', data);
        setSnackbar({ open: true, message: 'Venue added successfully!', type: 'success' });
      }

      setOpenDialog(false);
      setVenueName('');
      setCapacity('');
      setSelectedVenue(null);
      setIsEditing(false);
      fetchVenues();
    } catch (error) {
      setSnackbar({ open: true, message: `Failed to ${isEditing ? 'update' : 'add'} venue`, type: 'error' });
    }
  };

  const handleEditVenue = (venue: VenueRes) => {
    setVenueName(venue.venue_name);
    setCapacity(venue.capacity.toString());
    setSelectedVenue(venue);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteVenue = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3003/api/v1/venuedelete/${id}`);
      setSnackbar({ open: true, message: 'Venue deleted successfully!', type: 'success' });
      fetchVenues();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete venue', type: 'error' });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Venue List</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { setOpenDialog(true); setIsEditing(false); setVenueName(''); setCapacity(''); }}
        style={{ float: 'right', marginBottom: 10 }}
      >
        Add Venue
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Venue Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((venue) => (
              <TableRow key={venue._id}>
                <TableCell>{venue.venue_name}</TableCell>
                <TableCell>{venue.capacity}</TableCell>
                <TableCell>{venue.isAvailable ? 'Available' : 'Not Available'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditVenue(venue)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteVenue(venue._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? 'Edit Venue' : 'Add New Venue'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Venue Name"
            type="text"
            fullWidth
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdateVenue} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default VenueList;
