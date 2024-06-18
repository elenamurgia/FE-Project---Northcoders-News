import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { getTopics } from "../utils/api";

function Topics({ onSelectTopic }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        if (topics) {
          setTopics(topics);
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
