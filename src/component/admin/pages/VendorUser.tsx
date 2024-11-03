import React, { useEffect, useState } from 'react';
import VendorCard from './VendorCard';
import './vendorcard.css';
import {jwtDecode} from 'jwt-decode';
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


const VendorUser: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [name, setName] = useState('');
  const [userId, setUserid] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleConfirmBooking = async () => {
    if (!selectedVendor || !userId) return;

    try {
      const response = await axios.post(`http://localhost:3008/api/v1/vendor-space/book/${selectedVendor._id}`, {
        userid: userId,
        name,
        phone,
        bookeddate: new Date().toISOString(),
      });

      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      setDialogOpen(false);

      // Refresh vendor data or update availability of the selected vendor
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor._id === selectedVendor._id ? { ...vendor, avalablestatus: false } : vendor
        )
      );
    } catch (error) {
      console.error("Error booking vendor space:", error);
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
