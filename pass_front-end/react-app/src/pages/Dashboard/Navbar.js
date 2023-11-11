import React from "react";
import logo from "./assets/images/logo.png";
import userAvatar from "./assets/images/userAvatar.jpg";
import justify from "./assets/images/justify.svg";
import gear from "./assets/images/gear.svg";
import question_circle from "./assets/images/question_circle.svg";
import bell from "./assets/images/bell.svg";
import { Button } from "react-bootstrap";

function Navbar({ toggleSidebar, isSmallScreen }) {
  if(isSmallScreen){
    return (null);
  }
  return (
    <div className="navbar">
      <div>
        <img src={logo} className="logo" alt="company Logo" />
        <button
          type="button"
          class="showSidebar btn btn-outline-secondary"
          onClick={toggleSidebar}
        >
          <img src={justify} />
        </button>
      </div>
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