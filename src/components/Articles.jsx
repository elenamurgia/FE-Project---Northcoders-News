import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard.jsx";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get(`https://nc-northcoders-news-api.onrender.com/api/articles`)
      .then((response) => {
        console.log(response.data.articles);
        if (response.data.articles) {
          setArticles(response.data.articles);
        } else {
          setArticles([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setArticles([]);
      });
  }, []);
  return (
    <ul className="articles-list">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.article_id} />
      ))}
    </ul>
  );
}

export default ArticlesList;
