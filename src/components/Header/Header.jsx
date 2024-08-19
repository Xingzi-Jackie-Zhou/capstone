import "./Header.scss";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  console.log(sessionStorage.getItem("username"));
  const userNameId = sessionStorage.getItem("username");
  //const userId = sessionStorage.getItem("id");
  //console.log(userId);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const [profileActive, setProfileActive] = useState(false);
  useEffect(() => {
    if (location.pathname.startsWith(`/users/${userNameId}/profile`)) {
      setProfileActive(true);
    } else {
      setProfileActive(false);
    }
  }, [location, userNameId]);

  useEffect(() => {
    if (userNameId) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userNameId]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsLogin(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/users/login");
  };

  const goProfile = () => {
    navigate(`/users/${userNameId}/profile`);
  };
  return (
    <header className={`header ${isLogin ? "header--align" : ""}`}>
      <Link to="/" className="header__logo-link">
        <div className="header__logo-contanier">
          <h1 className="header__logo">HydroMap</h1>
        </div>{" "}
      </Link>
      <div className="header__navigation">
        <Link to="/" className="header__menu-link">
          <div
            className={`header__menu-contanier ${
              location.pathname === "/" ? "header__menu-contanier--active" : ""
            }`}
          >
            <p className="header__menu">Main menu</p>
          </div>
        </Link>

        <div
          className={`header__login-contanier ${
            isLogin ? "header__login-contanier--disappear" : ""
          }`}
        >
          <button
            className={`header__user-login ${
              location.pathname === "/users/login"
                ? "header__user-login--active"
                : ""
            }`}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div
          className={`header__logged-contanier ${
            isLogin ? "" : "header__logged-contanier--disappear"
          }`}
        >
          <button
            className={`header__user-profile ${
              profileActive ? "header__user-profile--active" : ""
            }`}
            onClick={goProfile}
          >
            {sessionStorage.getItem("username")}
          </button>
          <button className="header__logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
