import React, { useState } from 'react';
import Usernav from './usernav';
import './Sidebar.css'; // Make sure to import the CSS file for styling
import Countcard from './countcard/Countcard';
import empimg from '../resources/emp.png'
import parking from '../resources/parking.png'
import event from '../resources/event.png'
import feedback from '../resources/feedback.png'
import stall from '../resources/stall.png'
import Deatailstatuscard from './parkingdetailstatuscard/parkingdetailcard';
import EventDetailcard from './Eventdetailscard/Eventdetailcard';
import workspace from '../resources/workspace.png'
import { Link } from 'react-router-dom';

type Props = {};

const Dashboard = (props: Props) => {
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
                            <a href="#">Brand</a>
                        </div>
                    </div>
                    <li><Link  to="/dashboard"><div >Dashboard</div></Link></li>
                    <li><Link  to="/employees"><div >Employees</div></Link></li>
                    <li><Link  to="/parking"><div >Parking</div></Link></li>
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
                            <Usernav />
                            <div className="dashboardtotalnumbers">
                                <Countcard color={'#D8F1FF'} imgscr={empimg} totalno={2134} totalnumberof={'Total no of Employees'} />
                                <Countcard color={'#E6CEF8'} imgscr={parking} totalno={2120} totalnumberof={'Total no of Parking slot'} />
                                <Countcard color={'#D5E2F1'} imgscr={workspace} totalno={4005} totalnumberof={'Total no of Workspace'} />
                                <Countcard color={'#D5F7D6'} imgscr={event} totalno={1241} totalnumberof={'Total no of Event Venue'} />
                                <Countcard color={'#FBE6D2'} imgscr={stall} totalno={7} totalnumberof={'Total no of Vendor Stall'} />
                            </div>
                            <div className="cardwithinfo">
                                
                                <EventDetailcard blockName='Parking'
                                    totalno={2120}
                                    occupied={1002}
                                    displyname={'Parking'}
                                />
                                <EventDetailcard blockName='Workspace'
                                    totalno={4005}
                                    occupied={3000}
                                    displyname={'Workspace'}
                                />
                                
                                <EventDetailcard blockName='Event Venue'
                                    totalno={43}
                                    occupied={12}
                                    displyname={'Vendor Stall'}
                                />
                                <EventDetailcard blockName='Vendor Stall'
                                    totalno={7}
                                    occupied={6}
                                    displyname={'Vendor Stall'}
                                />
                                
                                
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
