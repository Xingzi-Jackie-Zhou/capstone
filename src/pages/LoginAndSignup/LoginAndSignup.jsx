import { useState } from "react";
import Profile from "../ProfilePage/ProfilePage.jsx";
import "./LoginAndSignup.scss";
import axios from "axios";

const baseUrl = "http://localhost:8080";
const signupUrl = `${baseUrl}/users/signup`;
const loginUrl = `${baseUrl}/users/login`;

function LoginAndSignup() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // Here send a POST request to signupUrl with username, name and password data
    try {
      await axios.post(signupUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
        name: e.target.name.value,
      });
      setIsSignedUp(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here send a POST request to loginUrl with username and password data
    try {
      const response = await axios.post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      setIsSignedUp(true);

      sessionStorage.setItem("authToken", response.data.token);
      setIsLoggedIn(true);
      setIsLoginError(false);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setIsLoginError(true);
    }
  };

  const renderSignUp = () => (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Name: <input type="text" name="name" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );

  const renderLogin = () => (
    <div>
      <h1>Login</h1>
      {isLoginError && <label className="error">{errorMessage}</label>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );

  // Handle the Signup/Login
  if (!isSignedUp) return renderSignUp();
  if (!isLoggedIn) return renderLogin();

  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default LoginAndSignup;
