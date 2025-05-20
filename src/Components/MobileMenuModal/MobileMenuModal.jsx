import "./MobileMenuModal.css";
import { NavLink } from "react-router-dom";

function MobileMenuModal({
  isOpen,
  onLoginClick,
  onClose,
  loggedIn,
  onLogoutClick,
  onRegisterClick,
}) {
  return (
    <div
      className={`mobileMenuModal ${isOpen ? "mobileMenuModal_opened" : ""}`}
    >
      <NavLink
        to="/"
        className={`mobileMenuModal__home-link ${
          loggedIn ? "mobileMenuModal__home-link-logged-in" : ""
        }`}
        onClick={onClose}
      >
        Home
      </NavLink>

      {loggedIn ? (
        <>
          <NavLink
            to="/saved-articles"
            className="mobileMenuModal__saved-link"
            onClick={onClose}
          >
            Saved articles
          </NavLink>
          <button
            className="mobileMenuModal__sign-out-btn"
            onClick={() => {
              onLogoutClick();
              onClose();
            }}
          >
            LogOut
          </button>
        </>
      ) : (
        <div className="mobileMenuModal__auth-buttons">
          <button
            className="mobileMenuModal__sign-in-btn"
            onClick={() => {
              onLoginClick();
              onClose();
            }}
          >
            Sign in
          </button>
          <button
            className="mobileMenuModal__register-btn"
            onClick={() => {
              onRegisterClick();
              onClose();
            }}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default MobileMenuModal;