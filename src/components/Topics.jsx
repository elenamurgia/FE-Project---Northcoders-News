import { useEffect, useState } from "react";
import axios from "axios";
import { NavDropdown } from "react-bootstrap";

function Topics({ onSelectTopic }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-northcoders-news-api.onrender.com/api/topics")
      .then((response) => {
        if (response.data.topics) {
          setTopics(response.data.topics);
        } else {
          setTopics([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setTopics([]);
      });
  }, []);

  return (
    <>
      {topics.map((topic) => (
        <NavDropdown.Item
          key={topic.slug}
          onClick={() => onSelectTopic(topic.slug)}
        >
          {topic.slug}
        </NavDropdown.Item>
      ))}
    </>
  );
}

export default Topics;
