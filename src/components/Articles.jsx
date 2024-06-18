import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ArticleCard from "./articleCard.jsx";
import { getArticles } from "../utils/api.js";

function ArticlesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="articles-list">
      {articles.map((article) => (
        <li key={article.article_id}>
          <Link to={`/articles/${article.article_id}`}>
            <ArticleCard article={article} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ArticlesList;
