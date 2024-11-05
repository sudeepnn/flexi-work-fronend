import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface Slot {
  _id: string;
  slot_number: string;
  direction: string;
  available: boolean;
}

type DecodedToken = {
  userId: string;
  role: string;
};

const ParkingLayout: React.FC = () => {
  const [floorNumber, setFloorNumber] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [blocks, setBlocks] = useState<string[]>([]);
  const [selectedBlock, setSelectedBlock] = useState('');
  const [eastSlots, setEastSlots] = useState<Slot[]>([]);
  const [westSlots, setWestSlots] = useState<Slot[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State for modal
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null); // Selected slot for booking
  const [vehicleNumber, setVehicleNumber] = useState(''); // Vehicle number input
  const [contactNumber, setContactNumber] = useState(''); // Contact number input

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.userId;

        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setUser(userResponse.data.name);
        setContactNumber(userResponse.data.phone);
        setUserid(userId);

      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchRole();
  }, []);

  const toggleBooking = async () => {
    if (!selectedSlot) return;

    try {
      const bookingData = {
        userId: userid,  // Ensure this is set from the decoded token
        name: user,      // User name fetched from the API
        vehicalnumber: vehicleNumber, // User's vehicle number
        contact: contactNumber,        // User's contact number
        startTime: new Date().toISOString(), // Current time in ISO format
        _id: selectedSlot._id // The ID of the selected slot
      }
      console.log(bookingData)
      // Assuming a backend API call for booking the slot
      const response = await axios.post(`http://localhost:3000/api/v1/parking/book`, bookingData);
      console.log(response.data);

      // Update local state to reflect booking changes
      setEastSlots(eastSlots.map(s => (s._id === selectedSlot._id ? { ...s, available: false } : s)));
      setWestSlots(westSlots.map(s => (s._id === selectedSlot._id ? { ...s, available: false } : s)));
      setArea('');
      setSelectedFloor('');
      setVehicleType('');
      setBlocks([]);
      setSelectedBlock('');
      handleClose(); // Close the modal after booking

    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  const handleSlotClick = (slot: Slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setVehicleNumber('');
    setContactNumber('');
    setSelectedSlot(null);
  };

  const handleAreaChange = async (event: SelectChangeEvent<string>) => {
    const selectedArea = event.target.value;
    setArea(selectedArea);

    // Reset dependent states
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

    // Reset blocks, vehicle type, and slots when floor changes
    setVehicleType('');
    setBlocks([]);
    setSelectedBlock('');
    setEastSlots([]);
    setWestSlots([]);
  };

  const handleVehicleTypeChange = async (event: SelectChangeEvent<string>) => {
    const selectedVehicleType = event.target.value;
    setVehicleType(selectedVehicleType);

    // Reset blocks and slots when vehicle type changes
    setBlocks([]);
    setSelectedBlock('');
    setEastSlots([]);
    setWestSlots([]);

    await fetchBlocks(area, selectedFloor, selectedVehicleType);
  };

  const handleBlockChange = async (event: SelectChangeEvent<string>) => {
    const selectedBlock = event.target.value;
    setSelectedBlock(selectedBlock);

    // Reset slots when block changes
    setEastSlots([]);
    setWestSlots([]);

    await fetchSlots(area, selectedFloor, vehicleType, selectedBlock);
  };

  const fetchFloors = async (selectedArea: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parkingFloor/${selectedArea}`);
      const floors = response.data.floors || [];
      setFloorNumber(floors);
    } catch (error) {
      console.error('Error fetching floors:', error);
      setFloorNumber([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlocks = async (selectedArea: string, selectedFloor: string, selectedVehicleType: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parking/block/${selectedArea}/${selectedFloor}/${selectedVehicleType}`);
      const blocksData = response.data.blocks || [];
      setBlocks(blocksData);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (selectedArea: string, selectedFloor: string, selectedVehicleType: string, selectedBlock: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/parkingSlots/${selectedArea}/${selectedFloor}/${selectedVehicleType}/${selectedBlock}`);
      const slots = response.data.slots || [];
      const east = slots.filter((slot: Slot) => slot.direction === 'E');
      const west = slots.filter((slot: Slot) => slot.direction === 'W');

      setEastSlots(east);
      setWestSlots(west);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setEastSlots([]);
      setWestSlots([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="parkhead">
        <h2>Parking</h2>
      </div>

      <div className="parkcontent">
        {loading && <CircularProgress />}

        <div className="formscontainer">
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="block-select-label">Block</InputLabel>
            <Select
              labelId="block-select-label"
              value={selectedBlock}
              onChange={handleBlockChange}
              label="Block"
              required
            >
              {blocks.map((block) => (
                <MenuItem key={block} value={block}>
                  {block}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Parking Slots */}
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
              <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', // 7 slots per row
    gap: '10px',
    justifyContent: 'center',
  }}
>
  {eastSlots.map((slot) => (
    <div
      key={slot._id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: slot.available ? '#e6f7e6' : '#f7e6e6',
      }}
    >
      <input
        type="checkbox"
        checked={!slot.available}
        disabled
        style={{
          marginBottom: '8px',
          transform: 'scale(1.2)',
        }}
      />
      <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {slot.slot_number}
      </label>
      <Button
        variant="contained"
        onClick={() => handleSlotClick(slot)}
        sx={{
          height: '35px',
          bgcolor: slot.available ? 'darkgreen' : 'darkred',
          color: 'white',
          '&:hover': {
            bgcolor: slot.available ? 'darkgreen' : 'darkred',
          },
        }}
        disabled={!slot.available}
        fullWidth
      >
        Park
      </Button>
    </div>
  ))}
</div>

              </div>

              {/* West Slots */}
              <div className="downslots">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)', // 7 slots per row
                    gap: '10px',
                    justifyContent: 'center',
                  }}
                >
                  {westSlots.map((slot) => (
                    <div
                      key={slot._id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        backgroundColor: slot.available ? '#e6f7e6' : '#f7e6e6',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!slot.available}
                        disabled
                        style={{
                          marginBottom: '8px',
                          transform: 'scale(1.2)',
                        }}
                      />
                      <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        {slot.slot_number}
                      </label>
                      <Button
                        variant="contained"
                        onClick={() => handleSlotClick(slot)}
                        sx={{
                          height: '35px',
                          bgcolor: slot.available ? 'darkgreen' : 'darkred',
                          color: 'white',
                          '&:hover': {
                            bgcolor: slot.available ? 'darkgreen' : 'darkred',
                          },
                        }}
                        disabled={!slot.available}
                        fullWidth
                      >
                        Park
                      </Button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Vehicle Number and Contact */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Slot {selectedSlot?.slot_number}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Vehicle Number"
            type="text"
            fullWidth
            variant="outlined"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Contact Number"
            type="text"
            fullWidth
            variant="outlined"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={toggleBooking} color="primary" disabled={!vehicleNumber || !contactNumber}>
            Book
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default ParkingLayout;
