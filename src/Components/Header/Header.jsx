import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({
  onLoginClick,
  onRegisterClick, // optional: remove if not needed
  onLogout,
  onMobileMenuClick, // optional: remove if not needed
  loggedIn,
  currentUser,
  isModalOpen,
}) {
  return (
    <header className="header">
      <Navigation
        handleSignInClick={onLoginClick}
        isLoggedIn={loggedIn}
        handleLogout={onLogout}
        currentUser={currentUser}
        isModalOpen={isModalOpen}
      />
    </header>
  );
}

export default Header;
