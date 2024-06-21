import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import ArticlesList from "./components/ArticlesList.jsx";
import Article from "./components/Article.jsx";
import Comments from "./components/Comments.jsx";
import Users from "./components/Users.jsx";
import Topics from "./components/Topics.jsx";
import { useUser } from "./context/UserContext.jsx";

function App() {
  const { selectedUser } = useUser();

  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route
          path="/articles/:article_id"
          element={<Article username={selectedUser} />}
        />
        <Route path="/users" element={<Users />} />
        <Route
          path="/articles/:article_id/comments"
          element={<Comments username={selectedUser} />}
        />
        <Route path="/" element={<Topics />} />
        <Route path="topics/:topic" element={<ArticlesList />} />
      </Routes>
    </>
  );
}

export default App;
