import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, [article_id]);

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

export default CommentsList;
