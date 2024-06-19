import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export function ArticleCard({
  title,
  author,
  created_at,
  votes,
  article_img_url,
  article_id,
  topic,
}) {
  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <Card className="article-card h-100">
      <Link to={`/articles/${article_id}`}>
        <Card.Img
          variant="top"
          src={article_img_url}
          alt={`Image for ${title}`}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            By {author} <br />
            Topic: {topic} | Votes: {votes} | Created on: {formattedDate}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ArticleCard;
