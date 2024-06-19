import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Topics from "./Topics";

function NavBar({ onSelectTopic }) {
  return (
    <>
      <Navbar
        expand="X1"
        bg="dark"
        variant="dark"
        fixed="auto"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search NC News"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="me-auto">
              <NavDropdown title="Topics" id="navbarScrollingDropdown">
                <Topics onSelectTopic={onSelectTopic} />
              </NavDropdown>
              <Nav.Link href="/">Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
