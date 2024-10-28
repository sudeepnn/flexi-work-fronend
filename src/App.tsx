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
import Dashboard from './component/admin/Dashboard';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        { <><Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </>
       /* <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
