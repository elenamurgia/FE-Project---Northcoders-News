import { useState } from "react";
import Form from "react-bootstrap/Form";
import { postComment } from "../utils/api";
import { useUser } from "../context/UserContext";

function PostComment({ article_id, onCommentSubmit, setComments }) {
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
      setSuccessMessage("");
      setIsSubmitting(true);

      return postComment(article_id, selectedUser, commentText)
        .then((response) => {
          let newComment = response.comment;
          newComment = {
            ...newComment,
            author: selectedUser,
            created_at: new Date().toISOString(),
          };

          setIsSubmitting(false);
          setCommentText("");
          setSuccessMessage("Thank you for your comment!");

          setComments((currentComments) => [newComment, ...currentComments]);

          setTimeout(() => setSuccessMessage(""), 3000);
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
    <Form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <Form.Group controlId="commentText">
        <Form.Label style={{ fontWeight: "bold", color: "#012E40" }}>
          Leave a Comment
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{ borderColor: "#012E40" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Form.Group>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="vote-button"
          style={{
            backgroundColor: "#012E40",
            color: "#F2F2F2",
            borderColor: "#012E40",
            marginTop: "0.5rem",
            borderRadius: "15px",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </Form>
  );
}

export default PostComment;
