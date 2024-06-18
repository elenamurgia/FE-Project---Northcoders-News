import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://nc-northcoders-news-api.onrender.com/api",
});

export const getArticles = () => {
  return articlesApi.get("/articles").then((res) => {
    return res.data;
  });
};

export const getArticleById = (article_id) => {
  return articlesApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
};

export const getTopics = () => {
  return articlesApi.get("/topics").then((res) => {
    return res.data;
  });
};
