import { useState } from "react";
//import Profile from "../ProfilePage/ProfilePage.jsx";
import "./SignupPage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const [formError, setFormError] = useState(false);
  const isSignupValid = async () => {
    if (!username || !name || !email || !password || confirmedPassword) {
      setFormError(true);
      return false;
    }
    if (password !== confirmedPassword) {
      setFormError(true);
      return false;
    }
    if (!email.includes("@")) {
      setFormError(true);
      return false;
    }
    try {
      const response = await axios.get(`${baseUrl}/users/check-username`, {
        params: { username },
      });
      if (response.data.exists) {
        setFormError(true);
        return false;
      }
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
    setFormError(false);
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const signupValid = isSignupValid();
    if (signupValid) {
      try {
        const response = await axios.post(`${baseUrl}/users/signup`, {
          username,
          name,
          email,
          password,
        });
        console.log(response.data);
        alert("Sign up sucessfully! Please login.");
        navigate("/users/login");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <div className="signup-Page">
      <h2 className="signup-Page__header">Sign Up</h2>
      <form className="signup-Page__form" onSubmit={handleSignup}>
        <div className="signup-Page__input-container">
          <label className="signup-Page__content-label" htmlFor="userName">
            Username :
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={`signup-Page__content ${
              !formError && !username ? "" : "signup-Page__content--inactive"
            }`}
          />
        </div>
        <div className="signup-Page__input-container">
          <label className="signup-Page__content-label" htmlFor="name">
            Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`signup-Page__content ${
              !formError && !name ? "" : "signup-Page__content--inactive"
            }`}
          />
        </div>
        <div className="signup-Page__input-container">
          <label className="signup-Page__content-label" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`signup-Page__content ${
              !formError && (!email || !email.includes("@"))
                ? ""
                : "signup-Page__content--inactive"
            }`}
          />
        </div>
        <div className="signup-Page__input-container">
          <label className="signup-Page__content-label" htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`signup-Page__content ${
              !formError && !password ? "" : "signup-Page__content--inactive"
            }`}
          />
        </div>
        <div className="signup-Page__input-container">
          <label
            className="signup-Page__content-label"
            htmlFor="confirmedPassword"
          >
            Confirmed Password:
          </label>
          <input
            type="password"
            id="confirmedPassword"
            name="confirmedPassword"
            placeholder="Confirmed Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            className={`signup-Page__content ${
              !formError && confirmedPassword !== password
                ? ""
                : "signup-Page__content--inactive"
            }`}
          />
        </div>
        <div className="signup-Page__button-container">
          <button className="signup-Page__button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
