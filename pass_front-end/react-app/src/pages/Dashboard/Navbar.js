import React from "react";
import logo from "./assets/images/logo.png";
import userAvatar from "./assets/images/userAvatar.jpg";
import gear from "./assets/images/gear.svg";
import question_circle from "./assets/images/question_circle.svg";
import bell from "./assets/images/bell.svg";
import { Container, Col, Row } from "react-bootstrap";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} className="logo" alt="company Logo" />

      <input type="search" placeholder="Search for a service or password" />

      <div>
        <img src={bell} className="navIcons" alt="notification" />
        <img src={gear} className="navIcons" alt="setting" />
        <img src={question_circle} className="navIcons" alt="question" />
        <img src={userAvatar} className="userAvatar-logo" alt="User Avatar" />
      </div>
    </div>
  );
}

export default Navbar;
