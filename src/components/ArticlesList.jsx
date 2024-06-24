import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api.js";
import { Row, Container, Col } from "react-bootstrap";
import ArticleCard from "./ArticleCard.jsx";
import SortArticles from "./SortArticles.jsx";

function ArticlesList() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, order)
      .then((response) => {
        if (response.articles.length === 0) {
          setError("No articles found for this topic");
        } else {
          setArticles(response.articles);
          setError(null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h2>
        Articles {topic && `- ${topic}`} <SortArticles />
      </h2>

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
