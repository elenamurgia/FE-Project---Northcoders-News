import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Topics from "./Topics";
import { useUser } from "../context/UserContext";

function NavBar({ onSelectTopic }) {
  const { selectedUser } = useUser();

  return (
    <>
      <Navbar
        className="navbar-custom"
        expand="xs"
        collapseOnSelect
        style={{ color: "#F2F2F2" }}
      >
        <Container style={{ backgroundColor: "#012E40" }}>
          <Navbar.Toggle
            aria-controls="navbarNavDropdown"
            style={{ backgroundColor: "#F2F2F2" }}
          />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto" style={{ color: "#F2F2F2" }}>
              <NavDropdown
                title="Topics"
                id="navbarScrollingDropdown"
                className="custom-dropdown"
                menuVariant="light"
              >
                <Topics onSelectTopic={onSelectTopic} />
              </NavDropdown>
              <Nav.Link href="/users" style={{ color: "#F2F2F2" }}>
                Sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {selectedUser && (
            <Navbar.Text className="ml-auto" style={{ color: "#F2F2F2" }}>
              Signed in as {selectedUser}
            </Navbar.Text>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
