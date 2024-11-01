import {
  Box,
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

type Props = {}
type DecodedToken = {
  userId: string; 
  role: string;   
};

const Workspace = (props: Props) => {
  const [projects, setProjects] = useState<{ [key: string]: string }>({});
  const [workspace, setWorkspace] = useState<{ [key: string]: string }[]>([]);
  const [floor, setFloor] = useState<string>('');
  const [name, setName] = useState('');
  const [user, setUserid] = useState('');
  const [formData, setFormData] = useState({
    project: '',
    floor: '',
    workspace: '',
    name: '',
    user_id: '',
    Booking_start_time: '', // Add Booking_start_time property
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Fetch user data from token
  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.userId;
        setUserid(userId);

        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setName(userResponse.data.name);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserFromToken();
  }, []);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/v1/workspaceProjects/');
        setProjects(response.data || {});
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Fetch floor when project selection changes
  useEffect(() => {
    if (formData.project) {
      fetchFloor();
    }
  }, [formData.project]);

  const fetchFloor = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/v1/workspace/floor/${formData.project}`);
      const fetchedFloor = response.data?.floor || '';
      setFloor(fetchedFloor);
      setFormData((prevFormData) => ({
        ...prevFormData,
        floor: fetchedFloor,
        name: name,
        user_id: user,
      }));
    } catch (error) {
      console.error("Error fetching floor:", error);
    }
  };

  // Fetch available workspaces
  useEffect(() => {
    if (formData.project && formData.floor) {
      fetchWorkspaceFloor();
    }
  }, [formData.project, formData.floor]);

  const fetchWorkspaceFloor = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/v1/workspace/available/${formData.project}/${formData.floor}`);
      setWorkspace(response.data || []);
    } catch (error) {
      console.error("Error fetching workspace:", error);
    }
  };

  // Handle form field changes
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

// Handle form submission
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault(); // Prevent default form submission
  const currentDateTime = new Date().toISOString(); // Get current date and time in ISO format

  // Set Booking_start_time in formData
  const dataToSend = {
    workspace_id: formData.workspace,  // Ensure correct naming
    user_id: formData.user_id,
    name: formData.name,
    Booking_start_time: currentDateTime,
    project: formData.project,
    floor: formData.floor,
  };

  console.log("Data to send to API:", dataToSend);

  try {
    const response = await axios.post('http://localhost:3005/api/v1/workspace/book/', dataToSend);
    setSnackbarMessage('Workspace booked successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  } catch (error) {
    console.error("Error booking workspace:",  error);
    setSnackbarMessage('Failed to book workspace. Please try again.');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  }
};


  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="parkingbook">
      <h3>Book A Workspace</h3>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="project-select-label">Project</InputLabel>
          <Select
            labelId="project-select-label"
            name="project"
            value={formData.project}
            onChange={handleChange}
            label="Project"
            required
          >
            {projects && Object.entries(projects).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Disabled TextField for Floor */}
        <TextField
          fullWidth
          margin="normal"
          label="Floor"
          value={floor}
          InputProps={{
            readOnly: true,
          }}
          disabled
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="workspace-select-label">Workspace</InputLabel>
          <Select
            labelId="workspace-select-label"
            name="workspace"
            value={formData.workspace}
            onChange={handleChange}
            label="Workspace"
            required
          >
            {workspace && Array.isArray(workspace) && workspace.map((item) => (
              <MenuItem key={item._id} value={item.workspace_id}>
                {item.workspace_id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          BookSlot
        </Button>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Workspace;
