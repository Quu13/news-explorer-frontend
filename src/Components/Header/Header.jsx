import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({
  onLoginClick,
  onRegisterClick,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  return (
    <header className="header">
      <Navigation
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogout={onLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>
  );
}

export default Header;