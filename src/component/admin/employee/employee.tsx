import React, { useState, useEffect } from 'react';
import Usernav from '../usernav';
import '../Sidebar.css';
import Employeecard from './Employeecard';
import { Link } from 'react-router-dom';
import axios from 'axios';


type userResponse = {
    isOndcMember: boolean;
    project: string | null;
    manager: string | null;
    _id: string;
    user_id: string;
    password: string;
    email: string;
    name: string;
    phone: number;
    address: string;
    role: string;
    __v: number;
    profileImage: string;
  };
//   type UsersResponse = User[];
type Props = {};

const AdminEmployee = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<userResponse[]>([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch user data from the API
    axios.get('http://localhost:3001/api/v1/usersemp/')
      .then(response => setUsers(response.data))
      
      .catch(error => console.error('Error fetching users:', error));
      console.log(users)
  }, []);

  return (
    <div id="wrapper" className={isOpen ? 'toggled' : ''}>
      <div className="overlay" style={{ display: isOpen ? 'block' : 'none' }} onClick={toggleSidebar}></div>

      {/* Sidebar */}
      <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
        <ul className="sidebar-nav">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <a href="#">Brand</a>
            </div>
          </div>
          <li><Link  to="/dashboard"><div >Dashboard</div></Link></li>
                    <li><Link  to="/employees"><div >Employees</div></Link></li>
                    <li><Link  to="/parking"><div >Parking</div></Link></li>
                    <li><Link  to="/workspace"><div >Workspace</div></Link></li>
                    <li><Link  to="/venue"><div >Venue</div></Link></li>
                    <li><Link  to="/events"><div >Events</div></Link></li>
                    <li><Link  to="/vendor"><div >Vendorstall</div></Link></li>
                    <li><Link  to="/feedback"><div >Feedback</div></Link></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div id="page-content-wrapper">
        <button type="button" className={`hamburger ${isOpen ? 'is-open' : 'is-closed'}`} onClick={toggleSidebar}>
          <span className="hamb-top"></span>
          <span className="hamb-middle"></span>
          <span className="hamb-bottom"></span>
        </button>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              <Usernav username="admin" />
              <div className="row">
              <div className="employee-grid">
  {users.map(user => (
    <Employeecard
      key={user._id}
      profileImage={user.profileImage}
      username={user.name}
      email={user.email}
      phone={user.phone}
      address={user.address}
      project={user.project}
      manager={user.manager}
    />
  ))}
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployee;
