// LoginForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  SelectChangeEvent,
} from '@mui/material';
import './login.css';
import Nav from '../navtop';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
   
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate(); 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown }  > | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false); // Hide previous error message before submitting

    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/login', formData);
      console.log('User logged in successfully:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
    // localStorage.setItem('id', role);
      navigate("/dashboard");
      
      // Optionally, redirect to the dashboard or show a success message here
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setShowError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowError(false);
  };

  return (
    <div className='loginsignup'>
      <Nav option1='Home' link1='/' option2='Sign up' link2='/signup' />
      <div className="loginparent">
        <div className="left">
          <div className="welcomgrp">
            <h3>Welcome to Login</h3>
            {/* <h4>Create an account?</h4> */}
          </div>
          {/* <Link to="/signup" className="linktologin">
            <button>Sign up</button>
          </Link> */}
        </div>
        <div className="right">
          <h3>Login</h3>
          <form className="inputs" onSubmit={handleSubmit}>
            {/* Display custom Snackbar alert for errors */}
            <Snackbar
              open={showError}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
            <TextField
              className='signupinput'
              margin="normal"
              fullWidth
              name="user_id"
              label="User ID"
              type="text"
              value={formData.user_id}
              onChange={handleChange}
              required
            />
            <TextField
              className='signupinput'
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Designation</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Designation"
                required
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
