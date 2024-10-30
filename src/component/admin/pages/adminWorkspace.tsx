import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Workspace {
  workspace_id: number;
  project: string;
  floor: number;
  availability: boolean;
}

const AdminWorkspace = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false); // State for details dialog
  const [detailsData, setDetailsData] = useState<any>(null); // Data for details dialog
  const [formData, setFormData] = useState({
    workspace_id: '',
    project: '',
    floor: '',
  });
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/v1/workspace');
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const fetchWorkspaceDetails = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/v1/workspaceBooking/${id}`);
      setDetailsData(response.data); // Set details data
      setDetailsOpen(true); // Open details dialog
    } catch (error) {
      console.error('Error fetching workspace details:', error);
    }
  };

  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedId(null);
    setFormData({ workspace_id: '', project: '', floor: '' });
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false); // Close details dialog
    console.log(detailsData)
    setDetailsData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editMode && selectedId !== null) {
        await axios.put(`http://localhost:3005/api/v1/workspace/${selectedId}`, {
          workspace_id: formData.workspace_id,
          project: formData.project,
          floor: parseInt(formData.floor),
        });
      } else {
        await axios.post('http://localhost:3005/api/v1/workspace', {
          workspace_id: formData.workspace_id,
          project: formData.project,
          floor: parseInt(formData.floor),
        });
      }
      handleClose();
      fetchWorkspaces();
    } catch (error) {
      console.error('Error submitting workspace:', error);
    }
  };

  const handleEdit = (workspace: Workspace) => {
    setEditMode(true);
    setSelectedId(workspace.workspace_id);
    setFormData({
      workspace_id: workspace.workspace_id.toString(),
      project: workspace.project,
      floor: workspace.floor.toString(),
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3005/api/v1/workspace/${id}`);
      fetchWorkspaces();
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Workspace Bookings</Typography>
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          Add Workspace
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Workspace ID</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workspaces.map((workspace, index) => (
              <TableRow key={workspace.workspace_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{workspace.workspace_id}</TableCell>
                <TableCell>{workspace.project}</TableCell>
                <TableCell>{workspace.floor}</TableCell>
                <TableCell>{workspace.availability ? 'Available' : 'Unavailable'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(workspace)} color="primary" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(workspace.workspace_id)} color="secondary" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                  {!workspace.availability && (
                    <Button onClick={() => fetchWorkspaceDetails(workspace.workspace_id)} color="info">
                      Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Workspace Slot Details' : 'Add Workspace Slot Details'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="workspace_id"
            label="Workspace ID"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.workspace_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="project"
            label="Project"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.project}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="floor"
            label="Floor"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.floor}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle>Workspace Details</DialogTitle>
        <DialogContent>
          {detailsData ? (
            
            <div>
              <Typography>Workspace_id: {detailsData.workspace_id}</Typography>
              <Typography>Name: {detailsData.name}</Typography>
              <Typography>Employee Id: {detailsData.user_id}</Typography>
              <Typography>Project: {detailsData.project}</Typography>
              <Typography>Floor: {detailsData.floor}</Typography>
              <Typography>Booking Date: {detailsData.Booking_start_time}</Typography>
              
              
              
              {/* Add any other fields here */}
            </div>
          ) : (
            <Typography>Loading details...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminWorkspace;
