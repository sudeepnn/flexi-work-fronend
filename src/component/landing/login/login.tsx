import React, { useState } from 'react';
import {
  TextField,
  Button,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './login.css';
import Nav from '../navtop';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Track password visibility
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/login', formData);
      console.log('User logged in successfully:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setShowError(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCloseSnackbar = () => {
    setShowError(false);
  };

  return (
    <div className='loginsignup'>
      <Nav option1='Home' link1='/' option2='Home' link2='/' />
      <div className="loginparent">
        <div className="left">
          <div className="welcomgrp">
            <h3>Welcome to Login</h3>
          </div>
        </div>
        <div className="right">
          <h3>Login</h3>
          <form className="inputs" onSubmit={handleSubmit}>
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
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
