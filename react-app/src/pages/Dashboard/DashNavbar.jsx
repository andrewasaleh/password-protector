// DashNavbar.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import AuthDetails from '../LoginSignup/AuthDetails';
import PasswordForm from './PasswordForm';
import PasswordGenerator from './PasswordGenerator'; // Import PasswordGenerator
import "./DashNavbar.css";
import logo from '../../Assets/images/home/logo.png'; // Update the path to your logo image

function DashNavbar({ isSmallScreen, onTogglePasswordGenerator }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleOpenPasswordForm = () => {
    setShowPasswordForm(true);
  };

  const handleToggleGenerator = () => {
    // Toggle the PasswordGenerator in the parent component
    onTogglePasswordGenerator();
  };

  return (
    <header className="DashNavbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="passwordgenerator-icon">
      {/* Add an icon to toggle PasswordGenerator */}
      <FontAwesomeIcon icon={faKey} onClick={handleToggleGenerator} className="password-generator-icon" />
      </div>

      <div className="passwordgenerator-icon">
      <AuthDetails />
      </div>

      {/* Render PasswordForm if showPasswordForm is true */}
      {showPasswordForm && <PasswordForm onClose={() => setShowPasswordForm(false)} />}
    </header>
  );
}

export default DashNavbar;
