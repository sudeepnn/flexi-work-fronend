import React, { useState } from 'react';
import Usernav from '../admin/usernav';
import '../admin/Sidebar.css'; // Make sure to import the CSS file for styling

import { Link } from 'react-router-dom';

import Workspace from '../user/workspace';
import AdminWorkspace from '../admin/pages/adminWorkspace';
import logo from '../resources/logo.png'

type Props = {};
type userProps = {
    userid:string |null
};

export const UserWorkspace = (props: userProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="wrapper" className={isOpen ? 'toggled' : ''}>
            <div className="overlay" style={{ display: isOpen ? 'block' : 'none' }} onClick={toggleSidebar}></div>

            {/* Sidebar */}
            <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
                <ul className="sidebar-nav">
                    <div className="sidebar-header">
                        <div className="sidebar-brand">
                        <img src={logo} alt="" />
                        </div>
                    </div>
                    <li><Link  to="/dashboard"><div >Dashboard</div></Link></li>
                    <li><Link  to="/workspace"><div >Workspace</div></Link></li>
                    <li><Link  to="/parking"><div >Parking</div></Link></li>
                    <li><Link  to="/events"><div >Events</div></Link></li>
                    <li><Link  to="/feedback"><div >Feedback</div></Link></li>
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
                            <Usernav username={props.userid} />
                            
                              <Workspace/>
                                
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const AdminWorkspacedash = (props: userProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="wrapper" className={isOpen ? 'toggled' : ''}>
            <div className="overlay" style={{ display: isOpen ? 'block' : 'none' }} onClick={toggleSidebar}></div>

            {/* Sidebar */}
            <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
                <ul className="sidebar-nav">
                    <div className="sidebar-header">
                        <div className="sidebar-brand">
                        <img src={logo} alt="" />
                        </div>
                    </div>
                    <li><Link  to="/dashboard"><div >Dashboard</div></Link></li>
                    <li><Link  to="/employees"><div >Employees</div></Link></li>
                    <li><Link  to="/parking"><div >Parking</div></Link></li>
                    <li><Link  to="/workspace"><div >Workspace</div></Link></li>
                    <li><Link  to="/events"><div >Events</div></Link></li>
                    <li><Link  to="/vendor"><div >Vendorstall</div></Link></li>
                    <li><Link  to="/feedback"><div >Feedback</div></Link></li>
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
                            <Usernav username={props.userid} />
                            
                              {/* <AdminWorkspacecompo/> */}
                              {/* admin */}
                              <AdminWorkspace/>
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
