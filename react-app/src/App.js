import React, { useState } from 'react';
import './pages/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginSignup/Login'; 
import Signup from './pages/LoginSignup/Signup';
import Navbar from './pages/Home/Navbar';
import Header from './pages/Home/Opening';
import Feature from './pages/Home/Feature';
import About from './pages/Home/About';
import Presentation from './pages/Home/Preview';
import DashboardPage from './pages/Dashboard/DashboardPage';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginLayout />} />
          <Route path="/signup" element={<SignupLayout />} />
          <Route
            path="/"
            element={
              <>
                <Navbar toggleSidebar={toggleSidebar} />
                <Header />
                <Feature />
                <Presentation />
                <About />
              </>
            }
          />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

function LoginLayout() {
  return (
    <>
      <Navbar />
      <Login />
    </>
  );
}

function SignupLayout() {
  return (
    <>
      <Navbar />
      <Signup />
    </>
  );
}

function DashboardLayout() {
  return (
    <>
      <DashboardPage />
    </>
  );
}

export default App;
