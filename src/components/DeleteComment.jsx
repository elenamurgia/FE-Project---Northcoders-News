import { useState } from "react";
import { deleteComment, getCommentsByArticleId } from "../utils/api";
import { useUser } from "../context/UserContext";

function DeleteComment({ comment_id }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { selectedUser } = useUser();

  const handleClick = (comment_id) => {
    setIsDisabled(true);
    setMessage("Please wait, your comment is being deleted.");
    deleteComment(comment_id).then(() => {
      getCommentsByArticleId(article_id).then((response) => {
        setIsLoading;
      });
    });
  };
}

export default DeleteComment;
