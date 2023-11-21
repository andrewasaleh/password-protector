import React from "react";
import "./PasswordOverlay.css";

const PasswordOverlay = ({ passwords, onClose }) => {
  return (
    <div className="password-overlay">
      <h2>Passwords</h2>
      <ul>
        {passwords.map((password, index) => (
          <li key={index}>
            <strong>{password.website}</strong>
            <p>Username: {password.username}</p>
            <p>Password: {password.password}</p>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PasswordOverlay;
