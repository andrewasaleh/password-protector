// DashNavbar.js
import React from "react";
import logo from "../../Assets/images/home/logo.png";
import justify from "../../Assets/images/Dashboard/justify.svg";
import AuthDetails from '../LoginSignup/AuthDetails'; 
import "./DashNavbar.css";

function DashNavbar({ toggleSidebar, isSmallScreen }) {
  if (isSmallScreen) {
    return null;
  }

  return (
    <div className="DashNavbar">
      <div>
        <img src={logo} className="logo" alt="company Logo" />
        <button
          type="button"
          className="showSidebar btn btn-outline-secondary"
          onClick={toggleSidebar}
        >
          <img src={justify} alt="Toggle Sidebar" />
        </button>
      </div>
      <input type="search" placeholder="Search for a service or password" />

      <div>
        {/* Include the AuthDetails component */}
        <AuthDetails />
        {/* Add other components as needed */}
      </div>
    </div>
  );
}

export default DashNavbar;
