import React, { useEffect, useState } from 'react';
import VendorCard from './VendorCard';
import './vendorcard.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Dialog, DialogTitle, DialogActions, Button, Snackbar } from '@mui/material';

type Vendor = {
  _id: string;
  stallname: string;
  rent: number;
  imgurl: string;
  avalablestatus: boolean;
  bookings: any[];
};

type DecodedToken = {
  userId: string; 
  role: string;   
};

type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

const VendorUser: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [name, setName] = useState('');
  const [userId, setUserid] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errororsuccess, setErrororsuccess] = useState<AlertSeverity>('success');

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.userId;

        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setUserid(userResponse.data.user_id);
        setName(userResponse.data.name);
        setPhone(userResponse.data.phone);
       
      } catch (error) {
        console.error('Error fetching user role:', error);
      } 
    };

    fetchRole();
  }, []);
  
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/v1/vendorspaceavailable');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendors();
  }, [snackbarMessage]);

  const handleCardClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setDialogOpen(true);
  };

  const checkUserBooking = async (): Promise<boolean> => {
    if (!userId) return false;

    try {
      const bookingResponse = await axios.get(`http://localhost:3008/api/v1/vendor-spaces/user/${userId}`);
      return bookingResponse.data.length >= 1;
    } catch (error) {
      console.error("Error checking user bookings:", error);
      return false;
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedVendor || !userId) return;

    // Check if the user has already booked a vendor space
    const hasBooking = await checkUserBooking();

    if (hasBooking) {
      setSnackbarMessage('You have already booked a vendor space. Please cancel your current booking to book a new one.');
      setErrororsuccess("warning"); // Set alert severity to warning
      setSnackbarOpen(true);
      return;
    }

    // Proceed to book the vendor space
    try {
      const response = await axios.post(`http://localhost:3008/api/v1/vendor-space/book/${selectedVendor._id}`, {
        userid: userId,
        name,
        phone,
        bookeddate: new Date().toISOString(),
      });

      setSnackbarMessage(response.data.message);
      setErrororsuccess("success"); // Set alert severity to success
      setSnackbarOpen(true);
      setDialogOpen(false);

      // Update vendor availability
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor._id === selectedVendor._id ? { ...vendor, avalablestatus: false } : vendor
        )
      );
    } catch (error) {
      console.error("Error booking vendor space:", error);
      setSnackbarMessage('An error occurred while booking. Please try again.');
      setErrororsuccess("error"); // Set alert severity to error
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <div>
      <h1>Vendor List</h1>
      <div className="vendor-list">
        {vendors.map(vendor => (
          <VendorCard key={vendor._id} vendor={vendor} onClick={() => handleCardClick(vendor)} />
        ))}
      </div>

      {/* Dialog for confirming booking */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmBooking} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for showing success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default VendorUser;
