import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api.js";
import { Row, Container, Col, Spinner } from "react-bootstrap";
import ArticleCard from "./ArticleCard.jsx";
import SortArticles from "./SortArticles.jsx";
import { useMediaQuery } from 'react-responsive';

function ArticlesList() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

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
    <Container style={{paddingTop: '0'}}>
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
            md={4} 
            className="mb-4"
            style={{ paddingLeft: isMobile ? '15px' : '', paddingRight: isMobile ? '15px' : '' }}
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
