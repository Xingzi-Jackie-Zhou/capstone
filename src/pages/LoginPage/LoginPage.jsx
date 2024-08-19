import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const isFormValid = () => {
    if (!username || !password) {
      setFormError(true);
      return false;
    } else {
      setFormError(false);
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValid = isFormValid();
    if (formValid) {
      try {
        const response = await axios.post(`${baseUrl}/users/login`, {
          username,
          password,
        });
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("id", response.data.id);
        //  sessionStorage.setItem("id", response.data.user.id);
        sessionStorage.setItem("token", response.data.token);
        const userId = sessionStorage.getItem("id");
        console.log(response.data.id, "and ", userId);
        navigate(`/users/${username}/profile`);
      } catch (error) {
        alert("Error username or password.");
        console.error("Error logging in:", error);
      }
    }
  };
  console.log(formError);
  return (
    <div className="login-page">
      <h2 className="login-page__header">Login</h2>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <div className="login-page__username-container">
          <label className="login-page__username-label" htmlFor="username">
            Username :
          </label>
          <input
            className={`login-page__content ${
              formError && !username ? "login-page__content--inactive" : ""
            }`}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-page__password-container">
          <label className="login-page__password-label" htmlFor="password">
            Password :
          </label>
          <input
            className={`login-page__content ${
              formError && !password ? "login-page__content--inactive" : ""
            }`}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`login-page__form-warning ${
            formError ? "login-page__form-warning--display" : ""
          }`}
        >
          <p className="login-page__form-message">
            * This field is required. *
          </p>
        </div>
        <button className="login-page__button" type="submit">
          Login
        </button>
        <Link className="login-page__site-link" to={"/users/signup"}>
          <button className="login-page__button">Sign up</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
