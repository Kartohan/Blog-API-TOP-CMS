import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import displayMessage from "../assets/displayMessage";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Manager = ({ authors, categories, setAuthors, setCategories }) => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleAuthorDelete = (e) => {
    e.preventDefault();
    const { author_id } = e.target;
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://blog-api-top-server-production.up.railway.app/api/author/${author_id.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {}
      )
      .then((res) => {
        if (res.data.posts) {
          navigate("/author_posts", {
            state: {
              posts: res.data.posts,
              error: res.data,
            },
          });
        }
        if (res.data.message) {
          setMessage(res.data);
          axios
            .get(
              "http://blog-api-top-server-production.up.railway.app/api/author"
            )
            .then((res) => setAuthors(res.data));
        }
      });
  };
  const handleCategoryDelete = (e) => {
    e.preventDefault();
    const { category_id } = e.target;
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://blog-api-top-server-production.up.railway.app/api/category/${category_id.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {}
      )
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data);
        }
        if (res.data.message) {
          setMessage(res.data);
          setModal(!modal);
          axios
            .get(
              "http://blog-api-top-server-production.up.railway.app/api/category"
            )
            .then((res) => setCategories(res.data));
        }
      });
  };
  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <div>
      <div>{message && displayMessage(message)}</div>
      <h1 className="font-bold text-2xl border-b-[1px] border-b-rose-500">
        Authors
      </h1>
      <Link
        className="font-bold bg-rose-400 bg-opacity-30 hover:bg-rose-400 rounded-md p-2 transition block w-fit my-2"
        to="/new_author"
      >
        Create new Author
      </Link>
      <div className="flex flex-col gap-2">
        {authors &&
          authors.authors.map((author) => (
            <div className="flex justify-between" key={author._id}>
              <p>{author.fullname}</p>
              <div className="flex gap-2">
                <Link
                  to={`/edit_author/${author._id}`}
                  className="bg-orange-100 rounded-lg hover:bg-orange-400 transition px-3 py-1 text-sm bg-opacity-50"
                >
                  Edit
                </Link>
                <form action="" onSubmit={handleAuthorDelete}>
                  <input type="hidden" value={author._id} id="author_id" />
                  <button
                    type="submit"
                    className="py-1 px-3 bg-rose-100 rounded-lg text-sm hover:bg-rose-400 transition"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
      </div>
      <h1 className="font-bold text-2xl border-b-[1px] border-b-rose-500">
        Categories
      </h1>
      <Link
        className="font-bold bg-rose-400 bg-opacity-30 hover:bg-rose-400 rounded-md p-2 transition block w-fit my-2"
        to="/new_category"
      >
        Create new Category
      </Link>
      <div className="flex flex-col gap-2">
        {categories?.categories &&
          categories.categories.map((category) => (
            <div className="flex justify-between" key={category._id}>
              <p>{category.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={handleModal}
                  className="py-1 px-3 bg-rose-100 rounded-lg text-sm hover:bg-rose-400 transition"
                >
                  Delete
                </button>
              </div>
              <Modal show={modal} size="md" popup={true} onClose={handleModal}>
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete "{category.name}"
                      category?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <form onSubmit={handleCategoryDelete} action="">
                        <input
                          type="hidden"
                          value={category._id}
                          id="category_id"
                        />
                        <Button type="submit" color="failure">
                          Yes, I'm sure
                        </Button>
                      </form>
                      <Button color="gray" onClick={handleModal}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Manager;
