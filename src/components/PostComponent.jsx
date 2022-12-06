import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PostComponent = ({ post, user }) => {
  const { imageURL, _id, categories, title, author, createdIn, description } =
    post;
  return (
    <div className="bg-white shadow-2xl rounded-lg p-0 pb-5 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-3">
        <Link to={`/posts/${_id}`}>
          <img
            src={`http://localhost:3001/${imageURL}`}
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
        <div>{description}</div>
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
