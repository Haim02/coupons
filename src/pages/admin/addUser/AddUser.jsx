import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/Auth";
import "./addUser.css";

const AddUser = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isFetching = false;
  const [userValues, setUserValues] = useState({
    username: "",
    password: "",
  });

  const hanleOnSubmit = (e) => {
    e.preventDefault();
    login( username, password )
  };

  return (
    <div className="addUserContainer">
      <form className="addUserForm" onSubmit={hanleOnSubmit}>
        <h2>הוסף משתמש</h2>
        <div className="addUserInputContainer">
          <Input
            lable="שם משתמש"
            name="username"
            placeholder="שם משתמש"
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            lable="סיסמה"
            name="username"
            placeholder="סיסמה"
            type="text"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="addUserBtnContainer">
          <Button
            type="submit"
            text={loading ? <Loader /> : "שמור"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
