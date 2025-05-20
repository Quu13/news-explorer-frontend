import React from "react";
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
      <a href="/" className="header__logo">
        NewsExplorer
      </a>
      <nav className="header__nav">
        <div className="header__links">
          <a href="/" className="header__link">
            Home
          </a>
          {/* Add more links if needed */}
        </div>
        <div className="header__buttons">
          <button
            className="header__button"
            onClick={() => {
              console.log("Sign in button clicked!");
              onLoginClick(); // ✅ matches App.jsx
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
