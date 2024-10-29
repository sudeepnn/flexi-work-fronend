import React from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
type Props = {}

const Feedback = (props: Props) => {
  const [feedback, setFeedback] = React.useState<string>(''); 
  return (
    <div className='parkingbook'>
      <h3>Feedback Form</h3>
     <form className="" >

     <FormControl fullWidth margin="normal">
            <InputLabel id="feedback-select-label">Feedback</InputLabel>
            <Select
              labelId="feedback-select-label"
              name="feedback"
              // value={formData.role}
              // onChange={handleChange}
              label="feedback"
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
        rows={4} // Number of rows for the textarea
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
    </div>
  )
}

export default Feedback