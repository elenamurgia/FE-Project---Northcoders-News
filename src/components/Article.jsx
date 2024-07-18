import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, updateArticleVotes } from "../utils/api";
import Comments from "./Comments";
import { Card, Container, Spinner } from "react-bootstrap";

function Article({ username }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleVotes, setArticleVotes] = useState(0);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setArticleVotes(article.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (vote) => {
    setArticleVotes((currentVotes) => currentVotes + vote);
    updateArticleVotes(article_id, vote)
      .then(({ article }) => {
        setArticleVotes(article.votes);
      })
      .catch((err) => {
        setArticleVotes((currentVotes) => currentVotes - vote);
        setError("Something went wrong, please try again");
      });
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
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By {article.author} | {formattedDate}
          </Card.Subtitle>
          {article.article_img_url && (
            <Card.Img
              src={article.article_img_url}
              alt={`Image for ${article.title}`}
            />
          )}
          <Card.Text>{article.body}</Card.Text>
          <div>
            <button onClick={() => handleVote(1)}>Vote</button>
            <button onClick={() => handleVote(-1)}>Unvote</button>
          </div>
          <Card.Text>
            Votes: {articleVotes} | Topic: {article.topic}
          </Card.Text>
        </Card.Body>
      </Card>
      <Comments article_id={article_id} username={username} />
    </Container>
  );
}

export default Article;
