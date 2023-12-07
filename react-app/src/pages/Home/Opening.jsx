import React from 'react';
import Navbar from './Navbar';
import './Opening.css';
import { useNavigate } from 'react-router-dom';

function Opening() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Signup');
  };

  return (
    <div id="main">
      <Navbar />
      <div className="name">
        <h1>
          <span className="secure">Your Data, Your Security Keep It Protected</span>
        </h1>
        <p className="details">
          Safeguarding your valuable information with cutting-edge protection,
          because your peace of mind is our top concern.
        </p>
        <div className="center-container">
          <a href="/signup" className="cv-btn" onClick={handleButtonClick}>
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Opening;
