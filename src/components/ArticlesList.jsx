import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../utils/api.js";
import { Row, Container, Col, Spinner } from "react-bootstrap";
import ArticleCard from "./ArticleCard.jsx";
import SortArticles from "./SortArticles.jsx";

function ArticlesList() {
  const { topic } = useParams();
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
    <Container fluid style={{ width: "100%", padding: "0", margin: "0" }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: "#012E40", fontWeight: "bold", margin: 0 }}>
          Articles {topic && `- ${topic}`}
        </h2>
        <SortArticles />
      </div>

      <Row>
        {articles.map((article) => (
          <Col 
            key={article.article_id} 
            xs={12} 
            s={6}
            md={4}
            lg={3}
            xl={2} 
            className="mb-4"
          >
            <ArticleCard
              title={article.title}
              author={article.author}
              created_at={article.created_at}
              votes={article.votes}
              article_img_url={article.article_img_url}
              article_id={article.article_id}
              topic={article.topic}
              comment_count={article.comment_count}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArticlesList;
