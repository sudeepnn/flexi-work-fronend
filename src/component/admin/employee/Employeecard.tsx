// Employeecard.tsx

import React from 'react';
import userimg from '../../resources/user.jpg'
type EmployeecardProps = {
  profileImage?: string;
  username: string;
  email: string;
  phone: number;
  address: string;
  project: string|null;
  manager: string|null;
};

const Employeecard = ({ profileImage, username, email, phone, address, project,manager }: EmployeecardProps) => {
  return (
    <div className="employeecard">
      <img src={profileImage || userimg} alt="Profile" />
      <h3>{username}</h3>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
      <p>Project: {project}</p>
      <p>manager: {manager}</p>
    </div>
  );
};

export default Employeecard;
