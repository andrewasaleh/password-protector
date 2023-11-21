import React from "react";
import "./Sidebar.css"; // Import the CSS file

function Sidebar({sidebarOpen}) {
  if(!sidebarOpen){
    return null;
  }
  return (
    <div className="sidebar">
      <div className="sidebar-item">Dashboard</div>
      <div className="sidebar-item">Passwords</div>
      <div className="sidebar-item">Games</div>
      {/* <div className="sidebar-item">Streaming</div>
      <div className="sidebar-item">E-mails</div>
      <div className="sidebar-item">Payments</div>
      <div className="sidebar-item">Security risks</div> */}

      {/* <Button className="Logout" variant="outline-primary">Logout</Button>{""} */}
    </div>
  );
}

export default Sidebar;
