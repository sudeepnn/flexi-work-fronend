// SignUpForm.tsx
import React from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem, FormControl, InputLabel,
  
} from '@mui/material';
import './signup.css'
import Nav from '../navtop';
import { Link } from 'react-router-dom';
const SignUpForm: React.FC = () => {
  return (
   

    <div className='signup'>
      <Nav option1='Home' link1='/' option2='Login' link2='/login' ></Nav>

      <div className="parent">
        <div className="left">

          <div className="welcomgrp">
            <h3>Welcome to Sign up</h3>
            <h4>already have an account ?</h4>
          </div>
          <Link to="/login" className="linktologin">
          <button >Login</button> </Link>

        </div>
        <div className="right">
          <h3>
            Sign up
          </h3>
          <div className="inputs">
            <TextField className='signupinput'
              margin="normal"
              fullWidth
              name="UserID"
              label="UserID"
              type="text"
              id="userid"
            />

            <TextField className='signupinput'
              margin="normal"
              fullWidth
              name="Name"
              label="Name"
              type="text"
              id="name"
            />
            <TextField className='signupinput'
              margin="normal"
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField className='signupinput'
              margin="normal"
              fullWidth
              name="Email"
              label="Email"
              type="email"
              id="email"
            />
            <TextField className='signupinput'
              margin="normal"
              fullWidth
              name="Phone"
              label="Phone"
              type="tel"
              id="phone"
            />
            <TextField className='signupinput'
              margin="normal"
              fullWidth
              name="Address"
              label="Address"
              type="text"
              id="address"
              
            />
             <FormControl fullWidth margin="normal">
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          // value={role}
          // onChange={handleChange}s
          label="Role"
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Security">Security</MenuItem>
          
        </Select>
      </FormControl>

<Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
                backgroundColor:'#016375',
                borderRadius:'15px'
               }}
            >
              Sign Up
            </Button>

          </div>
        </div>
      </div>


    </div>
  );
};

export default SignUpForm;
