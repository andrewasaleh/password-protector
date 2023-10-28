import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import key from "./assets/images/key.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">Dashboard</div>
      <div className="sidebar-item">
        <img src={key} className="navIcons" alt="key" /> My Password
      </div>
      <div className="sidebar-item">Games</div>
      <div className="sidebar-item">Streaming</div>
      <div className="sidebar-item">E-mails</div>
      <div className="sidebar-item">Payments</div>
      <div className="sidebar-item">Security risks</div>

      {/* <Button className="Logout" variant="outline-primary">Logout</Button>{""} */}
    </div>
  );
}

export default Sidebar;
