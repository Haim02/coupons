import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./navbar.css";

const Navbar = () => {
  const user = {
    role: "admin",
  };

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <Link to="/" className="navbarLogo">
          קופונים
        </Link>
        <ul className="navbarList">
          {user.role === "admin" && (
            <li className="navbar-item">
              <Link to="/admin/addUser" className="navbarLink">
                צור משתמש
              </Link>
            </li>
          )}
          {user.role === "admin" && (
            <li className="navbar-item">
              <Link to="/admin" className="navbarLink">
                <PersonIcon />
              </Link>
            </li>
          )}
          {user ? (
            <li className="navbarItem">
              <Link to="/logout" className="navbarLink">
                התנתק
              </Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbarLink">
                התחבר
              </Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/" className="navbarLink">
              בית
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
