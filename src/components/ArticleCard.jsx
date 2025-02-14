import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FaRegComments, FaThumbsUp } from "react-icons/fa";

function ArticleCard({
  title,
  votes,
  article_img_url,
  article_id,
  comment_count,
}) {

  return (
     <Card 
      className="article-card h-100" 
      style={{ 
        backgroundColor: "#F2F2F2",
        width: '100%', 
        marginBottom: '1rem',
      }}
    >
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
          <Card.Text style={{ color: "#173540" }}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaThumbsUp /> {votes}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaRegComments /> {comment_count}
              </span>
            </span>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ArticleCard;
