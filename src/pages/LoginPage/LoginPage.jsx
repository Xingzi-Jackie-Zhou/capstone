import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        userName,
        password,
      });
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("token", response.data.token);
      navigate("/users/profile");
    } catch (error) {
      alert("Error username or password.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-Page">
      <h2 className="login-Page__header">Login</h2>
      <form className="login-Page__form" onSubmit={handleSubmit}>
        <input
          className="login-Page__content"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          className="login-Page__content"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-Page__button" type="submit">
          Login
        </button>
        <Link className="river-site__site-link" to={"/users/signup"}>
          <button className="login-Page__button">Sign up</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
