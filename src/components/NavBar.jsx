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
import { useUser } from "../context/UserContext";

function NavBar({ onSelectTopic }) {
  const { selectedUser } = useUser();

  return (
    <>
      <Navbar
        className="mb-2"
        expand="X1"
        bg="dark"
        variant="dark"
        fixed="auto"
        collapseOnSelect
      >
        <Container style={{ backgroundColor: "#012E40" }}>
          <Navbar.Brand style={{ color: "#F2F2F2" }} href="/">
            Home
          </Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search NC News..."
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" type="submit">
              Search
            </Button>
          </Form>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="me-auto">
              <NavDropdown title="Topics" id="navbarScrollingDropdown">
                <Topics onSelectTopic={onSelectTopic} />
              </NavDropdown>
              <Nav.Link href="/users">Users</Nav.Link>
              {selectedUser && (
                <Navbar.Text className="ml-auto">
                  You are logged in as {selectedUser}
                </Navbar.Text>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
