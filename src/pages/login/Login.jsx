import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useAuth } from "../../context/Auth";
import "./login.css";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // submit form to server if no username and password throw an error
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("נדרש למלא שם משתמש וסיסמה");
      return;
    }

    login(username, password);
    setError("");
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <form onSubmit={onSubmitHandler} className="loginFormContainer">
          <h2>התחברות מנהל</h2>
          <Input
            lable="שם משתמש"
            name="username"
            placeholder="שם משתמש"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            lable="סיסמה"
            name="password"
            placeholder="סיסמה"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit" text="התחבר" />
        </form>
      </div>
    </div>
  );
};

export default Login;
