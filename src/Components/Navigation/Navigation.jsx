import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal";
import UserContext from "../../context/UserContext";

function Navigation({
  onLoginClick,
  onRegisterClick,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const location = useLocation();
  const { isLoggedIn, currentUser } = useContext(UserContext);

  const isSavedArticlesPage =
    location.pathname === "/saved-news" ||
    location.pathname === "/news-explorer/saved-articles";

  return (
    <nav
      className={`navigation ${isSavedArticlesPage ? "navigation_saved" : ""}`}
    >
      <div
        className={`navigation__link-container ${
          isMobileMenuOpen ? "navigation__link-container_menu-opened" : ""
        }`}
      >
        <span
          className={`navigation__logo ${
            isSavedArticlesPage ? "navigation__logo-saved" : ""
          }`}
        >
          NewsExplorer
        </span>

        <button
          className={`navigation__menu-button ${
            isMobileMenuOpen ? "navigation__menu-close-btn" : ""
          } ${isSavedArticlesPage ? "navigation__menu-button-saved" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        ></button>

        <div className="navigation__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__home-link ${
                isActive ? "navigation__link_active" : ""
              } ${isSavedArticlesPage ? "navigation__home-link-saved" : ""}`
            }
          >
            {({ isActive }) => (
              <div
                className={`navigation__link-wrapper ${
                  isActive ? "navigation__link-wrapper_active" : ""
                }`}
              >
                Home
              </div>
            )}
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `navigation__saved-link ${
                    isActive ? "navigation__link_active" : ""
                  } ${
                    isSavedArticlesPage ? "navigation__saved-link-saved" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`navigation__link-wrapper ${
                      isActive ? "navigation__link-wrapper_saved" : ""
                    }`}
                  >
                    Saved articles
                  </div>
                )}
              </NavLink>

              <button
                className={`navigation__sign-out-btn ${
                  isSavedArticlesPage ? "navigation__sign-out-btn-saved" : ""
                }`}
                onClick={onLogout}
              >
                {currentUser?.name}
                <span
                  className={`navigation__logout-icon ${
                    isSavedArticlesPage ? "navigation__logout-icon-saved" : ""
                  }`}
                ></span>
              </button>
            </>
          ) : (
            <button className="navigation__sign-in-btn" onClick={onLoginClick}>
              Sign in
            </button>
          )}
        </div>
      </div>

      {/* Mini Button for 320px view */}
      <button
        className="navigation__mini-button"
        onClick={() => alert("Mini button clicked!")}
        aria-label="Mini button"
      >
        Mini
      </button>

      <MobileMenuModal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogout}
        loggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </nav>
  );
}

export default Navigation;
