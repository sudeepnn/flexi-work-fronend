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
  const [formData, setFormData] = useState({
    workspace_id: '',
    project: '',
    floor: '',
  });
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  // Fetch workspaces when the component mounts
  useEffect(() => {
   

    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/v1/workspace');
      setWorkspaces(response.data); // Set the fetched workspaces
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Handle form submission logic here (send data to API)
    try {
      await axios.post('http://localhost:3005/api/v1/workspace', {
        workspace_id: formData.workspace_id,
        project: formData.project,
        floor: parseInt(formData.floor), // Ensure floor is an integer
      });
      console.log('Workspace details submitted:', formData);
      handleClose(); // Close the dialog after submission
      setFormData({ workspace_id: '', project: '', floor: '' }); // Reset form
      fetchWorkspaces();
      
    } catch (error) {
      console.error('Error submitting workspace:', error);
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding Workspace Details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Workspace Slot Details</DialogTitle>
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
            type="number" // Ensure the input is numeric
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
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminWorkspace;
