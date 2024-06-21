import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId, deleteComment } from "../utils/api";
import PostComment from "./PostComment";
import {
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";

function Comments({ username }) {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching comments:",
          error.response ? error.response.data : error.message
        );
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, [article_id]);

  const handleCommentSubmit = (newComment) => {
    setComments((currentComments) => [newComment, ...currentComments]);
  };

  const handleClick = (comment_id) => {
    setIsDisabled(true);
    setMessage("Please wait, your comment is being deleted.");

    deleteComment(comment_id)
      .then(() => {
        getCommentsByArticleId(article_id)
          .then(({ comments }) => {
            setComments(comments);
            setIsDisabled(false);
            setMessage("Comment successfully deleted!");
            setTimeout(() => setMessage(""), 3000);
          })
          .catch((error) => {
            setError("Something went wrong, please try again");
            setIsDisabled(false);
          });
      })
      .catch((error) => {
        setError("Failed to delete comment, please try again");
        setIsDisabled(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Comments</h2>
          {username && <p>Logged in as: {username}</p>}
          {message && (
            <Alert variant="info" className="alert alert-dark">
              {message}
            </Alert>
          )}{" "}
          <PostComment
            article_id={article_id}
            onCommentSubmit={handleCommentSubmit}
            username={username}
          />
          <ListGroup className="comments-by-articleId">
            {comments.map((comment) => {
              const formattedDate = new Date(
                comment.created_at
              ).toLocaleDateString();
              return (
                <ListGroup.Item key={comment.comment_id} className="g-3">
                  <Card>
                    <Card.Header>
                      <strong>Comment from: {comment.author}</strong>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{comment.body}</Card.Text>
                      <Card.Footer>
                        <small className="text-muted">
                          Votes: {comment.votes} | Created on: {formattedDate}
                        </small>
                        {comment.author === username && (
                          <Button
                            variant="secondary"
                            onClick={() => handleClick(comment.comment_id)}
                            disabled={isDisabled}
                            className="btn btn-secondary btn-sm"
                          >
                            Delete
                          </Button>
                        )}
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Comments;
