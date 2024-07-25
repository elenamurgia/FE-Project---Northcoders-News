// Article.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, updateArticleVotes } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Comments from "./Comments";
import {
  Card,
  Container,
  Spinner,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleVotes, setArticleVotes] = useState(0);
  const [userVotes, setUserVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [isSubtractDisabled, setIsSubtractDisabled] = useState(false);
  const [error, setError] = useState(null);
  const { selectedUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await getArticleById(article_id);
        if (response && response.article) {
          setArticle(response.article);
          setArticleVotes(response.article.votes);
          setIsLoading(false);
        } else {
          setError("No article found.");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Something went wrong, please try again.");
        setIsLoading(false);
      }
    };

    if (!/^\d+$/.test(article_id)) {
      setError("Invalid article ID format.");
      setIsLoading(false);
    } else {
      fetchArticle();
    }
  }, [article_id, navigate]);

  const handleUserVotes = (vote) => {
    const newVotes = userVotes + vote;
    setIsAddDisabled(newVotes > 0);
    setIsSubtractDisabled(newVotes < 0);
    setUserVotes(newVotes);
  };

  const handleVote = async (vote) => {
    setArticleVotes((prevVotes) => prevVotes + vote);
    handleUserVotes(vote);
    try {
      await updateArticleVotes(article_id, vote);
    } catch (err) {
      setArticleVotes((prevVotes) => prevVotes - vote);
      setError("Something went wrong, please try again");
    }
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", color: "#027373" }}
      >
        <Spinner animation="border" variant="secondary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", color: "#027373" }}
      >
        <p>{error}</p>
      </Container>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString();

  return (
    <Container>
      <Card
        className="individual-article"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        <Card.Body>
          <Card.Title
            className="h2"
            style={{ color: "#012E40", fontWeight: "bold" }}
          >
            {article.title}
          </Card.Title>
          <Card.Subtitle style={{ color: "#012E40", paddingBottom: "1rem" }}>
            By {article.author} | {formattedDate}
          </Card.Subtitle>
          {article.article_img_url && (
            <Card.Img
              src={article.article_img_url}
              alt={`Image for ${article.title}`}
            />
          )}
          <Card.Text
            className="h5"
            style={{ color: "#012E40", paddingTop: "1rem" }}
          >
            {article.body}
          </Card.Text>
          <div>
            <OverlayTrigger
              overlay={
                <Tooltip>{selectedUser ? null : "Sign in to vote"}</Tooltip>
              }
            >
              <span>
                <Button
                  variant={userVotes > 0 ? "success" : "outline-success"}
                  disabled={!selectedUser || isAddDisabled}
                  onClick={() => handleVote(1)}
                >
                  <FaThumbsUp />
                </Button>
              </span>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip>{selectedUser ? null : "Sign in to vote"}</Tooltip>
              }
            >
              <span>
                <Button
                  variant={userVotes < 0 ? "danger" : "outline-danger"}
                  disabled={!selectedUser || isSubtractDisabled}
                  onClick={() => handleVote(-1)}
                >
                  <FaThumbsDown />
                </Button>
              </span>
            </OverlayTrigger>
          </div>
          <Card.Text style={{ paddingTop: "1rem", color: "#012E40" }}>
            Votes: {articleVotes} | Topic: {article.topic}
          </Card.Text>
        </Card.Body>
      </Card>
      <Comments article_id={article_id} username={selectedUser} />
    </Container>
  );
}

export default Article;
