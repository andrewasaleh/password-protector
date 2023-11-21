import "./DashboardPage.css";
import DashNavbar from "./DashNavbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import React, { useState } from "react";

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <div className="DashboardPage">
      <DashNavbar toggleSidebar={toggleSidebar} />
      <div className="content-container">
        <Sidebar sidebarOpen={sidebarOpen}/>
        <MainContent />
      </div>

    
    </div>
  );
}

export default DashboardPage;
