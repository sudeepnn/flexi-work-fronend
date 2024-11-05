import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from 'axios';

type FeedbackRes = {
  _id: number; // Make sure this matches your backend ID type
  user_id: string;
  type: string;
  message: string;
  respondedByAdmin?: boolean;
};

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackRes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState<number | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/feedback');
        setFeedback(response.data);
      } catch (err) {
        setError('Error fetching feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleResponseOpen = (id: number) => {
    setCurrentFeedbackId(id);
    setOpenDialog(true);
  };

  const handleResponseClose = () => {
    setOpenDialog(false);
    setResponseText(''); // Clear response text when dialog closes
  };

  const handleSubmitResponse = async () => {
    if (currentFeedbackId) {
      try {
        // Here you would typically send the response to your backend
        await axios.post(`http://localhost:3002/api/v1/feedback/respond/${currentFeedbackId}`, {
          response: responseText,
        });
        console.log(`Responded to feedback with ID: ${currentFeedbackId}`);
        handleResponseClose(); // Close the dialog after submission
      } catch (error) {
        console.error('Error submitting response:', error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2, marginRight: 3, paddingLeft: 3 }}>
      <Typography variant="h4" gutterBottom>
        Feedback
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Response */}
      <Dialog open={openDialog} onClose={handleResponseClose}>
        <DialogTitle>Respond to Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Your Response"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResponseClose}>Cancel</Button>
          <Button onClick={handleSubmitResponse} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminFeedback;
