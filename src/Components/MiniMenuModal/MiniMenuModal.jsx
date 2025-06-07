import React from "react";
import { NavLink } from "react-router-dom";
import "./MiniMenuModal.css";
import { useEscape } from "../../hooks/useEscape";

function MiniMenuModal({ isOpen, onClose, onLoginClick }) {
  useEscape(isOpen, onClose);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("mini-modal")) {
      onClose();
    }
  };

  return (
    <div className="mini-modal" onClick={handleOverlayClick}>
      <div className="mini-modal__content">
        <button className="mini-modal__close" onClick={onClose} />
        <NavLink to="/" className="mini-modal__link" onClick={onClose}>
          Home
        </NavLink>
        <button className="mini-modal__signin" onClick={onLoginClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default MiniMenuModal;
