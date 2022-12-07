import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import displayMessage from "../assets/displayMessage";

const EditPost = () => {
  const [authors, setAuthors] = useState(null);
  const [categories, setCategories] = useState(null);
  const [message, setMessage] = useState(null);
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    postDetail: "",
    author: "",
    category: [],
    image: null,
  });
  const navigate = useNavigate();
  const { post_id } = useParams();
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
      .put(`http://localhost:3001/api/posts/${post_id}`, form, {
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
  useEffect(() => {
    axios.get(`http://localhost:3001/api/posts/${post_id}`).then((res) => {
      setForm({
        title: res.data.post.title,
        description: res.data.post.description,
        postDetail: res.data.post.postDetail,
        author: res.data.post.author._id,
        category: res.data.post.categories,
        image: null,
      });
      setPost(res.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/author")
      .then((res) => setAuthors(res.data));
    axios
      .get("http://localhost:3001/api/category")
      .then((res) => setCategories(res.data));
  }, []);
  return (
    <div>
      {post && (
        <div className="max-w-[600px] mx-auto">
          <h1 className="text-center font-bold text-2xl">Edit Post</h1>
          <h1 className="text-center font-bold text-xl my-2">
            {post.post.title}
          </h1>
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
                defaultValue={post.post.title}
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
                defaultValue={post.post.description}
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
                defaultValue={post.post.postDetail}
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="author">Author</label>
              <select
                className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
                name="author"
                defaultValue={post && post.post.author._id}
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
                  categories.categories.map((category) => {
                    if (
                      post.post.categories.find(
                        (postCategory) => postCategory === category._id
                      )
                    ) {
                      return (
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
                            defaultChecked={true}
                          />
                          <label
                            htmlFor={category._id}
                            className="checked:bg-slate-300 z-10 relative"
                          >
                            {category.name}
                          </label>
                        </div>
                      );
                    } else {
                      return (
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
                      );
                    }
                  })}
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
              />
            </div>
            <div className="my-2">{message && displayMessage(message)}</div>
            <input
              className="py-2 px-10 bg-rose-100 text-lg rounded-lg mt-8 hover:bg-rose-400 transition scale-[1.02] block mx-auto"
              type="submit"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPost;
