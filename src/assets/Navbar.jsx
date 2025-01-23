import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            INoteBook
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === " /" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === " /about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>

            {!sessionStorage.getItem("token") ? (
              <div>
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                  hidden={location.pathname === "/login"}
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                  hidden={location.pathname === "/signup"}
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  sessionStorage.removeItem("token");
                  window.location.reload();

                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
