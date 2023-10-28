import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { Container, Col, Row, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';

function App() {

  return (
    <div className="App">
      <Container fluid>
        <Navbar />
        <Row>
          <Col xs={12} md={4} lg={3} xl={2}>
            <Sidebar />
          </Col>
          <Col xs={12} md={8} lg={9} xl={10}>
            <MainContent />
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
