import { useState } from "react";
import Form from "react-bootstrap/Form";
import { postComment } from "../utils/api";
import { useUser } from "../context/UserContext";

function PostComment({ article_id, onCommentSubmit }) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { selectedUser } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (/^[\s]*$/.test(commentText)) {
      setError("Comment is empty. Please try again.");
    } else {
      setError("");
      setIsSubmitting(true);

      postComment(article_id, selectedUser, commentText)
        .then((newComment) => {
          onCommentSubmit(newComment.comment);
          setSuccessMessage("Thank you for your comment!");
          setCommentText("");
          setIsSubmitting(false);
        })
        .catch((error) => {
          setError("You are not logged in!");
          setIsSubmitting(false);
        });
    }
  };

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="commentText">
        <Form.Label>Leave a Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {error && <p>{error}</p>}
      </Form.Group>
      <div>
        <button type="submit" disabled={isSubmitting} className="vote-button">
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </div>
      {successMessage && <p>{successMessage}</p>}
    </Form>
  );
}

export default PostComment;
