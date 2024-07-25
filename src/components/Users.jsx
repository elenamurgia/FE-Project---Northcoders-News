import { useState, useEffect } from "react";
import { getUsers } from "../utils/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  Alert,
  Col,
  Row,
} from "react-bootstrap";

function Users() {
  const [state, setState] = useState({
    users: [],
    isLoading: true,
    error: null,
  });
  const { setSelectedUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users } = await getUsers();
        setState({ users, isLoading: false, error: null });
      } catch (error) {
        setState({
          users: [],
          isLoading: false,
          error: "Something went wrong, please try again",
        });
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelection = (username) => {
    setSelectedUser(username);
    navigate("/");
  };

  const { users, isLoading, error } = state;

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="secondary" />
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h2
        style={{
          fontWeight: "bold",
          color: "#012E40",
          paddingTop: "1rem",
          textAlign: "left",
        }}
      >
        Choose your User
      </h2>
      <Row className="w-100 justify-content-center">
        {users.map((user) => (
          <Col xs={12} key={user.username} className="my-3">
            <Card className="p-3 w-100" style={{ backgroundColor: "#F2F2F2" }}>
              <Row className="align-items-center">
                <Col xs={3} md={2}>
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={user.avatar_url}
                      alt={`${user.username}'s avatar`}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Col>
                <Col xs={9} md={7}>
                  <h3 style={{ fontWeight: "bold", color: "#012E40" }}>
                    {user.username} <br /> <small>{user.name}</small>
                  </h3>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => handleUserSelection(user.username)}
                    style={{
                      width: "100%",
                      backgroundColor: "#012E40",
                      color: "#F2F2F2",
                      borderColor: "#012E40",
                      marginTop: "0.5rem",
                      borderRadius: "15px",
                    }}
                  >
                    Choose {user.username}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Users;
