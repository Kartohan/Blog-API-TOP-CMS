import React from "react";
import displayMessage from "../assets/displayMessage";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthorPosts = () => {
  const location = useLocation();
  let { error, posts } = location.state;
  return (
    <div>
      <div>{displayMessage(error)}</div>
      <div className="flex flex-col gap-1 my-3">
        <h1 className="font-bold text-2xl border-b-[1px] border-b-rose-500">
          Posts to Edit/Delete
        </h1>
        {posts.map((post) => (
          <Link
            className="hover:text-rose-400 text-xl"
            to={`/posts/${post._id}`}
            key={post._id}
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AuthorPosts;
