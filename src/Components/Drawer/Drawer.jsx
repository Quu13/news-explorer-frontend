import React from "react";
import { Link } from "react-router";
import "./Drawer.css";

const Drawer = ({ handleOpenLoginModal, handleCloseModal, isLoggedIn }) => {
  return (
    <div className="drawer">
      <div className="drawer__container">
        <div className="drawer__header">
          <div className="drawer__logo">NewsExplorer</div>
          <button type='button' onClick={handleCloseModal} className="drawer__close-btn"></button>
        </div>
        <div className="drawer__links">
          <Link to="/" className="drawer__link">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/saved-news" className="drawer__link">
              Saved articles
            </Link>
          )}
          {isLoggedIn ? (
            <button className="drawer__link-pill-btn">Elise</button>
          ) : (
            <button
              type="button"
              onClick={handleOpenLoginModal}
              className="drawer__link-pill-btn"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;