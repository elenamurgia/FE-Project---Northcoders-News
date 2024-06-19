import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import CommentsList from "./Comments";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
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

  if (!article) {
    return <p>Article not found</p>;
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString();

  return (
    <Container>
      <Card className="individual-article">
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By {article.author} | {formattedDate}
          </Card.Subtitle>
          <Card.Img
            src={article.article_img_url}
            alt={`Image for ${article.title}`}
          />
          <Card.Text>{article.body}</Card.Text>
          <Card.Text>
            Votes: {article.votes} | Topic: {article.topic}
          </Card.Text>
        </Card.Body>
      </Card>
      <CommentsList article_id={article_id} />
    </Container>
  );
}

export default Article;
