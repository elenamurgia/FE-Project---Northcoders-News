import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import ArticlesList from "./components/ArticlesList.jsx";
import Article from "./components/Article.jsx";
import Comments from "./components/Comments.jsx";
import Users from "./components/Users.jsx";
import Topics from "./components/Topics.jsx";
import { useUser } from "./context/UserContext.jsx";
import SearchResults from "./components/SearchResults.jsx";

function App() {
  const { selectedUser } = useUser();

  return (
    <div className="App">
      <div className="header-container">
        <Header />
      </div>
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
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
      </div>
    </div>
  );
}

export default App;
