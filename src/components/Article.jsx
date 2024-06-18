import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
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

  if (!article) {
    return <p>Article not found</p>;
  }
  const formattedDate = new Date(article.created_at).toLocaleDateString();
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.topic}</p>
      <img src={article.article_img_url} alt={`Image for ${article.title}`} />
      <p>{article.body}</p>
      <p>votes: {article.votes}</p>
      <p>created on {formattedDate}</p>
    </div>
  );
}

export default Article;
