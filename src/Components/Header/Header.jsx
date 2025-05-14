import React, { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import "./Header.css";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignInClick = () => setIsLoginOpen(true);
  const handleCloseModal = () => setIsLoginOpen(false);

  const handleLoginSubmit = ({ email, password }) => {
    console.log("Logging in with:", email, password);
    // Add actual login logic here
  };

  const handleSecondaryClick = () => {
    console.log("Switch to Sign Up modal");
    // Optionally switch to registration modal here
  };

  return (
    <>
      <header className="header">
        <a href="/" className="header__logo">NewsExplorer</a>
        <nav className="header__nav">
          <div className="header__links">
            <a href="#" className="header__link">Home</a>
          </div>
          <div className="header__buttons">
            <button className="header__button" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {isLoginOpen && (
        <LoginModal
          title="Sign in"
          buttonText="Sign In"
          secondaryBtnText="Sign up"
          onSecondaryBtnClick={handleSecondaryClick}
          onClose={handleCloseModal}
          onSubmit={handleLoginSubmit}
        />
      )}
    </>
  );
}

export default Header;