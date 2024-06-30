import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getArticlesByTopic } from "../utils/api.js";
import { Row, Container, Col, Spinner } from "react-bootstrap";
import ArticleCard from "./ArticleCard.jsx";

function ArticlesList() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topic) {
      getArticlesByTopic(topic)
        .then((articlesData) => {
          if (articlesData.articles.length === 0) {
            setError("No articles found for this topic");
          } else {
            setArticles(articlesData.articles);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setError("Something went wrong, please try again");
          setIsLoading(false);
        });
    } else {
      getArticles()
        .then((response) => {
          setArticles(response.articles);
          setIsLoading(false);
        })
        .catch((error) => {
          setError("Something went wrong, please try again");
          setIsLoading(false);
        });
    }
  }, [topic]);

  if (isLoading) {
    return (
      <>
        <Spinner animation="border" variant="secondary" size="sm" />
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h2>Articles {topic && `- ${topic}`}</h2>
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
