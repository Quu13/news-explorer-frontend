import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">NewsExplorer</a>
      <nav className="header__nav">
        <div className="header__links">
          <a href="#" className="header__link">Home</a>
          <a href="#" className="header__link">About</a>
        </div>
        <div className="header__buttons">
          <button className="header__button">Sign In</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;