import React from "react";
import { useState, useEffect } from "react";
import PostComponent from "./PostComponent";
import Sidebar from "./Sidebar";
import CommentsBar from "./CommentsBar";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-api-top-server-production.up.railway.app/")
      .then((res) => res.json())
      .then((data) => {
        data.posts.reverse();
        setPosts(data);
      });
  }, []);
  return (
    <div className="grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3 lg:order-2 mb-5">
        <div className="shadow-lg rounded-lg">
          <Sidebar posts={posts} />
        </div>
        <div className="shadow-lg rounded-lg mb-5 lg:block hidden">
          <CommentsBar />
        </div>
      </div>
      <div className="lg:col-span-9 mt-2">
        {posts.posts &&
          posts.posts.map((post) => (
            <PostComponent
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
