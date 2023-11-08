import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import React, { useState, useEffect } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content-container">
        <Sidebar sidebarOpen={sidebarOpen}/>
        <MainContent />
      </div>

    
    </div>
  );
}

export default App;
