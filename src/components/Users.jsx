import { useState, useEffect } from "react";
import { getUsers } from "../utils/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Container, Col } from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then(({ users }) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, []);

  const handleUserSelection = (username) => {
    setSelectedUser(username);
    navigate("/");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h2>Users</h2>
      {users.map((user) => (
        <Col key={user.username}>
          <h2>{user.username}</h2>
          <p>{user.name}</p>
          <img src={user.avatar_url} alt={user.username} />
          <div>
            <button onClick={() => handleUserSelection(user.username)}>
              Choose {user.username}
            </button>
          </div>
        </Col>
      ))}
    </Container>
  );
}

export default Users;
