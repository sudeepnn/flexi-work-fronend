import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface Workspace {
  workspace_id: number;
  project: string;
  floor: number;
  availability: boolean;
}

const AdminWorkspace = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [open, setOpen] = useState(false); // State for Add Workspace dialog
  const [detailsOpen, setDetailsOpen] = useState(false); // State for details dialog
  const [detailsData, setDetailsData] = useState<any>(null); // Data for details dialog
  const [formData, setFormData] = useState({
    workspace_id: '',
    project: '',
    floor: '',
  });

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
      setDetailsData(response.data);
      setDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching workspace details:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ workspace_id: '', project: '', floor: '' });
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setDetailsData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3005/api/v1/workspace', {
        workspace_id: formData.workspace_id,
        project: formData.project,
        floor: parseInt(formData.floor),
      });
      handleClose();
      fetchWorkspaces();
    } catch (error) {
      console.error('Error submitting workspace:', error);
    }
  };

  // Group workspaces by project
  const groupedWorkspaces = workspaces.reduce((acc, workspace) => {
    (acc[workspace.project] = acc[workspace.project] || []).push(workspace);
    return acc;
  }, {} as Record<string, Workspace[]>);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Workspace Bookings</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ backgroundColor: '#016375', borderRadius: '15px' }}
        >
          Add Workspace
        </Button>
      </Box>

      {/* Display workspaces grouped by project */}
      {Object.keys(groupedWorkspaces).map((project) => (
        <Box key={project} mb={3}>
          <Typography variant="h6" gutterBottom>
            {project}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {groupedWorkspaces[project].map((workspace) => (
              <Button
                key={workspace.workspace_id}
                onClick={() => fetchWorkspaceDetails(workspace.workspace_id)}
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: workspace.availability ? 'green' : 'red',
                  color: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: workspace.availability ? '#006400' : '#8B0000',
                  },
                }}
              >
                {workspace.workspace_id}
              </Button>
            ))}
          </Box>
        </Box>
      ))}

      {/* Add Workspace Dialog */}
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
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle>Workspace Details</DialogTitle>
        <DialogContent>
          {detailsData ? (
            <Box>
              <Typography>Workspace ID: {detailsData.workspace_id}</Typography>
              <Typography>Name: {detailsData.name}</Typography>
              <Typography>Employee ID: {detailsData.user_id}</Typography>
              <Typography>Project: {detailsData.project}</Typography>
              <Typography>Floor: {detailsData.floor}</Typography>
              <Typography>Booking Date: {detailsData.Booking_start_time}</Typography>
            </Box>
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
