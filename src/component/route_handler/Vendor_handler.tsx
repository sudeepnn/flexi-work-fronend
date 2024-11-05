import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Dashboard } from '../dashboards/Dashboard';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { AdminEventDash, UserEventDash } from '../dashboards/event_dash';
import { VendorAdminDash, VendoruserDash } from '../dashboards/vendor_dash';

type DecodedToken = {
    userId: string; 
    role: string;   
  };
type Props = {}

const Vendorhandler = (props: Props) => {
    const [role, setRole] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
  
    useEffect(() => {
      const fetchRole = async () => {
        const token = localStorage.getItem('token');
  
        if (!token) {
          setLoading(false);
          return; // Redirect will happen in the render
        }
  
        try {
          const decoded: DecodedToken = jwtDecode(token); // Decode the token
         console.log(decoded)
          const userId = decoded.userId;
  
          // Fetch the user role from your user data
          const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
          setUser(userResponse.data.name);
          setRole(userResponse.data.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        } finally {
          setLoading(false); // Set loading to false after the request is done
        }
      };
  
      fetchRole();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // Optionally show a loading state while fetching data
    }
  
    if (!role) {
      return <Navigate to="/login" />;
    }
    switch (role) {
      case 'admin':
        return <VendorAdminDash userid={"admin"} /> ;
        case 'security':
        return <div>No access</div>;
        case 'employee':
        return <div>No access</div>;
        case 'manager':
        return <div>No access</div>;
      case 'vendor':
        return <VendoruserDash userid={user}   />;
        default:
          return <div>No access</div>;
    }
    // Render different dashboards based on the role
   
  };


export default Vendorhandler;