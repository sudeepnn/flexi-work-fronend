import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, InputLabel, FormControl, Select, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

interface Slot {
  _id: string;
  slot_number: string;
  direction: string;
  available: boolean;
}

interface BookingDetails {
  userId: string;
  name: string;
  vehicalnumber: string;
  contact: number;
  startTime: string;
}

const ParkingLayout: React.FC = () => {
  const [floorNumber, setFloorNumber] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [blocks, setBlocks] = useState<string[]>([]);
  const [selectedBlock, setSelectedBlock] = useState('');
  const [eastSlots, setEastSlots] = useState<Slot[]>([]);
  const [westSlots, setWestSlots] = useState<Slot[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const showdetails = async (slotId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parkingslotdetails/${slotId}`);
      const slotData = response.data;

      // Open dialog only if the slot is booked (i.e., not available)
      if (!slotData.available && slotData.booking) {
        setBookingDetails(slotData.booking);
        setDialogOpen(true);
      } else {
        console.log("This slot is available. No booking details.");
      }
    } catch (error) {
      console.error('Error fetching slot details:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setBookingDetails(null);
  };

  const handleAreaChange = async (event: SelectChangeEvent<string>) => {
    const selectedArea = event.target.value;
    setArea(selectedArea);
    setFloorNumber([]);
    setSelectedFloor('');
    setVehicleType('');
    setBlocks([]);
    setSelectedBlock('');
    setEastSlots([]);
    setWestSlots([]);
    await fetchFloors(selectedArea);
  };

  const handleFloorChange = async (event: SelectChangeEvent<string>) => {
    const selectedFloor = event.target.value;
    setSelectedFloor(selectedFloor);
    setVehicleType('');
    setBlocks([]);
    setSelectedBlock('');
    setEastSlots([]);
    setWestSlots([]);
  };

  const handleVehicleTypeChange = async (event: SelectChangeEvent<string>) => {
    const selectedVehicleType = event.target.value;
    setVehicleType(selectedVehicleType);
    setBlocks([]);
    setSelectedBlock('');
    setEastSlots([]);
    setWestSlots([]);
    await fetchBlocks(area, selectedFloor, selectedVehicleType);
  };

  const handleBlockChange = async (event: SelectChangeEvent<string>) => {
    const selectedBlock = event.target.value;
    setSelectedBlock(selectedBlock);
    setEastSlots([]);
    setWestSlots([]);
    await fetchSlots(area, selectedFloor, vehicleType, selectedBlock);
  };

  const fetchFloors = async (selectedArea: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parkingFloor/${selectedArea}`);
      setFloorNumber(response.data.floors || []);
    } catch (error) {
      console.error('Error fetching floors:', error);
      setFloorNumber([]);
    }
  };

  const fetchBlocks = async (selectedArea: string, selectedFloor: string, selectedVehicleType: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parking/block/${selectedArea}/${selectedFloor}/${selectedVehicleType}`);
      setBlocks(response.data.blocks || []);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      setBlocks([]);
    }
  };

  const fetchSlots = async (selectedArea: string, selectedFloor: string, selectedVehicleType: string, selectedBlock: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parkingSlots/${selectedArea}/${selectedFloor}/${selectedVehicleType}/${selectedBlock}`);
      const slots = response.data.slots || [];
      setEastSlots(slots.filter((slot: Slot) => slot.direction === 'E'));
      setWestSlots(slots.filter((slot: Slot) => slot.direction === 'W'));
    } catch (error) {
      console.error('Error fetching slots:', error);
      setEastSlots([]);
      setWestSlots([]);
    }
  };

  return (
    <>
      <div className="parkhead">
        <h2>Parking</h2>
      </div>

      <div className="parkcontent">
        <div className="formscontainer">
          {/* Area Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="area-select-label">Area</InputLabel>
            <Select
              labelId="area-select-label"
              name="area"
              value={area}
              onChange={handleAreaChange}
              label="Area"
              required
            >
              <MenuItem value="Front-Gate">Front Gate</MenuItem>
              <MenuItem value="MLCP">MLCP</MenuItem>
            </Select>
          </FormControl>

          {/* Floor Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="floor-select-label">Floor</InputLabel>
            <Select
              labelId="floor-select-label"
              value={selectedFloor}
              onChange={handleFloorChange}
              label="Floor"
              required
            >
              {floorNumber.map((floor, index) => (
                <MenuItem key={index} value={floor}>
                  {floor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Vehicle Type Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="vehicle-type-select-label">Vehicle Type</InputLabel>
            <Select
              labelId="vehicle-type-select-label"
              value={vehicleType}
              onChange={handleVehicleTypeChange}
              label="Vehicle Type"
              required
            >
              <MenuItem value="2-wheeler">2-wheeler</MenuItem>
              <MenuItem value="4-wheeler">4-wheeler</MenuItem>
            </Select>
          </FormControl>

          {/* Block Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="block-select-label">Block</InputLabel>
            <Select
              labelId="block-select-label"
              value={selectedBlock}
              onChange={handleBlockChange}
              label="Block"
              required
            >
              {blocks.map((block, index) => (
                <MenuItem key={index} value={block}>
                  {block}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Display Selected Block and Slots */}
        {selectedBlock && (
          <div className="completeblock">
            <div className="blockname">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid black',
                  height: '100px',
                  bgcolor: 'yellow',
                }}
              >
                <Typography variant="h6" sx={{ color: 'black' }}>{selectedBlock}</Typography>
              </Box>
            </div>
            <div className="parkingslots">
              {/* East Slots */}
              <div className="topslots">
                {eastSlots.map((slot) => (
                  <Button
                    key={slot._id}
                    variant="contained"
                    onClick={() => showdetails(slot._id)}
                    sx={{
                      height: '50px',
                      bgcolor: slot.available ? 'darkgreen' : 'darkred',
                      color: 'white',
                      '&:hover': {
                        bgcolor: slot.available ? 'darkgreen' : 'darkred'
                      }
                    }}
                    fullWidth
                  >
                    {slot.slot_number}
                  </Button>
                ))}
              </div>

              {/* West Slots */}
              <div className="downslots">
                {westSlots.map((slot) => (
                  <Button
                    key={slot._id}
                    variant="contained"
                    onClick={() => showdetails(slot._id)}
                    sx={{
                      height: '50px',
                      bgcolor: slot.available ? 'darkgreen' : 'darkred',
                      color: 'white',
                      '&:hover': {
                        bgcolor: slot.available ? 'darkgreen' : 'darkred'
                      }
                    }}
                    fullWidth
                  >
                    {slot.slot_number}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialog for Booking Details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {bookingDetails ? (
            <>
              <Typography>User ID: {bookingDetails.userId}</Typography>
              <Typography>Name: {bookingDetails.name}</Typography>
              <Typography>Vehicle Number: {bookingDetails.vehicalnumber}</Typography>
              <Typography>Contact: {bookingDetails.contact}</Typography>
              <Typography>Start Time: {bookingDetails.startTime}</Typography>
            </>
          ) : (
            <Typography>No booking details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParkingLayout;
