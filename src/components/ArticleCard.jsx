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
    <Card className="article-card h-100" style={{ backgroundColor: "#F2F2F2" }}>
      <Link
        to={`/articles/${article_id}`}
        className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
      >
        <Card.Img
          variant="top"
          src={article_img_url}
          alt={`Image for ${title}`}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title style={{ color: "#012E40" }}>{title}</Card.Title>
          <Card.Text style={{ color: "#026773" }}>
            By {author} <br />
            Topic: {topic} | Votes: {votes} | Created on: {formattedDate}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ArticleCard;
