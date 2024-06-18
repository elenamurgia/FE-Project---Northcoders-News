function ArticleCard({ article }) {
  const formattedDate = new Date(article.created_at).toLocaleDateString();
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <img src={article.article_img_url} alt={`Image for ${article.title}`} />
      <p>by {article.author}</p>
      <p>votes:{article.votes}</p>
      <p>created on {formattedDate}</p>
    </div>
  );
}

export default ArticleCard;
