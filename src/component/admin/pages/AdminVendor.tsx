import React, { useEffect, useState } from 'react';
import VendorCard from './VendorCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './vendorcard.css';

type Vendor = {
    _id: string;
    stallname: string;
    rent: number;
    imgurl: string;
    avalablestatus: boolean;
    bookings: any[]; // Adjust the type based on the structure of bookings
};

const AdminVendor: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
    const [vendorBookings, setVendorBookings] = useState<any[]>([]); // For storing the bookings of the selected vendor
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('http://localhost:3008/api/v1/vendorspace');
                const data = await response.json();
                setVendors(data);
            } catch (error) {
                console.error("Error fetching vendor data:", error);
            }
        };

        fetchVendors();
    }, []);

    const handleCardClick = async (vendor: Vendor): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:3008/api/v1/vendorspace/${vendor._id}`);
            const data = await response.json();
            setVendorBookings(data.bookings); // Set the bookings from the response
            setSelectedVendorId(vendor._id); // Store the selected vendor ID
            setIsDialogOpen(true); // Open the dialog
        } catch (error) {
            console.error("Error fetching vendor details:", error);
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedVendorId(null);
        setVendorBookings([]); // Clear bookings when closing
    };

    // Define the VendorDialog component here
    const VendorDialog: React.FC = () => {
        return (
            <Dialog onClose={closeDialog} open={isDialogOpen}>
                <DialogTitle>Vendor Details</DialogTitle>
                <DialogContent>
                    {selectedVendorId && vendorBookings.length > 0 ? (
                        <ul>
                            {vendorBookings.map((booking) => (
                                <li key={booking.userid}>
                                    <p>User ID: {booking.userid}</p>
                                    <p>Name: {booking.name}</p>
                                    <p>Phone: {booking.phone}</p>
                                    <p>Booked Date: {new Date(booking.bookeddate).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <div>
            <h1>Vendor List</h1>
            <div className="vendor-list">
                {vendors.map(vendor => (
                    <VendorCard key={vendor._id} vendor={vendor} onClick={() => handleCardClick(vendor)} />
                ))}
            </div>
            <VendorDialog />
        </div>
    );
};

export default AdminVendor;
