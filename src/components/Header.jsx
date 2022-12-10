import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ user, setToken, categories }) => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.setItem("token", "");
    setToken(null);
    navigate("/login");
  };
  return (
    <div className="mb-4 mt-2 container mx-auto">
      <nav className="flex container justify-between mx-auto px-4 items-center gap-2 h-10 mt-1">
        <Link to="/" className="hover-underline font-bold text-xl">
          My Awesome Blog
        </Link>
        <div className="flex gap-5">
          {categories?.categories &&
            categories.categories.map((item) => (
              <Link
                className="hover:bg-rose-400 rounded-md p-2 transition"
                key={item._id}
                to={`/category/${item._id}`}
              >
                {item.name}
              </Link>
            ))}
        </div>
      </nav>
      {user && (
        <div className="h-12 flex justify-between px-5">
          <div className="items-center flex">
            <Link
              className="font-bold hover:bg-rose-400 rounded-md p-2 transition"
              to="/new_post"
            >
              Create new Post
            </Link>
            <Link
              className="font-bold hover:bg-rose-400 rounded-md p-2 transition"
              to="/manager"
            >
              Manager
            </Link>
          </div>
          <div className="flex gap-10 items-center">
            <div>{user.username}</div>
            <button
              onClick={logOutHandler}
              className="hover:bg-rose-400 rounded-md p-2 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
