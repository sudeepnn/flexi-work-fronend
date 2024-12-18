import React, { useEffect, useState } from 'react';
import Usernav from '../admin/usernav';
import '../admin/Sidebar.css';
import Countcard from '../admin/countcard/Countcard';
import empimg from '../resources/emp.png';
import parkingimg from '../resources/parking.png';
import eventimg from '../resources/event.png';
import feedbackimg from '../resources/feedback.png';
import stall from '../resources/stall.png';
import EventDetailcard from '../admin/Eventdetailscard/Eventdetailcard';
import workspaceimg from '../resources/workspace.png';
import { Link } from 'react-router-dom';
import ParkingCard from '../DashboardCards/ParkingCard';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import WorkspaceCard from '../DashboardCards/WorkspaceCard';
import Vendorbookingsindashboad from '../vendor/vendorbookingsindashboad';
import SecurityDashdetails from '../security/SecurityDashdetails';
import EventCard from '../DashboardCards/EventCard';
import NoBookingCard from '../DashboardCards/NoBookingCard';
import logo from '../resources/logo.png'
import Eventdetaildashcard from '../DashboardCards/eventdetaildashCard';
import CustomPieChart from '../charts/CustomPieChart'
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

type worspacetype = {
    _id: string;
    userId: string,
    name: string
    contact: string
    startTime: string
    workspace_id: string,
    project: string

}

type eventDetailsType = {
    _id: string;         // Unique identifier for the event
    event_name: string;  // Name of the event
    organizer_id: string; // ID of the organizer
    venue_id: string;    // ID of the venue
    start_time: string;  // Start time of the event (can be a date string)
    end_time: string;
    imgurl: string;
    venue_name: string;  // End time of the event (can be a date string)
};

export const Dashboard = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [totalpkcnt, setTotalpkcnt] = useState(0);
    const [totalpkoccupied, setTotalpkoccupied] = useState(0);
    const [totalwkcnt, setTotalwkcnt] = useState(0);
    const [totalwkunoccupied, setTotalwkunoccupied] = useState(0);
    const [totalvendorcnt, setTotalvendorcnt] = useState(0);
    const [totalvendorunoccupied, setTotalvendorunoccupied] = useState(0);
    const [totalEmp, setemployeecnt] = useState(0);
    const [totalMan, setmanagercnt] = useState(0);
    const [eventcount, setEventcount] = useState(0);
    const [eventvenueavacount, setEventvenueavacount] = useState(0);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/usersemp/counts');
                setemployeecnt(response.data.totalEmployees);
                setmanagercnt(response.data.totalManagers);
                const parkingresponse = await axios.get('http://localhost:3000/api/v1//parkingcntdetails');
                setTotalpkoccupied(parkingresponse.data.notAvailableCount);
                setTotalpkcnt(parkingresponse.data.totalSlots)
                const workspaceresponse = await axios.get('http://localhost:3005/api/v1/workspacescntdetails');
                setTotalwkunoccupied(workspaceresponse.data.availableCount);
                setTotalwkcnt(workspaceresponse.data.totalSlots)
                const vendorresponse = await axios.get('http://localhost:3008/api/v1/vendorspacecntdetails');
                setTotalvendorunoccupied(vendorresponse.data.availableCount);
                setTotalvendorcnt(vendorresponse.data.totalSlots)
                const venueresponse = await axios.get('http://localhost:3003/api/v1/count');
                setEventcount(venueresponse.data.count);
                setEventvenueavacount(venueresponse.data.availableSpace)
            } catch (error) {
                console.error('Error fetching employee count:', error);
            }
        })()
    }, [])

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
                            <div className="dashboardtotalnumbers">
                                <Countcard color="#D8F1FF" imgscr={empimg} totalno={totalEmp + totalMan} totalnumberof="Total no of Employees" />
                                <Countcard color="#E6CEF8" imgscr={parkingimg} totalno={totalpkcnt} totalnumberof="Total no of Parking slot" />
                                <Countcard color="#D5E2F1" imgscr={workspaceimg} totalno={totalwkcnt} totalnumberof="Total no of Workspace" />
                                <Countcard color="#D5F7D6" imgscr={eventimg} totalno={eventcount} totalnumberof="Total no of Event Venue" />
                                <Countcard color="#FBE6D2" imgscr={stall} totalno={totalvendorcnt} totalnumberof="Total no of Vendor Stall" />
                            </div>
                            <div className="cardwithinfo">
                                <EventDetailcard blockName="Parking" totalno={totalpkcnt} occupied={totalpkoccupied} displyname="Parking" />
                                <EventDetailcard blockName="Workspace" totalno={totalwkcnt} occupied={totalwkcnt - totalwkunoccupied} displyname="Workspace" />
                                <EventDetailcard blockName="Event Venue" totalno={eventcount} occupied={eventcount-eventvenueavacount} displyname="Event Venue" />
                                <EventDetailcard blockName="Vendor Stall" totalno={totalvendorcnt} occupied={totalvendorcnt - totalvendorunoccupied} displyname="Vendor Stall" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Vendordashboard = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [userid, setUserid] = useState<string | null>(null);
    useEffect(() => {
        const fetchRole = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const userId = decoded.userId;

                const userResponse = await axios.get(`http://localhost:3001/api/v1/users/${userId}`);
                setUser(userResponse.data.name);
                
                setUserid(userId);
                console.log(userId);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };
        fetchRole();
    },[])

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
                    <li><Link to="/dashboard"><div>Dashboard</div></Link></li>
                    <li><Link to="/vendor"><div>Vendorstall</div></Link></li>
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
                            <Usernav username={user} />
                            <Vendorbookingsindashboad />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Managerdashboard: React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [userid, setUserid] = useState<string | null>(null);
    const [contactNumber, setContactNumber] = useState('');
    const [eventDetails, setEventDetails] = useState<eventDetailsType[]>([]);
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
                console.log(userId);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        const fetchEventDetails = async () => {
            if (!userid) return; // Check if user_id is provided
            try {
                const eventResponse = await axios.get(`http://localhost:3003/api/v1/venue/${userid}`);
                console.log(eventResponse)
                const eventDetailsArray = eventResponse.data.flatMap((venue: any) =>
                    venue.event.map((event: any) => ({
                        _id: event._id,
                        event_name: event.event_name,
                        organizer_id: event.organizer_id, // This corresponds to the user_id
                        venue_id: event.venue_id,
                        start_time: event.start_time,
                        end_time: event.end_time,
                        imgurl: venue.imgurl, // Include venue image URL
                        venue_name: venue.venue_name // Include venue name
                    }))
                );
                setEventDetails(eventDetailsArray);
                console.log("Event Details Array:", eventDetailsArray);
            } catch (error) {
                console.error('Error fetching event details:', error);
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
                    project: data.project,
                    workspace_id: data.workspace_id

                }));
                setWorkspacedetails(workdataArray);
                console.log(workdataArray)

            } catch (error) {
                console.error('Error fetching working details:', error);
            }
        };

        fetchRole();
        fetchEventDetails();
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

    const handleEventCancel = async (eventId: string) => {
        try {
            // Making DELETE request to cancel the event
            await axios.delete(`http://localhost:3003/api/v1/event/${eventId}`);
            // Filtering out the cancelled event from the eventDetails state
            setEventDetails(prevDetails => prevDetails.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error cancelling event:', error);
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
                        <img src={logo} alt="" />
                        </div>
                    </div>
                    <li><Link to="/dashboard"><div>Dashboard</div></Link></li>
                    <li><Link to="/parking"><div>Parking</div></Link></li>
                    <li><Link to="/workspace"><div>Workspace</div></Link></li>
                    <li><Link to="/events"><div>Events</div></Link></li>
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
                            <Usernav username={user} />
                            <div className="dashboardtotalnumbers">


                                    <div className="allparkingcard">
                                        

                                        <div className="parking-card-container">
                                            

                                            {parkdetails.length > 0 ? (
                                                parkdetails.map(parking => (
                                                    <ParkingCard
                                                        color="#E6CEF8"
                                                        heading="Parking"
                                                        imgsrc={parkingimg}
                                                        key={parking._id}
                                                        {...parking}
                                                        onCancel={handleCancel}
                                                    />
                                                ))
                                            ) : (
                                                <NoBookingCard color='#E6CEF8' heading="No Parking Yet"
                                                    imgsrc={parkingimg} />
                                            )}
                                        </div>


                                    </div>
                                    <div className="workspacecards">
                                        {workspacedetails.length > 0 ? (workspacedetails.map(workspace => (
                                            <WorkspaceCard
                                                color="#D8F1FF" heading="Workspace" imgsrc={workspaceimg}
                                                key={workspace.workspace_id}
                                                {...workspace}
                                                onCancel={workspacehandleCancel}
                                            />

                                        ))) : (<NoBookingCard color='#D8F1FF' heading="No Workspace Yet"
                                            imgsrc={workspaceimg} />)}
                                    </div>
                                </div>
                                <div className="dashboardtotalnumbers">
                                <div className='parking-card-container'>
                                    <div className="eventbooking">
                                    {eventDetails.length === 0 ? (
                                <NoBookingCard color='#D5F7D6' heading="No Event Yet"
                                imgsrc={eventimg} />
                            ) : (
                                eventDetails.map(event => (
                                    <EventCard key={event._id} event={event}
                                    onCancel = {handleEventCancel} /> // Render EventCard for each event
                                ))
                            )}
                                    </div>
                                
                                </div>
                                            <NoBookingCard color='#D8F1FF' heading="No Feedback Yet"
                                            imgsrc={feedbackimg} />
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Securitydashboard = (props: Props) => {


    return (
        <div>
            <div className="nav">
                <Link style={{ color: 'white', marginRight: "20px", textDecoration: "none" }} to='/logout'>logout</Link>
            </div>
            <SecurityDashdetails />
        </div>

    );
};

type eventtype={
    _id:string
    event_name: string,
        user_id: string,
}

export const UserDashboard = (props: userProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [userid, setUserid] = useState<string | null>(null);
    const [contactNumber, setContactNumber] = useState('');
    const [parkdetails, setParkDetails] = useState<parkingdetailscard[]>([]);
    const [workspacedetails, setWorkspacedetails] = useState<worspacetype[]>([]);
    const [eventdetails, setEventdetails] = useState<eventtype[]>([]);

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
                    project: data.project,
                    workspace_id: data.workspace_id

                }));
                setWorkspacedetails(workdataArray);
                console.log(workdataArray)

            } catch (error) {
                console.error('Error fetching working details:', error);
            }
        };
        const fetchevnetdetails=async ()=>{
            try {
                const evnetdata = await axios.get(`http://localhost:3003/api/v1/event/registered/${userid}`);
                const eventdataArray = evnetdata.data.map((data: any) => ({
                    _id: data._id,
                    user_id: data.user_id,
                    event_name: data.event_name,
                   

                }));
                setEventdetails(eventdataArray);
                console.log(eventdataArray)

            } catch (error) {
                console.error('Error fetching working details:', error);
            }
        }

        fetchRole();
        fetchParkingDetails();
        fetchworkDetails()
        fetchevnetdetails()
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
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <li><Link to="/dashboard"><div>Dashboard</div></Link></li>
                    <li><Link to="/workspace"><div>Workspace</div></Link></li>
                    <li><Link to="/parking"><div>Parking</div></Link></li>
                    <li><Link to="/events"><div>Events</div></Link></li>
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
                            <Usernav username={user || 'User'} />
                            <div className="dashboardroute">
                                <div className="dashboardtotalnumbers">


                                    <div className="allparkingcard">
                                        

                                        <div className="parking-card-container">
                                            

                                            {parkdetails.length > 0 ? (
                                                parkdetails.map(parking => (
                                                    <ParkingCard
                                                        color="#E6CEF8"
                                                        heading="Parking"
                                                        imgsrc={parkingimg}
                                                        key={parking._id}
                                                        {...parking}
                                                        onCancel={handleCancel}
                                                    />
                                                ))
                                            ) : (
                                                <NoBookingCard color='#E6CEF8' heading="No Parking Yet"
                                                    imgsrc={parkingimg} />
                                            )}
                                        </div>


                                    </div>
                                    <div className="workspacecards">
                                        {workspacedetails.length > 0 ? (workspacedetails.map(workspace => (
                                            <WorkspaceCard
                                                color="#D8F1FF" heading="Workspace" imgsrc={workspaceimg}
                                                key={workspace.workspace_id}
                                                {...workspace}
                                                onCancel={workspacehandleCancel}
                                            />

                                        ))) : (<NoBookingCard color='#D8F1FF' heading="No Workspace Yet"
                                            imgsrc={workspaceimg} />)}
                                    </div>
                                </div>
                                <div className="dashboardtotalnumbers">
                                <div className='parking-card-container'>
                                    <div className="eventcard">
                                    {eventdetails.length > 0 ? (eventdetails.map(evnt => (
                                            <Eventdetaildashcard
                                                color="#D5F7D6" heading="Event" imgsrc={eventimg}
                                                key={evnt._id}
                                                {...evnt}
                                                onCancel={workspacehandleCancel}
                                            />

                                        ))) : (<NoBookingCard color='#D5F7D6' heading="No Event Yet"
                                            imgsrc={eventimg} />)}

                                    </div>
                                
                                </div>
                                            <NoBookingCard color='#D8F1FF' heading="No Feedback Yet"
                                            imgsrc={feedbackimg} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
