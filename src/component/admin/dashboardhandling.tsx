import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Dashboard, UserDashboard } from './Dashboard';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure you import jwt_decode

type DecodedToken = {
    userId: string; // Adjust according to your token structure
    role: string;   // Adjust according to your token structure
  };
type Props = {}

const Dashboardhandling: React.FC<Props> = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false); // Set loading to false since we're done checking for token
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
    // If role is not available (due to no token), redirect to login
    return <Navigate to="/login" />;
  }

  // Render different dashboards based on the role
  return role === 'admin' ? <Dashboard /> : <UserDashboard userid={user}   />;
};

export default Dashboardhandling;
