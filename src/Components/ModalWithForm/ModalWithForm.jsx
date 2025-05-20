import React, { useEffect } from "react"; // make sure this is here!
import { useEscape } from "../../hooks/useEscape";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
  secondaryBtnText,
  onSecondaryBtnClick,
  isDisabled,
  containerClassName,
  hideDefaultButton,
}) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div
        className={`modal__container ${containerClassName || ""}`}
        onClick={handleContentClick}
      >
        <button className="modal__close" onClick={onClose}></button>
        <h3
          className={
            containerClassName ? "modal__title--success" : "modal__title"
          }
        >
          {title}
        </h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {!hideDefaultButton &&
            (!secondaryBtnText ? (
              <button type="submit" className="modal__submit">
                {buttonText}
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className={`modal__submit ${
                    isDisabled ? "modal__submit_disabled" : ""
                  }`}
                  disabled={isDisabled}
                >
                  {buttonText}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    console.log("Secondary button clicked!"); // Add this line
                    onSecondaryBtnClick(e);
                  }}
                  className="modal__secondaryBtn"
                >
                  or{" "}
                  <span className="modal__secondaryBtn_hilight-text">
                    {secondaryBtnText}
                  </span>
                </button>
              </>
            ))}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
