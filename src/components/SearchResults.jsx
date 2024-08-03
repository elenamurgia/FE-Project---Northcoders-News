import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { searchArticle } from "../utils/api";
import { Link } from "react-router-dom";

function SearchResults() {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await searchArticle(searchTerm);
        setResults(response.articles);
        setHasSearched(true);
        setIsLoading(false);
      } catch (err) {
        setError("Something went wrong, please try again.");
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [searchTerm]);

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", color: "#027373" }}
      >
        <Spinner animation="border" variant="secondary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", color: "#027373" }}
      >
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-3">
      {hasSearched && results.length === 0 ? (
        <p>No results found for "{searchTerm}"</p>
      ) : (
        <Row>
          {results.map((article) => (
            <Col key={article.article_id} md={4} className="mb-4">
              <Card className="h-100" style={{ backgroundColor: "#F2F2F2" }}>
                <Link
                  to={`/articles/${article.article_id}`}
                  className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                >
                  {article.article_img_url && (
                    <Card.Img
                      variant="top"
                      src={article.article_img_url}
                      alt={`Image for ${article.title}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title style={{ color: "#012E40" }}>
                      {article.title}
                    </Card.Title>
                    <Card.Text style={{ color: "#173540" }}>
                      {article.body.substring(0, 100)}
                    </Card.Text>
                    <Card.Text style={{ color: "#012E40" }}>
                      By {article.author}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default SearchResults;
