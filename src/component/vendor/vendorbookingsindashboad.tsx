import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar'; // Assuming you're using Material-UI for Snackbar
import './vendorstyle.css'
type Props = {};
type DecodedToken = {
    userId: string; 
    role: string;   
};

interface Booking {
    userid: string;
    name: string;
    phone: number;
    bookeddate: Date;
    _id: string; // Added _id to use it for cancellation
}

interface VendorSpace {
    _id: string;
    stallname: string;
    rent: number;
    imgurl: string;
    avalablestatus: boolean;
    bookings: Booking[];
}

const Vendorbookingsindashboad = (props: Props) => {
    const [role, setRole] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [vendorSpaces, setVendorSpaces] = useState<VendorSpace[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // State for snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // State for snackbar message

    useEffect(() => {
        fetchRoleAndVendorSpaces(); // Initial fetch on component mount
    }, [snackbarMessage]);

    const fetchRoleAndVendorSpaces = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return; // Redirect will happen in the render
        }

        try {
            const decoded: DecodedToken = jwtDecode(token); // Decode the token
            const userId = decoded.userId;

            // Fetch the user role from your user data
            const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
            setUser(userResponse.data.name);
            setRole(userResponse.data.role);

            // Fetch vendor spaces based on user ID
            const vendorResponse = await axios.get(`http://localhost:3008/api/v1/vendor-spaces/user/${userId}`);
            setVendorSpaces(vendorResponse.data); // Set the vendor spaces data
        } catch (error) {
            console.error('Error fetching user role or vendor spaces:', error);
        } finally {
            setLoading(false); // Set loading to false after the requests are done
        }
    };

    const handleCancelBooking = async (vendorId: string, bookingId: string, userid: string) => {
        try {
            const response = await axios.delete(`http://localhost:3008/api/v1/vendorspacecancle/${vendorId}/${userid}`, { data: { bookingId } });
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true); // Open snackbar

           
        } catch (error) {
            console.error('Error canceling booking:', error);
            setSnackbarMessage('Failed to cancel booking');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Close the snackbar
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator
    }

    return (
        <div className="vendor-bookings-dashboard">
            <h2>Vendor Bookings </h2>
            <div className="card-container">
                {vendorSpaces.map(vendor => (
                    <div key={vendor._id} className="vendor-card">
                        <img src={vendor.imgurl} alt={vendor.stallname} />
                        <h2>{vendor.stallname}</h2>
                        <p>Rent: ₹{vendor.rent}</p>
                        <p>Status: {vendor.avalablestatus ? 'Available' : 'Not Available'}</p>
                        {vendor.bookings.length > 0 && (
                            <div>
                                <h3>Bookings:</h3>
                                {vendor.bookings.map(booking => (
                                    <div key={booking._id}>
                                        <p>Name: {booking.name}</p>
                                        <p>Phone: {booking.phone}</p>
                                        <p>Booked Date: {new Date(booking.bookeddate).toLocaleDateString()}</p>
                                        <button onClick={() => handleCancelBooking(vendor._id, booking._id, booking.userid)}>Cancel Booking</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                autoHideDuration={3000} // Auto-hide after 3 seconds
            />
        </div>
    );
};

export default Vendorbookingsindashboad;
