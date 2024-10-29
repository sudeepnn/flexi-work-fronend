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

const EventsRegister = (props: Props) => {
  return (
    <div className='parkingbook'>
      <h3>Register for a Event</h3>
     <form className="" >

     <FormControl fullWidth margin="normal">
            <InputLabel id="project-select-label">Events</InputLabel>
            <Select
              labelId="project-select-label"
              name="project"
              // value={formData.role}
              // onChange={handleChange}
              label="project"
              required
            >
              <MenuItem value="training">AI session</MenuItem>
              <MenuItem value="floor2">Talk on Java</MenuItem>
              <MenuItem value="floor3">Java Spring boot-3</MenuItem>
              <MenuItem value="floor4">Microservices</MenuItem>
              <MenuItem value="floor5">React</MenuItem>
              
            </Select>
          </FormControl>

          <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="venue"
              label="Venue"
              type="text"
              value="Founders Hall"
              // onChange={handleChange}
              disabled
            />
            <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="venue"
              label="start date"
              type="text"
              value="Start Date"
              // onChange={handleChange}
              disabled
            />
            <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="venue"
              label="End Date"
              type="text"
              value="End Date"
              // onChange={handleChange}
              disabled
            />
  
  

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
          >
            Register
          </Button>
          </form>
    </div>
  )
}

export default EventsRegister