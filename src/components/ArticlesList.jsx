import React, { useState, useEffect } from "react";
import { getArticles } from "../utils/api.js";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ArticleCard from "./ArticleCard.jsx";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h2>Articles</h2>
      <Row>
        {articles.map((article) => (
          <Col key={article.article_id} md={4} className="g-3">
            <ArticleCard
              title={article.title}
              author={article.author}
              created_at={article.created_at}
              votes={article.votes}
              article_img_url={article.article_img_url}
              article_id={article.article_id}
              topic={article.topic}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArticlesList;
