import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentsBar = () => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}api/posts/last_comments`
      )
      .then((res) => setComments(res.data));
  }, []);
  return (
    <div className="p-5">
      <h1 className="font-bold border-b-rose-300 border-b-[1px] pb-1 mb-2">
        Last 10 comments
      </h1>
      <div className="flex flex-col gap-2">
        {comments &&
          comments.comments.map((comment) => (
            <div className="">
              <div className="font-bold text-sm text-rose-700">
                {comment.fullname}
              </div>
              <div className="">{comment.comment}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentsBar;
