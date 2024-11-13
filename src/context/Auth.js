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
    setLoading(true);
    setError(null);
    if (username === "admin" && password === "admin123") {
      navigate("/admin");
      setIsAuthenticated(true);
      setIsAdmin(true);
      setLoading(false);
    } else {
      setLoading(false);
      setError(" משתמש או סיסמה לא נכונים");
    }
  };

  // GET request to creade a new user with username and password
  const addUser = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${PATH}/admin/addUser`,
        {username,
        password}
      );
    } catch (err) {
      setLoading(false);
      setError("שגיאה ביצירת משתמש");
    }
  };

  // GET request to get all users for filtering
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${PATH}/admin/users`);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("לא נמצאו משתמשים");
    }
  };

  const logout = () => {
    setLoading(false);
    setError(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        login,
        logout,
        addUser,
        loading,
        error,
        getUsers,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
