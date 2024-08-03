import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <Container fluid className="header-container">
      <Row className="align-items-center">
        <Col>
          <a href="/" style={{ textDecoration: "none", color: "#012E40" }}>
            <h1 className="h1" style={{ fontWeight: "bold" }}>
              <strong>NC News</strong>
            </h1>
          </a>
        </Col>
        <Col md="auto">
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search NC News..."
              className="mr-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
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
