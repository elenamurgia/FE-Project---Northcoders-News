import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavDropdown, Spinner, Container } from "react-bootstrap";
import { getTopics } from "../utils/api";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        if (topics) {
          setTopics(topics);
        } else {
          setTopics([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, []);

  const handleSelectTopic = (topicSlug) => {
    navigate(`/topics/${topicSlug}`);
  };

  if (isLoading) {
    return (
      <>
        <Spinner animation="border" variant="secondary" size="sm" />
      </>
    );
  }
  return (
    <>
      {topics.map((topic) => (
        <NavDropdown.Item
          key={topic.slug}
          className="custom-dropdown-item"
          onClick={() => handleSelectTopic(topic.slug)}
        >
          {topic.slug}
        </NavDropdown.Item>
      ))}
    </>
  );
}

export default Topics;
