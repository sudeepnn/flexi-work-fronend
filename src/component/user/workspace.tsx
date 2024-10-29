import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React from 'react'

type Props = {}

const Workspace = (props: Props) => {
  return (
    <div className='parkingbook'>
    <h3>Book A Workspace</h3>
     <form className="" >

     <FormControl fullWidth margin="normal">
            <InputLabel id="project-select-label">Project</InputLabel>
            <Select
              labelId="project-select-label"
              name="project"
              // value={formData.role}
              // onChange={handleChange}
              label="project"
              required
            >
              <MenuItem value="training">Training</MenuItem>
              <MenuItem value="floor2">Project-1</MenuItem>
              <MenuItem value="floor2">Project-2</MenuItem>
              <MenuItem value="floor2">Project-3</MenuItem>
              <MenuItem value="floor2">Project-4</MenuItem>
              
            </Select>
          </FormControl>
  {/* <TextField
            className='signupinput'
            margin="normal"
            fullWidth
            name="StartTime"
            label="StartTime"
            type="datetime-local"
            InputLabelProps={{
              shrink: true, // This will prevent the placeholder from showing the default date format
            }}
            // value={formData.password}
            // onChange={handleChange}
            required
          /> */}
  
{/* <TextField
className="signupinput"
margin="normal"
fullWidth
name="EndTime"
label="EndTime"
type="datetime-local"
InputLabelProps={{
  shrink: true, // This will prevent the placeholder from showing the default date format
}}
required
/> */}

<FormControl fullWidth margin="normal">
            <InputLabel id="floor-select-label">Floor</InputLabel>
            <Select
              labelId="floor-select-label"
              name="floor"
              // value={formData.role}
              // onChange={handleChange}
              label="floor"
              required
            >
              <MenuItem value="twowheeler">Floor-1</MenuItem>
              <MenuItem value="fourwheeler">Floor-2</MenuItem>
              
            </Select>
          </FormControl>
<FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Workspace</InputLabel>
            <Select
              labelId="workspace-select-label"
              name="workspace"
              // value={formData.role}
              // onChange={handleChange}
              label="workspace"
              required
            >
              <MenuItem value="P1">workspace-1</MenuItem>
              <MenuItem value="P23">workspace-23</MenuItem>
              <MenuItem value="P238">workspace-238</MenuItem>
              <MenuItem value="P123">workspace-123</MenuItem>
              <MenuItem value="P323">workspace-323</MenuItem>
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
  </div>
  )
}

export default Workspace