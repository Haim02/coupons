import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../context/Auth";
import "./navbar.css";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <Link to="/" className="navbarLogo">
          קופונים
        </Link>
        <ul className="navbarList">
          {isAdmin && (
            <li className="navbar-item">
              <Link to="/admin/addUser" className="navbarLink">
                צור משתמש
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="navbar-item">
              <Link to="/admin/addCoupon" className="navbarLink">
                צור קופון
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="navbar-item">
              <Link to="/admin" className="navbarLink">
                <PersonIcon />
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <li className="navbarItem">
              <Link to="/" className="navbarLink" onClick={logout}>
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
