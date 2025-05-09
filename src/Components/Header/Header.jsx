import React from 'react';
import './Header.css'; // if using separate CSS

function Header() {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <nav className="header__nav">
        <a href="/" className="header__link">Home</a>
        <button className="header__button">Sign in</button>
      </nav>
    </header>
  );
}

export default Header;