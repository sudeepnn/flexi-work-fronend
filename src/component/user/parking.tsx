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


interface ParkingSlotProps {
  // onSlotAdded: (floorNumber: number, startTime: Date, endTime: Date, slotNumber: number) => void;
}

const Parking: React.FC<ParkingSlotProps> = ({  }) => {
  const [floorNumber, setFloorNumber] = useState<number>(0);
  // const [startTime, setStartTime] = useState<Date | null>(null);
  // const [endTime, setEndTime] = useState<Date | null>(null);
  const [slotNumber, setSlotNumber] = useState<number>(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // // Get today's date in YYYY-MM-DDTHH:MM format to disable past dates
  // const getTodayDate = (): string => {
  //   const today = new Date();
  //   const yyyy = today.getFullYear();
  //   const mm = String(today.getMonth() + 1).padStart(2, '0');
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   const hh = String(today.getHours()).padStart(2, '0');
  //   const min = String(today.getMinutes()).padStart(2, '0');
  //   return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  // };

  // // Calculate the minimum date and time for the end date (3 hours after start date)
  // const getMinEndDate = (start: string): string => {
  //   if (!start) return getTodayDate();
  //   const startDate = new Date(start);
  //   startDate.setHours(startDate.getHours() + 3); // Add 3 hours to start date
  //   const yyyy = startDate.getFullYear();
  //   const mm = String(startDate.getMonth() + 1).padStart(2, '0');
  //   const dd = String(startDate.getDate()).padStart(2, '0');
  //   const hh = String(startDate.getHours()).padStart(2, '0');
  //   const min = String(startDate.getMinutes()).padStart(2, '0');
  //   return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  // };
  const handleFloorNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFloorNumber(event.target.value as number);
  };

  // const handleStartTimeChange = (newStartTime: Date | null) => {
  //   setStartDates(newStartTime);
  // };

  // const handleEndTimeChange = (newEndTime: Date | null) => {
  //   setEndTime(newEndTime);
  // };

  const handleSlotNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSlotNumber(event.target.value as number);
  };

  // const handleBookSlot = () => {
  //   if (startTime && endTime) {
  //     // onSlotAdded(floorNumber, startTime, endTime, slotNumber);
  //     setFloorNumber(0);
  //     setStartTime(null);
  //     setEndTime(null);
  //     setSlotNumber(0);
  //   }
  // };

  return (
    <div className='parkingbook'>
      <h3>Book A Parking Slot</h3>
       <form className="" >

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
                <MenuItem value="floor1">floor-1</MenuItem>
                <MenuItem value="floor2">floor-2</MenuItem>
                
              </Select>
            </FormControl>
            {/* <TextField
        className="signupinput"
        margin="normal"
        fullWidth
        name="StartTime"
        label="Start Date and Time"
        type="datetime-local"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          setEndDate(''); // Clear end date to force re-selection if needed
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: getTodayDate(), // Disable past dates
        }}
        required
      />
      <TextField
        className="signupinput"
        margin="normal"
        fullWidth
        name="EndTime"
        label="End Date and Time"
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: getMinEndDate(startDate), // Set end date to be at least 3 hours after start date
        }}
        required
      /> */}

<FormControl fullWidth margin="normal">
              <InputLabel id="type-select-label">Vehical Type</InputLabel>
              <Select
                labelId="type-select-label"
                name="type"
                // value={formData.role}
                // onChange={handleChange}
                label="type"
                required
              >
                <MenuItem value="twowheeler">Two-Wheeler</MenuItem>
                <MenuItem value="fourwheeler">Four-Wheeler</MenuItem>
                
              </Select>
            </FormControl>
<FormControl fullWidth margin="normal">
              <InputLabel id="slot-select-label">Parking-slot</InputLabel>
              <Select
                labelId="slot-select-label"
                name="slot"
                // value={formData.role}
                // onChange={handleChange}
                label="slot"
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
              BookSlot
            </Button>
            </form>
    </div>
  );
};

export default Parking;