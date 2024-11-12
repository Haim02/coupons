import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./login.css";

const Login = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: ""
  })

  const handleFormChance = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value.trim() });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="loginContainer">
      <div className="login">
        <form onSubmit={onSubmitHandler} className="loginFormContainer">
        <h2>התחברות מנהל</h2>
          <Input lable='שם משתמש' name='username' placeholder='שם משתמש'onChange={handleFormChance} />
          <Input lable='סיסמה' name='password' placeholder='סיסמה'onChange={handleFormChance} />
          <Button type="submit" text="התחבר" />
        </form>
      </div>
    </div>
  );
};

export default Login;
