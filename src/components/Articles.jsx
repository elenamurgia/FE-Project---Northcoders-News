import { useState, useEffect } from "react";
import ArticleCard from "./articleCard.jsx";
import { getArticles } from "../utils/api.js";

function ArticlesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then(({ articles }) => {
        if (articles) {
          setArticles(articles);
        } else {
          setArticles([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="articles-list">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.article_id} />
      ))}
    </ul>
  );
}

export default ArticlesList;
