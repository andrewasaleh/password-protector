import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import PasswordForm from "./PasswordForm";
import './ManagePassword.css';

const ManagePassword = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState([]);

  const handleCreateNewPassword = () => {
    // Toggle the visibility of the PasswordForm
    setShowPasswordForm((prevShowPasswordForm) => !prevShowPasswordForm);
  };

  const addPassword = (newPassword) => {
    // Add the new password to the list
    setPasswords([...passwords, newPassword]);
    // Close the PasswordForm
    setShowPasswordForm(false);
  };

  return (
    <Container fluid>
      {/* Bar with buttons */}
      <Row className="password-bar">
        <Col lg={6}>
          <Button variant="primary" className="btn" onClick={handleCreateNewPassword}>
            Create New Password
          </Button>
        </Col>
        <Col lg={6} className="text-end">
          <Button variant="secondary" className="btn">
            Password Generator
          </Button>
        </Col>
      </Row>

      <div className="passwords">
        <Row className="password-titles">
          <Col lg={3}>
            <p className="font-size20">SITES</p>
          </Col>

          <Col lg={2}>
            <p className="font-size20">USER NAME</p>
          </Col>

          <Col lg={2}>
            <p className="font-size20">PASSWORD</p>
          </Col>

          <Col lg={3}>
            <p className="font-size20">STRENGTH</p>
          </Col>
        </Row>

        {/* Display passwords */}
        {passwords.map((password, index) => (
          <Row key={index} className="password-entry">
            <Col lg={3}>
              <p>{password.website}</p>
            </Col>

            <Col lg={2}>
              <p>{password.username}</p>
            </Col>

            <Col lg={2}>
              <p>{password.password}</p>
            </Col>

            <Col lg={3}>
              {/* Add strength indicator or other relevant information */}
              <p>{password.strength}</p>
            </Col>
          </Row>
        ))}
      </div>

      {/* PasswordForm pop-up */}
      {showPasswordForm && <PasswordForm onClose={() => setShowPasswordForm(false)} addPassword={addPassword} />}
    </Container>
  );
};

export default ManagePassword;
