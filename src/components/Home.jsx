import React from "react";
import { useState, useEffect } from "react";
import PostComponent from "./PostComponent";
import Sidebar from "./Sidebar";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => {
        data.posts.reverse();
        setPosts(data);
      });
  }, []);
  return (
    <div className="grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3 lg:order-last mb-5">
        <div className="shadow-lg rounded-lg">
          <Sidebar posts={posts} />
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
      <div></div>
    </div>
  );
};

export default Home;
