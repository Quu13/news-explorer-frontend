import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal";
import MiniMenuModal from "../MiniMenuModal/MiniMenuModal";
import "./Navigation.css";

function Navigation({ onLoginClick, onSignOutClick, isLoggedIn }) {
  const { pathname } = useLocation();
  const isSavedArticlesPage = pathname === "/saved-news";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openMiniModal = () => setIsMiniModalOpen(true);
  const closeMiniModal = () => setIsMiniModalOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`navigation ${isSavedArticlesPage ? "navigation_saved" : ""}`}
    >
      <div
        className={`navigation__link-container ${
          isMobileMenuOpen ? "navigation__link-container_menu-opened" : ""
        }`}
      >
        {/* ✅ NewsExplorer Logo */}
        <span
          className={`navigation__logo ${
            isSavedArticlesPage ? "navigation__logo-saved" : ""
          }`}
        >
          NewsExplorer
        </span>

        {/* ✅ Links */}
        {!isMobile && (
          <nav className="navigation__links">
            <NavLink to="/" className="navigation__home-link">
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/saved-news"
                className={`navigation__saved-link ${
                  isSavedArticlesPage ? "navigation__saved-link-saved" : ""
                }`}
              >
                Saved articles
              </NavLink>
            )}
            {!isLoggedIn ? (
              <button
                className="navigation__sign-in-btn"
                onClick={onLoginClick}
              >
                Sign in
              </button>
            ) : (
              <button
                className={`navigation__sign-out-btn ${
                  isSavedArticlesPage ? "navigation__sign-out-btn-saved" : ""
                }`}
                onClick={onSignOutClick}
              >
                <span>Sign out</span>
                <span
                  className={`navigation__logout-icon ${
                    isSavedArticlesPage
                      ? "navigation__logout-icon-saved"
                      : ""
                  }`}
                ></span>
              </button>
            )}
          </nav>
        )}

        {/* ✅ Mini Button (≤480px only) */}
        {isMobile && (
          <button
            className="navigation__mini-button"
            aria-label="Open menu"
            onClick={openMiniModal}
          >
            Menu
          </button>
        )}

        {/* ✅ Mobile Menu Button (Hamburger) */}
        <button
          className={`navigation__menu-button ${
            isSavedArticlesPage ? "navigation__menu-button-saved" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        ></button>
      </div>

      {/* ✅ Mobile full menu modal */}
      {isMobileMenuOpen && (
        <MobileMenuModal
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          onLoginClick={onLoginClick}
          onSignOutClick={onSignOutClick}
          isLoggedIn={isLoggedIn}
          isSavedArticlesPage={isSavedArticlesPage}
        />
      )}

      {/* ✅ Mini modal only for ≤480px */}
      {isMiniModalOpen && isMobile && (
        <MiniMenuModal
          isOpen={isMiniModalOpen}
          onClose={closeMiniModal}
          onLoginClick={onLoginClick}
        />
      )}
    </header>
  );
}

export default Navigation;
