import React, { useEffect, useState } from 'react';
import Usernav from '../admin/usernav';
import '../admin/Sidebar.css';
import Countcard from '../admin/countcard/Countcard';
import empimg from '../resources/emp.png';
import parkingimg from '../resources/parking.png';
import event from '../resources/event.png';
import feedback from '../resources/feedback.png';
import stall from '../resources/stall.png';
import EventDetailcard from '../admin/Eventdetailscard/Eventdetailcard';
import workspaceimg from '../resources/workspace.png';
import { Link } from 'react-router-dom';
import ParkingCard from '../DashboardCards/ParkingCard';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import WorkspaceCard from '../DashboardCards/WorkspaceCard';

type Props = {};

type userProps = {
    userid: string | null;
};

type DecodedToken = {
    userId: string;
    role: string;
};

type parkingdetailscard = {
    _id: string;
    area: string;
    block: string;
    slot_number: string;
    floor: string;
    direction: string;
    parkingtype: string;
};

type worspacetype={
    _id: string;
    userId: string,
    name: string
    contact: string
    startTime: string
    workspace_id:string,
    project:string

}

export const Dashboard = (props: Props) => {
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
                    <li><Link to="/dashboard"><div>Dashboard</div></Link></li>
                    <li><Link to="/employees"><div>Employees</div></Link></li>
                    <li><Link to="/parking"><div>Parking</div></Link></li>
                    <li><Link to="/workspace"><div>Workspace</div></Link></li>
                    <li><Link to="/venue"><div>Venue</div></Link></li>
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
                            <div className="dashboardtotalnumbers">
                                <Countcard color="#D8F1FF" imgscr={empimg} totalno={2134} totalnumberof="Total no of Employees" />
                                <Countcard color="#E6CEF8" imgscr={parkingimg} totalno={2120} totalnumberof="Total no of Parking slot" />
                                <Countcard color="#D5E2F1" imgscr={workspaceimg} totalno={4005} totalnumberof="Total no of Workspace" />
                                <Countcard color="#D5F7D6" imgscr={event} totalno={1241} totalnumberof="Total no of Event Venue" />
                                <Countcard color="#FBE6D2" imgscr={stall} totalno={7} totalnumberof="Total no of Vendor Stall" />
                            </div>
                            <div className="cardwithinfo">
                                <EventDetailcard blockName="Parking" totalno={2120} occupied={1002} displyname="Parking" />
                                <EventDetailcard blockName="Workspace" totalno={4005} occupied={3000} displyname="Workspace" />
                                <EventDetailcard blockName="Event Venue" totalno={43} occupied={12} displyname="Vendor Stall" />
                                <EventDetailcard blockName="Vendor Stall" totalno={7} occupied={6} displyname="Vendor Stall" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UserDashboard = (props: userProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [userid, setUserid] = useState<string | null>(null);
    const [contactNumber, setContactNumber] = useState('');
    const [parkdetails, setParkDetails] = useState<parkingdetailscard[]>([]);
    const [workspacedetails, setWorkspacedetails] = useState<worspacetype[]>([]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchRole = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const userId = decoded.userId;

                const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
                setUser(userResponse.data.name);
                setContactNumber(userResponse.data.phone);
                setUserid(userId);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        const fetchParkingDetails = async () => {
            if (!userid) return;
            try {
                const parkingData = await axios.get(`http://localhost:3000/api/v1/parking/${userid}`);
                const parkingDetailsArray = parkingData.data.map((data: any) => ({
                    _id: data._id,
                    area: data.area,
                    block: data.block,
                    slot_number: data.slot_number,
                    floor: data.floor,
                    direction: data.direction,
                    parkingtype: data.parkingtype,
                }));
                setParkDetails(parkingDetailsArray);

            } catch (error) {
                console.error('Error fetching parking details:', error);
            }
        };
        const fetchworkDetails = async () => {
            if (!userid) return;
            try {
                const workdata = await axios.get(`http://localhost:3005/api/v1/bookings/user/${userid}`);
                const workdataArray = workdata.data.map((data: any) => ({
                    _id: data._id,
                    userId: data.userId,
                    name: data.name,
                    contact: data.contact,
                    startTime: data.startTime,
                    project:data.project,
                    workspace_id:data.workspace_id

                }));
                setWorkspacedetails(workdataArray);
                console.log(workdataArray)

            } catch (error) {
                console.error('Error fetching working details:', error);
            }
        };

        fetchRole();
        fetchParkingDetails();
        fetchworkDetails()
    }, [userid]);

    const handleCancel = async (_id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/parking/slot/${_id}`);
            setParkDetails(prevDetails => prevDetails.filter(parking => parking._id !== _id));
        } catch (error) {
            console.error('Error canceling parking slot:', error);
        }
    };

    const workspacehandleCancel = async (_id: string) => {
        try {
            await axios.delete(`http://localhost:3005/api/v1/workspaces/${_id}/bookings/${userid}`);
            setWorkspacedetails(prevDetails => prevDetails.filter(parking => parking.workspace_id !== _id));
        } catch (error) {
            console.error('Error canceling parking slot:', error);
        }
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
                    <li><Link to="/dashboard"><div>Dashboard</div></Link></li>
                    <li><Link to="/workspace"><div>Workspace</div></Link></li>
                    <li><Link to="/parking"><div>Parking</div></Link></li>
                    <li><Link to="/events"><div>Events</div></Link></li>
                    <li><Link to="/feedback"><div>Feedback</div></Link></li>
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
                            <Usernav username={user || 'User'} />
                            <div className="dashboardroute">
                                <div className="dashboardtotalnumbers">

                                    <div className="allparkingcard">
                                        
                                        <div className="parking-card-container">

                                            {parkdetails.map(parking => (
                                                <ParkingCard
                                                    color="#E6CEF8" heading="Parking" imgsrc={parkingimg}
                                                    key={parking._id}
                                                    {...parking}
                                                    onCancel={handleCancel}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="workspacecards">
                                        {workspacedetails.map(workspace=>(
                                             <WorkspaceCard
                                                 color="#D8F1FF" heading="Workspace" imgsrc={workspaceimg}
                                                 key={workspace.workspace_id}
                                                 {...workspace}
                                                 onCancel={workspacehandleCancel}
                                             />
     
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
