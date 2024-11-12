import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Loader from "../../../components/Loader";
import "./addUser.css";

const AddUser = () => {
  const isFetching = false;
  const [userValues, setUserValues] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setUserValues((pre) => ({
      ...pre,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const hanleOnSubmit = (e) => {
    e.preventDefault();
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
            onChange={handleOnChange}
          />
          <Input
            lable="סיסמה"
            name="username"
            placeholder="סיסמה"
            type="text"
            onChange={handleOnChange}
          />
        </div>
        <div className="addUserBtnContainer">
          <Button
            type="submit"
            text={isFetching ? <Loader /> : "שמור"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
