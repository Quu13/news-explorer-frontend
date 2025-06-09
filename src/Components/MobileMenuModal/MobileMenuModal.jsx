import "./MobileMenuModal.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function MobileMenuModal({
  isOpen,
  onLoginClick,
  onClose,
  loggedIn,
  onLogoutClick,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // prevent scroll when open
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobileMenuModal__overlay" onClick={onClose}>
      <div
        className="mobileMenuModal mobileMenuModal_dropdown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobileMenuModal__header">
          <span className="mobileMenuModal__logo">NewsExplorer</span>
          <button
            className="mobileMenuModal__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <NavLink to="/" className="mobileMenuModal__link" onClick={onClose}>
          Home
        </NavLink>

        {loggedIn ? (
          <>
            <NavLink
              to="/saved-articles"
              className="mobileMenuModal__link"
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
              Log Out
            </button>
          </>
        ) : (
          <button
            className="mobileMenuModal__sign-in-btn"
            onClick={() => {
              onLoginClick();
              onClose();
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenuModal;
