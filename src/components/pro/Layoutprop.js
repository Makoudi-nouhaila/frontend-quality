import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Layoutprop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      const response = await axios.post(
        "http://localhost:8080/blog/auth/signout"
      );
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Logout failed.", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#!">
            Start Bootstrap
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}>
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "/categorie" ? "active" : ""}`}>
                <Link className="nav-link" to="/categorie">
                  Categories
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "/articleadmin" ? "active" : ""}`}>
                <Link className="nav-link" to="/articleadmin">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Layoutprop;
