import React, { useState, useEffect } from 'react';
import Usernav from '../usernav';
import '../Sidebar.css';
import Employeecard from './Employeecard';
import { Link } from 'react-router-dom';
import axios from 'axios';

type employeeResponse = {
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

type Props = {};

const AdminEmployee = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<employeeResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const loadEmployees = async () => {
    if (loading || (totalPages && page > totalPages)) return;
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3001/api/v1/usersemp`, {
        params: { page, limit: 10 }
      });

      const { data, totalPages } = response.data;
      setEmployees(prevEmployees => [...prevEmployees, ...data]);
      setTotalPages(totalPages);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadEmployees();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, totalPages, loading]);

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
          <li><Link to="/dashboard"><div>Dashboard</div></Link></li>
          <li><Link to="/employees"><div>Employees</div></Link></li>
          <li><Link to="/parking"><div>Parking</div></Link></li>
          <li><Link to="/workspace"><div>Workspace</div></Link></li>
         
          <li><Link to="/events"><div>Events</div></Link></li>
          <li><Link to="/vendor"><div>Vendorstall</div></Link></li>
          <li><Link to="/feedback"><div>Feedback</div></Link></li>
          <li><Link to="/logout"><div>Logout</div></Link></li>
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
                  {employees.map(employee => (
                    <Employeecard
                      key={employee._id}
                      profileImage={employee.profileImage}
                      username={employee.name}
                      email={employee.email}
                      phone={employee.phone}
                      address={employee.address}
                      project={employee.project}
                      manager={employee.manager}
                    />
                  ))}
                </div>
                {loading && <div>Loading...</div>}
                {page > totalPages && <div>No more employees to load.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployee;
