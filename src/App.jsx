import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Post from "./components/Post";
import { useState } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import Login from "./components/Login";
import { useJwt } from "react-jwt";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { decodedToken, isExpired } = useJwt(token);
  return (
    <div className="App">
      <Header />
      <div className="container mx-auto px-4 mb-8">
        <Routes>
          <Route element={<PrivateRoutes isExpired={isExpired} />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category_id" element={<Category />} />
            <Route path="/posts/:post_id" element={<Post />} />
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
