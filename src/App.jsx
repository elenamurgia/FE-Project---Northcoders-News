import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import ArticlesList from "./components/ArticlesList.jsx";
import Article from "./components/Article.jsx";
import Comments from "./components/Comments.jsx";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticlesList />}></Route>
        <Route path="/articles/:article_id" element={<Article />}></Route>
        <Route
          path="/articles/:article_id/comments"
          element={<Comments />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
