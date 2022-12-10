import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import displayMessage from "../assets/displayMessage";

const NewPost = ({ categories, authors }) => {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    postDetail: "",
    author: "",
    category: [],
    image: null,
  });
  const navigate = useNavigate();
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      let array = form.category;
      if (!array.some((category) => category === value)) {
        array.push(value);
      } else if (array.some((category) => category === value)) {
        array = array.filter((category) => category != value);
      }
      setForm((prev) => ({ ...prev, [name]: array }));
    } else if (name === "image") {
      let file = e.target.files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/posts/new_post", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data) {
          setMessage(res.data);
        }
        if (res.data.message) {
          navigate(`/posts/${res.data.post._id}`);
        }
      });
  };
  return (
    <div>
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-center font-bold text-2xl">Create New Post</h1>
        <form
          className="flex flex-col gap-3"
          action=""
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col">
            <label htmlFor="title">Post Title</label>
            <input
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="title"
              id="title"
              onChange={handleChangeForm}
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="description"
              id="description"
              onChange={handleChangeForm}
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="postDetail">Post Detail</label>
            <textarea
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="postDetail"
              id="postDetail"
              onChange={handleChangeForm}
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="author">Author</label>
            <select
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              name="author"
              defaultValue={"default"}
              required
              onChange={handleChangeForm}
              id="author"
            >
              <option disabled value="default">
                --- Choose Author ---
              </option>
              {authors &&
                authors.authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.fullname}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex gap-x-4 flex-wrap">
              Categories:
              {categories &&
                categories.categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex justify-center items-center gap-x-1"
                  >
                    <input
                      type="checkbox"
                      name="category"
                      id={category._id}
                      value={category._id}
                      onChange={handleChangeForm}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={category._id}
                      className="checked:bg-slate-300 z-10 relative"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full flex items-center gap-5">
            <label htmlFor="image">Post image</label>
            <input
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={handleChangeForm}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:transition file:bg-rose-100 hover:file:bg-rose-300"
              required
            />
          </div>
          <div className="my-2">{message && displayMessage(message)}</div>
          <input
            className="py-2 px-10 bg-rose-100 text-lg rounded-lg mt-8 hover:bg-rose-400 transition scale-[1.02] block mx-auto"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default NewPost;
