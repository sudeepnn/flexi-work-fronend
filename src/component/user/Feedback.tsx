import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

type Props = {};
type DecodedToken = {
  userId: string; 
  role: string;   
};

const Feedback = (props: Props) => {
  const [feedback, setFeedback] = useState<string>(''); 
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.userId;
        setUserId(userId);

        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setName(userResponse.data.name);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserFromToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      user_id: userId,
      type: feedbackType,
      message: feedback,
    };
    console.log(payload);

    try {
      const response = await axios.post('http://localhost:3002/api/v1/feedback', payload);
      console.log('Feedback submitted successfully:', response.data);

      // Reset the form fields
      setFeedback('');
      setFeedbackType('');
      setOpenSnackbar(true); // Show Snackbar on success
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='parkingbook'>
      <h3>Feedback Form</h3>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="feedback-select-label">Feedback</InputLabel>
          <Select
            labelId="feedback-select-label"
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
            label="Feedback"
            required
          >
            <MenuItem value="praise">Praise</MenuItem>
            <MenuItem value="help">Help</MenuItem>
            <MenuItem value="complain">Complain</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            label="Your Feedback"
            placeholder="Write your feedback here..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          Submit
        </Button>
      </form>

      {/* Snackbar for feedback submission success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Feedback;
