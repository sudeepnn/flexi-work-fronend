// Logout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage or local storage
    localStorage.removeItem('token'); // Replace 'sessionKey' with your actual key
    // Redirect to the login page or home page
    navigate('/login'); // Adjust the path as needed
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
