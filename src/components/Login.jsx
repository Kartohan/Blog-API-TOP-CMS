import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import displayMessage from "../assets/displayMessage";

const Login = ({ setToken, isExpired }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://blog-api-top-server-production.up.railway.app/api/users/login`,
        form
      )
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          if (localStorage.getItem("token")) {
            navigate("/");
          }
        } else if (res.data.error) {
          setMessage(res.data);
          console.log(res.data);
        }
      });
  };

  useEffect(() => {
    if (!isExpired) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="text-center font-bold text-rose-600 text-4xl my-5">
        Blog API CMS
      </div>
      <div className="text-center font-bold text-2xl my-5">Log In</div>
      <form
        className="min-w-fit w-[33%] mx-auto"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
            type="text"
            name="username"
            id="username"
            onChange={handleChangeForm}
            required
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="">Password</label>
          <input
            className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
            type="password"
            name="password"
            id="password"
            onChange={handleChangeForm}
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
  );
};

export default Login;
