import React, { useEffect } from "react";
import { useEscape } from "../../hooks/useEscape";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
  secondaryBtnText,
  onSecondaryBtnClick,
  isDisabled,
  containerClassName = "", // Modifier class for container styling
  hideDefaultButton = false, // Allows optional removal of submit buttons
}) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  useEscape(isOpen, onClose); // ✅ Escape key closes modal

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div
        className={`modal__container ${containerClassName}`}
        onClick={handleContentClick}
      >
        <button className="modal__close" onClick={onClose} />

        <h3
          className={
            containerClassName === "modal__container--success"
              ? "modal__title--success"
              : "modal__title"
          }
        >
          {title}
        </h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          {!hideDefaultButton && (
            <>
              <button
                type="submit"
                className={`modal__submit${
                  isDisabled ? " modal__submit_disabled" : ""
                }`}
                disabled={isDisabled}
              >
                {buttonText}
              </button>

              {secondaryBtnText && (
                <button
                  type="button"
                  onClick={(e) => {
                    console.log("Secondary button clicked!");
                    onSecondaryBtnClick(e);
                  }}
                  className="modal__secondaryBtn"
                >
                  or{" "}
                  <span className="modal__secondaryBtn_hilight-text">
                    {secondaryBtnText}
                  </span>
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
