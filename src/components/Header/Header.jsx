import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo-contanier">
        <Link to="/" className="header__logo-link">
          <h1 className="header__logo">HydroMap</h1>
        </Link>
      </div>
      <div className="header__login-contanier">
        <Link to="/login" className="header__login-link">
          <h3 className="header__login">Login</h3>
        </Link>
      </div>
    </header>
  );
}

export default Header;
