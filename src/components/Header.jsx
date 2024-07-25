import React from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

function Header() {
  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col>
          <a href="/" style={{ textDecoration: "none", color: "#012E40" }}>
            <h1 className="h1" style={{ fontWeight: "bold" }}>
              <strong>NC News</strong>
            </h1>
          </a>
        </Col>
        <Col md="auto">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search NC News..."
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" type="submit">
              <Search />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
