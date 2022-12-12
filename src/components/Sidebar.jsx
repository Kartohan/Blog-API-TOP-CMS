import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ posts }) => {
  const pinned = posts.posts
    ? posts.posts.filter((post) => post.pinned === true)
    : [];
  return (
    <div className="p-5">
      <h1 className="font-bold border-b-rose-300 border-b-[1px] pb-1 mb-2">
        Pinned posts
      </h1>
      <div className="flex flex-col gap-2">
        {pinned &&
          pinned.map((post) => (
            <Link
              className="font-bold hover:text-rose-500"
              key={post._id}
              to={`/posts/${post._id}`}
            >
              {post.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
