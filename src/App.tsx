import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './component/landing/Home';
import SignUpForm from './component/landing/signup/signup';
import LoginForm from './component/landing/login/login';
// import Dashboard from './component/admin/Dashboard';
import AdminEmployee from './component/admin/employee/employee';
// import Dashboardhandling from './component/admin/';
// import Parkinghandler from './component/admin/parkinghandler';
import Workspacehandler from './component/route_handler/workspace_handler';
import Dashboardhandling from './component/route_handler/dashboardhandling';
import Parkinghandler from './component/route_handler/parkinghandler';
import EventRegistrehandler from './component/route_handler/Event_registraion_handler';
import FeedbackHandler from './component/route_handler/Feedback_handler';
import { AdminParkingDash, UserParkingDash } from './component/dashboards/parkingdashboard';
import { AdminWorkspacedash, UserWorkspace } from './component/dashboards/workspace_dash';
import { UserEventDash } from './component/dashboards/event_dash';
import { FeedbackDash } from './component/dashboards/Feedback_dash';
import Adminvenue from './component/admin/venue/AdminEvenue';
import Vendorhandler from './component/route_handler/Vendor_handler';
import Logout from './component/landing/Logout';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        { <><Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboardhandling />} />
        <Route path="/parking" element={<Parkinghandler />} />
        <Route path="/workspace" element={<Workspacehandler />} />
        <Route path="/events" element={<EventRegistrehandler />} />
        <Route path="/feedback" element={<FeedbackHandler />} />
        <Route path="/vendor" element={<Vendorhandler />} />
        <Route path="/logout" element={<Logout />} />
        
        <Route path="/employees" element={<AdminEmployee />} />
        <Route path="/venue" element={<Adminvenue />} />
        <Route path="/dev/parking" element={<AdminParkingDash userid="1234"   />} />
        <Route path="/dev/workspace" element={<AdminWorkspacedash userid="1234"   />} />
        <Route path="/dev/event" element={<UserEventDash userid="1234"   />} />
        <Route path="/dev/feedback" element={<FeedbackDash userid="1234"   />} />
        </>
       /* <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
