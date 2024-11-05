import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../user/userdashboardcard.css';

type Props = {};
type DecodedToken = {
  userId: string;
  role: string;
};

type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

interface Workspace {
  _id: string;
  workspace_id: string;
  project: string;
  floor: number;
  availability: boolean;
}

const Workspace = (props: Props) => {
  const [project, setProject] = useState('');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [errororsuccess, setErrororsuccess] = useState<AlertSeverity>('success'); 

  // Fetch user data from token
  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);

        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${decoded.userId}`);
        setName(userResponse.data.name);
        setProject(userResponse.data.project);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserFromToken();
  }, []);

  useEffect(() => {
    if (project) fetchWorkspacesByProject();
  }, [project]);

  const fetchWorkspacesByProject = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/v1/workspace/basedonproject/${project}`);
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const handleWorkspaceClick = async (workspace: Workspace) => {
    if (workspace.availability) {
      try {
        const bookingResponse = await axios.get(`http://localhost:3005/api/v1/bookings/user/${userId}`);
        
        if (bookingResponse.data.length >= 1) {
          setErrorMessage('You have already booked a workspace. Please cancel your current booking to book a new one.');
          setErrororsuccess("warning"); // This now matches the Alert severity types
          setSnackbarOpen(true); 
          return; 
        }
        
        setSelectedWorkspace(workspace);
        setErrorMessage("Workspace booked successfully!");
        setErrororsuccess("success"); // This now matches the Alert severity types
        setOpenDialog(true);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedWorkspace) {
      const bookingData = {
        contact: "1232344561",
        name: name || "Employee",
        startTime: new Date().toISOString(),
        userId: userId,
      };

      try {
        await axios.put(`http://localhost:3005/api/v1/workspace/myworkspace/${selectedWorkspace._id}`, bookingData);
        setSnackbarOpen(true);
        fetchWorkspacesByProject(); // Refresh workspace data after booking
      } catch (error) {
        console.error('Error booking workspace:', error);
      }
    }
    setOpenDialog(false);
  };

  return (
    <div className="parkingbook">
      <h3>Book A Workspace</h3>
      <h3>{project}</h3>
      <div className="workspaceslots">
        <Box display="flex" flexWrap="wrap" gap={2}>
          {workspaces.map((workspace) => (
            <Button
              key={workspace._id}
              onClick={() => handleWorkspaceClick(workspace)}
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
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to book this workspace?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} color="primary" autoFocus>
            Yes, Book
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={errororsuccess}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Workspace;
