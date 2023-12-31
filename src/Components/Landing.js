import React from 'react';
import { Link } from 'react-router-dom';
import myImage from '../assests/George-Mason-University-logo-1972.png';

import '../Styles/LandingPage.css'; // Import your CSS styles

function Landing() {
  return (
    <div className="landing-container">
      <div className="mason">
        <img src={myImage} alt="George Mason University" />
      </div>
      <h1>Student Survey Applications</h1>
      <Link to="/fill-survey" className="btn btn-primary">Fill a Survey</Link>
      <Link to="/view-surveys" className="btn btn-secondary">View Surveys</Link>
    </div>
  );
}

export default Landing;
