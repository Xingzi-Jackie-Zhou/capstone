import "./Header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  console.log(sessionStorage.getItem("username"));
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__logo-contanier">
        <Link to="/" className="header__logo-link">
          <h1 className="header__logo">HydroMap</h1>
        </Link>
      </div>
      <div className="header__login-contanier">
        <Link to="users/login" className="header__login-link">
          <h3 className="header__login">
            {!sessionStorage.getItem("username") ? (
              "Login"
            ) : (
              <div>
                {sessionStorage.getItem("username")}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </h3>
        </Link>
      </div>
    </header>
  );
}

export default Header;
