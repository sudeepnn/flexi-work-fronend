import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import userimg from '../resources/user.jpg';
import './admin.css';
import { jwtDecode } from 'jwt-decode';

type allprojecttype={
  projectname:string
}

type Props = {
  username: string | null;
};

const UserNav = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isOnDcMember, setIsOnDcMember] = useState('');
  const [project, setProject] = useState('');
  const [allproject, setAllproject] = useState('');
  const [manager, setManager] = useState('');
  const [profilePic, setProfilePic] = useState(userimg); // Default profile picture
  const [fileInput, setFileInput] = useState<File | null>(null); // State for file input
  const [user, setUserid] = useState<string | null>(null);
  type DecodedToken = {
    userId: string; 
    role: string;   
  };
  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');

      
      if (!token) {
        
        return; // Redirect will happen in the render
      }

      try {
        const decoded: DecodedToken = jwtDecode(token); // Decode the token
      //  console.log(decoded)
        const userId = decoded.userId;

        // Fetch the user role from your user data
        const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
        setUserid(userResponse.data.user_id);
        setProfilePic(userResponse.data.profileImage)
       
      } catch (error) {
        console.error('Error fetching user role:', error);
      } 
    };

    fetchRole();
  }, []);
  const handleClickOpen = async () => {
    // Fetch user details from the API
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/users/${user}`);
      const userData = response.data;
      // Update state with user data
      setEmail(userData.email);
      setName(userData.name);
      setAddress(userData.address);
      setPhone(userData.phone);
      setIsOnDcMember(userData.isOnDcMember); // Assuming isOnDcMember is a boolean in the response
      setProject(userData.project);
      setManager(userData.manager);
      console.log(isOnDcMember)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFileInput(null); // Reset file input state when closing
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file);
      setProfilePic(newProfilePic);
      setFileInput(file); // Store the file
    }
  };

  const handleUpdate = async () => {
    try {
      let profileImageUrl = profilePic;

      if (fileInput) {
        const formData = new FormData();
        formData.append('profileImage', fileInput);
        formData.append('user_id', user || '');

        const uploadResponse = await axios.post('http://localhost:3001/api/v1/update-profile-image', formData);
        profileImageUrl = uploadResponse.data.profileImageUrl;
      }

      const userData = {
        user_id: user || '',
        //email,
        //name,
        phone,
        address,
        // role: 'user', // Set according to your app logic
        profileImage: profileImageUrl,
        isOndcMember: isOnDcMember ,
        project,
        manager,
      };

      await axios.put(`http://localhost:3001/api/v1/user/update-user`, userData);
      console.log(userData)
      handleClose();
    } catch (error) {
      console.error('Error updating user data:', error);
      console.log(error)
    }
  };

  return (
    <div className="nav">
      <div className="navleft">
        <Link className='link' to="">
          <div className='username'>{props.username}</div>
        </Link>
        <Link className='userimg' to="" onClick={handleClickOpen}>
          <img src={profilePic} alt="User" className="circular-image" />
        </Link>
      </div>

      <Dialog open={open} onClose={handleClose} PaperProps={{
        style: { width: '700px' }, // Custom width for the dialog
    }}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent >
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <img src={profilePic} alt="Profile" className="circular-image" />
        </div>

        <div className="user-details-container">
            <div className="detail-item">
                <strong>Name:</strong> <span>{props.username || 'N/A'}</span>
            </div>
            <div className="detail-item">
                <strong>UID:</strong> <span>{user || 'N/A'}</span>
            </div>
            <div className="detail-item">
                <strong>Email:</strong> <span>{email || 'N/A'}</span>
            </div>
            <div className="detail-item">
                <strong>Address:</strong> <span>{address || 'N/A'}</span>
            </div>
            <div className="detail-item">
                <strong>Phone:</strong> <span>{phone || 'N/A'}</span>
            </div>
            <div className="detail-item">
                <strong>Is ODC Member:</strong> <span>{ isOnDcMember == 'true' ? 'Yes' : 'No'}</span>
            </div>
            <div className="detail-item">
                <strong>Project:</strong> <span>{project || 'N/A'}</span>
            </div>
            <div className="detail-item">
                <strong>Manager:</strong> <span>{manager || 'N/A'}</span>
            </div>
        </div>
    </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleUpdate} color="primary">
            Update
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserNav;