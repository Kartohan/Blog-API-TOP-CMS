import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import NewAuthor from "./components/NewAuthor";
import NewCategory from "./components/NewCategory";
import Manager from "./components/Manager";
import AuthorPosts from "./components/AuthorPosts";
import EditAuthor from "./components/EditAuthor";
import { useState, useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import Login from "./components/Login";
import { useJwt } from "react-jwt";
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { decodedToken, isExpired } = useJwt(token);
  const [categories, setCategories] = useState(null);
  const [authors, setAuthors] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category")
      .then((res) => setCategories(res.data));
    axios
      .get("http://localhost:3001/api/author")
      .then((res) => setAuthors(res.data));
  }, []);
  return (
    <div className="App">
      <Header
        user={decodedToken?.user}
        setToken={setToken}
        categories={categories}
      />
      <div className="container mx-auto px-4 mb-8">
        <Routes>
          <Route element={<PrivateRoutes isExpired={isExpired} />}>
            <Route path="/" element={<Home user={decodedToken?.user} />} />
            <Route path="/category/:category_id" element={<Category />} />
            <Route path="/posts/:post_id" element={<Post />} />
            <Route
              path="/new_post"
              element={<NewPost categories={categories} authors={authors} />}
            />
            <Route
              path="/edit_post/:post_id"
              element={<EditPost categories={categories} authors={authors} />}
            />
            <Route
              path="/new_category"
              element={<NewCategory setCategories={setCategories} />}
            />
            <Route
              path="/manager"
              element={
                <Manager
                  categories={categories}
                  authors={authors}
                  setAuthors={setAuthors}
                  setCategories={setCategories}
                />
              }
            />
            <Route path="/author_posts" element={<AuthorPosts />} />
            <Route
              path="/edit_author/:author_id"
              element={<EditAuthor setAuthors={setAuthors} />}
            />
            <Route
              path="/new_author"
              element={
                <NewAuthor user={decodedToken?.user} setAuthors={setAuthors} />
              }
            />
          </Route>
          <Route
            path="/login"
            element={<Login setToken={setToken} isExpired={isExpired} />}
          />
        </Routes>
      </div>
      <div className="bg-rose-50 px-12 py-3 block rounded-lg mx-auto w-fit my-3">
        Created by{" "}
        <a className="text-rose-600" href="https://github.com/Kartohan">
          {" "}
          Kartohan
        </a>
      </div>
    </div>
  );
}

export default App;
