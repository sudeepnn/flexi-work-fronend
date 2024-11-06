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
  const [email, setEmail] = useState<string>('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);
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

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/forget-password', { user_id: formData.user_id });
      setSuccessMessage("Password reset link sent to your email.");
      setShowError(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset link.');
      setShowError(true);
    }
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
              autoHideDuration={1000}
              onClose={() => setShowError(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>

            {/* Snackbar for Success Message */}
            <Snackbar
              open={Boolean(successMessage)}
              autoHideDuration={1000}
              onClose={() => setSuccessMessage(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
                {successMessage}
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
            <Button
              fullWidth
              variant="text"
              onClick={handleForgotPassword} // Directly trigger forgot password
              //sx={{ color: '#016375' }}
            >
              Forgot Password?
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
