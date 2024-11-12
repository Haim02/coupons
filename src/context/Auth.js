import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PATH = "http://localhost:3000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // admin login withe username and password
  const login = (username, password) => {
    setError(null);
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      setIsAdmin(true);
      navigate("/admin");
    } else {
      alert("שם משתמש או סיסמה לא נכונים")
    }
  };

  // GET request to creade a new user with username and password
  const addUser = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${PATH}/admin/addUser`, username, password);
    } catch (err) {
      setLoading(false);
      setError("משתמש לא נמצא");
    } finally {
    }
  };


  // GET request to get all users for filtering
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${PATH}/admin/users`);
      setUsers(response.data)
    } catch (err) {
      setLoading(false);
      setError("לא נמצאו משתמשים");
    } finally {
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user , login, logout, addUser, loading, error, getUsers, users }}>
      {children}
    </AuthContext.Provider>
  );
};

// הוק מותאם לגישה קלה ל-AuthContext
export const useAuth = () => useContext(AuthContext);
