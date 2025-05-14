import React, { useEffect } from "react"; // make sure this is here!
import { useEscape } from "../../hooks/useEscape";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  buttonText,
  secondaryBtnText,
  onClose,
  onSubmit,
  onSecondaryBtnClick,
  isDisabled,
}) => {
  useEscape(onClose);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  return (
  <div className="modal">
    <button className="modal__close" onClick={onClose}></button> {/* This is now outside */}
    <div className="modal__container">
      <h3 className="modal__title">{title}</h3>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}
        {!secondaryBtnText ? (
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
              onClick={onSecondaryBtnClick}
              className="modal__secondaryBtn"
            >
              or
              <span className="modal__secondaryBtn_hilight-text">
                {secondaryBtnText}
              </span>
            </button>
          </>
        )}
      </form>
    </div>
  </div>
);
};

export default ModalWithForm;
