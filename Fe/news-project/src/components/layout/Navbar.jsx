import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";
import { getNewsCategory } from "../utils/ApiFunctions";
const Navbar = ({ data, setFilteredData }) => {
  const [categories, setCategories] = useState([""]);
  const [filter, setFilter] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  useEffect(() => {
    getNewsCategory()
      .then((data) => {
        setCategories(data);
      })
      .catch((e) => {
        console.log(e);
      });
      console.log(isLoggedIn);
  }, []);
  const handleSelectChange = (e) => {
    const selectedCategory = e;
    setFilter(selectedCategory);
    const filteredNews = data.filter((news) =>
      news.newsCategory.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setFilteredData(filteredNews);
    console.log(e);
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className="badge bg-light text-dark fs-4">Japan News</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {categories.map((category, index) => {
              return (
                <li
                  onClick={() => handleSelectChange(category)}
                  className="nav-item"
                >
                  <a className="nav-link active" aria-current="page" href="#">
                    {category}
                  </a>
                </li>
              );
            })}
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/admin"
              >
                Admin
              </a>
            </li>
            )}
            <li className="nav-item dropdown">
              <div className="col-lg-3 px-5"></div>
              <a
                className={`text-white nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                {" "}
                Tài khoản
              </a>

              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                    <li>
                      <Link className="dropdown-item" to={"/login"}>
                        Đăng nhập
                      </Link>
                      <Link className="dropdown-item" to={"/register"}>
                        Đăng ky
                      </Link>
                    </li>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
