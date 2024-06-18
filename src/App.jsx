import "./App.css";
import React from "react";
import Header from "./components/Header.jsx";
import ArticlesList from "./components/Articles.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <ArticlesList />
    </>
  );
}

export default App;
