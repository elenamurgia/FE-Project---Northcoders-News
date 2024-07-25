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
  Spinner,
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
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2
            style={{ fontWeight: "bold", color: "#012E40", paddingTop: "1rem" }}
          >
            Comments
          </h2>
          {message && (
            <Alert variant="info" className="alert alert-dark">
              {message}
            </Alert>
          )}
          <PostComment
            article_id={article_id}
            onCommentSubmit={handleCommentSubmit}
            setComments={setComments}
          />
          <ListGroup className="comments-by-articleId">
            {comments.map((comment) => {
              const formattedDate = comment.created_at
                ? new Date(comment.created_at).toLocaleDateString()
                : "Invalid Date";
              return (
                <Card
                  key={comment.comment_id}
                  style={{ backgroundColor: "#F2F2F2", marginTop: "1rem" }}
                >
                  <Card.Header style={{ color: "#012E40", fontWeight: "bold" }}>
                    Comment from: {comment.author}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={{ color: "#012E40" }}>
                      {comment.body}
                    </Card.Text>
                    <Card.Footer
                      style={{
                        color: "#012E40",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Votes: {comment.votes} | Created on: {formattedDate}
                      {comment.author === username && (
                        <Button
                          variant="secondary"
                          onClick={() => handleClick(comment.comment_id)}
                          disabled={isDisabled}
                          className="btn btn-secondary btn-sm"
                          style={{
                            backgroundColor: "#012E40",
                            color: "#F2F2F2",
                            borderColor: "#012E40",
                            marginTop: "0.5rem",
                            borderRadius: "15px",
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Comments;
