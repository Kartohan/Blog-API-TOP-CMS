import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewCategory = ({ setCategories }) => {
  const [form, setForm] = useState({
    name: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .post(
        "https://blog-api-top-server-production.up.railway.app/api/category/new_category",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          setCategories(() =>
            axios
              .get(
                "https://blog-api-top-server-production.up.railway.app/api/category"
              )
              .then((res) => setCategories(res.data))
          );
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
        <h1 className="text-center font-bold text-2xl">Create New Category</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label htmlFor="name">Category Name</label>
            <input
              className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
              type="text"
              name="name"
              id="name"
              onChange={handleChangeForm}
              required
              value={form.name}
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

export default NewCategory;
