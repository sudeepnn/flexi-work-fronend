// AboutUs.js
import React from 'react';
import img from '../resources/ustimg.jpg'
import './home.css'
const AboutUs = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '100%', margin: 'auto' }}>
            <h2>About Us</h2>
            <div className="aboutusmaincon">
            
           <div className="aboutuscon">
           <p>
                Welcome to our Workspace Management Platform! We are committed to helping you efficiently organize and optimize your workspace environments. Our goal is to provide flexible, user-friendly solutions that make managing workspaces easier and more effective.
            </p>
            <p>
                With a focus on innovation and efficiency, we strive to enhance productivity, streamline operations, and support seamless workspace booking and utilization. Thank you for trusting us with your workspace needs. We look forward to supporting you in creating well-organized and productive environments!
            </p>
           </div>
           <div className="aboutusimg">
                <img src={img} alt="About Us Image" />
            </div>
            </div>

        </div>
    );
};

export default AboutUs;
