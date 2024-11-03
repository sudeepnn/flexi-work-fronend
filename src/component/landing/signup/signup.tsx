// SignUpForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Alert,
  Snackbar,
} from '@mui/material';
import './signup.css';
import Nav from '../navtop';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    email: '',
    name: '',
    phone: '',
    address: '',
    role: 'employee',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement | { name: string; value: string };
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false); // Hide previous error message before submitting
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/register', formData);
      console.log('User registered successfully:', response.data);
      navigate('/login');
      // Optionally, redirect or show a success message here
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'There was an error registering the user.');
      setShowError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowError(false);
  };

  return (
    <div className="signup">
      <Nav option1="Home" link1="/" option2="Login" link2="/login" />
      <div className="parent">
        <div className="left">
          <div className="welcomgrp">
            <h3>Welcome to Sign up</h3>
            <h4>Already have an account?</h4>
          </div>
          <Link to="/login" className="linktologin">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h3>Sign up</h3>
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
          <form className="inputs" onSubmit={handleSubmit}>
            <TextField
              className="signupinput"
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
              className="signupinput"
              margin="normal"
              fullWidth
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="phone"
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              className="signupinput"
              margin="normal"
              fullWidth
              name="address"
              label="Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {/* <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                required
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="security">Security</MenuItem>
              </Select>
            </FormControl> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
