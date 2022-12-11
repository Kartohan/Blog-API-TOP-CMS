import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostComponent from "./PostComponent";

const Category = () => {
  const { category_id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/category/${category_id}`)
      .then((res) => res.json())
      .then((data) => {
        data.posts.reverse();
        setData(data);
      });
  }, [category_id]);
  return (
    <div>
      <h1 className="text-center my-5 font-bold text-2xl">
        {data.category && data.category.name}
      </h1>
      <div>
        {data.posts && data.posts.length === 0 ? (
          <h1 className=" bg-blue-100 px-8 py-3 rounded-lg w-fit mx-auto">
            This category is empty
          </h1>
        ) : null}
        {data.posts &&
          data.posts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default Category;
