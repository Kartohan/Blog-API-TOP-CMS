import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PostComponent = ({ post, user, setPosts }) => {
  const {
    imageURL,
    _id,
    categories,
    title,
    author,
    createdIn,
    description,
    pinned,
  } = post;
  const [pin, setPin] = useState(pinned);
  const handlePin = () => {
    const token = localStorage.getItem("token");
    if (pin) {
      axios
        .post(
          `https://blog-api-top-server-production.up.railway.app/api/posts/${_id}/unpin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message) {
            setPin(false);
            post.pinned = false;
            setPosts((prev) => ({ ...prev, post }));
          }
        });
    } else if (!pin) {
      axios
        .post(
          `https://blog-api-top-server-production.up.railway.app/api/posts/${_id}/pin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message) {
            setPin(true);
            post.pinned = true;
            setPosts((prev) => ({ ...prev, post }));
          }
        });
    }
  };
  return (
    <div className="bg-white shadow-2xl rounded-lg p-0 pb-5 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-3">
        {user && (
          <div className="absolute z-10 right-1 flex gap-2 mt-1">
            <button
              onClick={handlePin}
              className="bg-blue-100 rounded-lg hover:bg-blue-400 transition px-2 py-1 text-xs bg-opacity-50"
            >
              {pin ? "Unpin Post" : "Pin Post"}
            </button>
            <Link
              to={`/edit_post/${_id}`}
              className="bg-orange-100 rounded-lg hover:bg-orange-400 transition px-3 py-2 text-xs bg-opacity-50"
            >
              Edit Post
            </Link>
          </div>
        )}
        <Link to={`/posts/${_id}`}>
          <img
            src={`https://blog-api-top-server-production.up.railway.app/${imageURL}`}
            alt={title}
            className="object-center absolute h-80 w-full object-cover shadow-lg rounded-lg hover:scale-110 transition duration-700"
          />
        </Link>
      </div>
      <div className="flex justify-center flex-col items-center gap-1">
        <div className="font-bold text-2xl">{title}</div>
        <div className="flex gap-x-2">
          <div>{author.fullname}</div>|<div>{post.timestamp_formatted}</div>
        </div>
        <div className="px-2 text-center">{description}</div>
        <div className="mt-1">
          <Link
            className="bg-rose-100 rounded-lg hover:bg-rose-400 transition px-3 py-2 inline-block hover:scale-[1.03]"
            to={`/posts/${_id}`}
          >
            Continue reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
