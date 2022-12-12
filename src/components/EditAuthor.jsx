import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import displayMessage from "../assets/displayMessage";
import axios from "axios";

const EditAuthor = ({ setAuthors }) => {
  const [message, setMessage] = useState(null);
  const [author, setAuthor] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    description: "",
  });
  const navigate = useNavigate();
  const { author_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://blog-api-top-server-production.up.railway.app/api/author/${author_id}`
      )
      .then((res) => {
        if (res.data.author) {
          setAuthor(res.data.author);
          setForm({
            firstname: res.data.author.firstname,
            lastname: res.data.author.lastname,
            description: res.data.author.description,
          });
        }
      });
  }, []);
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .put(
        `http://blog-api-top-server-production.up.railway.app/api/author/${author_id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          axios
            .get(
              "http://blog-api-top-server-production.up.railway.app/api/author"
            )
            .then((res) => setAuthors(res.data));
          navigate("/manager");
        }
        if (res.data.errors) {
          setMessage(res.data);
        }
      });
  };
  return (
    <div>
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-center font-bold text-2xl">Edit Author</h1>
        <h1 className="text-center font-bold text-xl my-2">
          {author && author.fullname}
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChangeForm}
              required
              value={form.firstname}
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleChangeForm}
              required
              value={form.lastname}
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="description"
              id="description"
              onChange={handleChangeForm}
              value={form.description}
              required
            />
          </div>
          <div className="my-3">{message && displayMessage(message)}</div>
          <input
            className="py-2 px-10 bg-rose-100 text-lg rounded-lg mt-8 hover:bg-rose-400 transition scale-[1.02] block mx-auto"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default EditAuthor;
