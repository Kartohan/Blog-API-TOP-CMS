import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Dropdown, Avatar } from "flowbite-react";

const Header = ({ user, setToken, categories }) => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.setItem("token", "");
    setToken(null);
    navigate("/login");
  };
  return (
    <div className="mb-4 mt-2 container mx-auto">
      <Navbar fluid={false} rounded={true}>
        <Link to="/" className="hover-underline font-bold text-xl">
          My Awesome Blog
        </Link>

        {user && (
          <div className="flex md:order-2 items-center gap-2">
            <Dropdown
              arrowIcon={true}
              inline={true}
              label={user && user.username}
              className="z-20"
            >
              <Dropdown.Item>
                <Link to="/new_post">Create new Post</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/manager">Manager</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logOutHandler}>Log Out</Dropdown.Item>
            </Dropdown>
          </div>
        )}
        <Navbar.Toggle />

        <Navbar.Collapse>
          {categories?.categories &&
            categories.categories.map((item) => (
              <Link
                className="hover:bg-rose-400 rounded-md p-2 transition"
                key={item._id}
                to={`/category/${item._id}`}
              >
                {item.name}
              </Link>
            ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
