import React from "react";
import { NavLink } from "react-router-dom"; // ✅ Use NavLink from React Router
import "./Header.css";

function Header({
  onLoginClick,
  onRegisterClick,
  onMobileMenuClick,
  onLogout,
  loggedIn,
  savedArticles,
}) {
  return (
    <header className="header">
      <span className="header__logo">NewsExplorer</span>
      <nav className="header__nav">
        <div className="header__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__link${isActive ? " header__link_active" : ""}`
            }
          >
            Home
          </NavLink>
        </div>

        <div className="header__buttons">
          <button
            className="header__button"
            onClick={() => {
              console.log("Sign in button clicked!");
              onLoginClick();
            }}
          >
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
