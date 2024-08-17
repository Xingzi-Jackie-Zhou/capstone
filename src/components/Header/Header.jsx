import "./Header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  console.log(sessionStorage.getItem("userName"));
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
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
            {!sessionStorage.getItem("userName") ? (
              "Login"
            ) : (
              <div>
                {sessionStorage.getItem("userName")}
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
