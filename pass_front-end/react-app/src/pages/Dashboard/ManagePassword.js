import { Button } from "react-bootstrap";
import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

const ManagePassword = () => {
  <Badge pill bg="success">
    Strong
  </Badge>;
  <Badge pill bg="warning">
    Medium
  </Badge>;
  <Badge pill bg="danger">
    Weak
  </Badge>;

  <Dropdown as={NavItem}>
    <Dropdown.Toggle as={NavLink}>...</Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item>Delete</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>;

  return (
    <Container fluid>
      <Row>
        <Col lg={2}>
        <Button variant="primary" className="btn">
          +New Password
        </Button>
        </Col>
      </Row>

      <div className="passwords">
        <Row>
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
      </div>
    </Container>
  );
};

export default ManagePassword;
