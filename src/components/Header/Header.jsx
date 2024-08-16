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
        <Link to="users/login" className="header__login-link">
          <h3 className="header__login">Login</h3>
        </Link>
      </div>
    </header>
  );
}

// import "./Header.scss";
// import { Link, useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode"; // Import the jwt-decode library
// import { useState, useEffect } from "react";

// const Header = () => {
//   const [userName, setUserName] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token, { header: true });
//         setUserName(decodedToken.userName || ""); // Adjust based on your token payload structure
//       } catch (error) {
//         console.error("Invalid token", error);
//         // setUserName(null); // Optionally handle token decoding error
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     setUserName(null);
//     navigate("/users/login");
//   };

//   return (
//     <header className="header">
//       <div className="header__logo-contanier">
//         <Link to="/" className="header__logo-link">
//           <h1 className="header__logo">HydroMap</h1>
//         </Link>
//       </div>

//       <div className="header__login-contanier">
//         {userName ? (
//           <>
//             <span className="header__username">Welcome, {userName}!</span>
//             <button className="header__logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/users/login" className="header__login-link">
//             <h3 className="header__login">Login</h3>
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

export default Header;
