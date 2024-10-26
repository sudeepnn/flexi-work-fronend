// SignUpForm.tsx
import React from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem, FormControl, InputLabel,
  
} from '@mui/material';
import './login.css'
import Nav from '../nav';
import { Link } from 'react-router-dom';
const LoginForm: React.FC = () => {

  

  return (
   

    <div className='loginsignup'>
      <Nav option1='Home' link1='/' option2='Sign up' link2='/signup' ></Nav>

      <div className="loginparent">
        <div className="left">

          <div className="welcomgrp">
            <h3>Welcome to Login</h3>
            <h4>Create an account ?</h4>
          </div>
          <Link to="/signup" className="linktologin">
          <button >Sign up</button> </Link>

        </div>
        <div className="right">
          <h3>
            Login
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
              name="Password"
              label="Password"
              type="password"
              id="password"
            />
           
             <FormControl fullWidth margin="normal">
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          // value={role}
          // onChange={handleChange}s
          label="Role"
        >
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Vendor">Vendor</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Security">Security</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
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

export default LoginForm;
