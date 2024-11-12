import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/Auth";
import "./addUser.css";

const AddUser = () => {
  const { addUser, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  // If no username and password show error message else send a request to the server
  const hanleOnSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErr("נדרש למלא שם משתמש וסיסמה");
      return;
    }

    addUser(username, password);
    setErr("");
    alert("קופון נוצר בהצלחה");
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            lable="סיסמה"
            name="username"
            placeholder="סיסמה"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <p style={{ color: "red" }}>{err}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="addUserBtnContainer">
          <Button type="submit" text={loading ? <Loader /> : "שמור"} />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
