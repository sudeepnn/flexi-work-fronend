import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface ParkingSlotProps {
  // onSlotAdded: (floorNumber: number, startTime: Date, endTime: Date, slotNumber: number) => void;
}

const Parking: React.FC<ParkingSlotProps> = ({  }) => {
  const [floorNumber, setFloorNumber] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [slotNumber, setSlotNumber] = useState<number>(0);

  const handleFloorNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFloorNumber(event.target.value as number);
  };

  const handleStartTimeChange = (newStartTime: Date | null) => {
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (newEndTime: Date | null) => {
    setEndTime(newEndTime);
  };

  const handleSlotNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSlotNumber(event.target.value as number);
  };

  const handleBookSlot = () => {
    if (startTime && endTime) {
      // onSlotAdded(floorNumber, startTime, endTime, slotNumber);
      setFloorNumber(0);
      setStartTime(null);
      setEndTime(null);
      setSlotNumber(0);
    }
  };

  return (
    <div className='parkingbook'>
      <h3>Book A Parking Slot</h3>
       <form className="" >

      <TextField
              className='signupinput'
              margin="normal"
              fullWidth
              name="floor"
              label="floor"
              type="text"
              // value={formData.password}
              // onChange={handleChange}
              required
            />
    <TextField
              className='signupinput'
              margin="normal"
              fullWidth
              name="StartTime"
              label="StartTime"
              type="datetime-local"
              // value={formData.password}
              // onChange={handleChange}
              required
            />
    <TextField
              className='signupinput'
              margin="normal"
              fullWidth
              name="EndTime"
              label="EndTime"
              type="datetime-local"
              // value={formData.password}
              // onChange={handleChange}
              required
            />

<FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                name="slot"
                // value={formData.role}
                // onChange={handleChange}
                label="Slot"
                required
              >
                <MenuItem value="P1">P1</MenuItem>
                <MenuItem value="P23">P23</MenuItem>
                <MenuItem value="P238">P238</MenuItem>
                <MenuItem value="P123">P123</MenuItem>
                <MenuItem value="P323">P323</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
            >
              Login
            </Button>
            </form>
    </div>
  );
};

export default Parking;