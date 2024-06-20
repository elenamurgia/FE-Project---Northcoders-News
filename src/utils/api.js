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

export const getCommentsByArticleId = (article_id) => {
  return articlesApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data;
  });
};

export const updateArticleVotes = (article_id, votesToBeAdded) => {
  return articlesApi
    .patch(`/articles/${article_id}`, { votesToBeAdded })
    .then((res) => {
      return res.data;
    });
};

export const postComment = (article_id, username, comment) => {
  const postedComment = {
    username,
    body: comment,
  };
  return articlesApi
    .post(`/articles/${article_id}/comments`, postedComment)
    .then((res) => {
      return res.data;
    });
};

export const getUsers = () => {
  return articlesApi.get("/users").then((res) => {
    return res.data;
  });
};
