import React from "react";
import {useEscape} from "../../hooks/useEscape";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  buttonText,
  secondaryBtnText,
  onClose,
  onSubmit,
  onSecondaryBtnClick,
}) => {
  useEscape(onClose);
  return (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h3 className="modal__title">{title}</h3>
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          {!secondaryBtnText ? (
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          ) : (
            <>
              <button type="submit" className="modal__submit">
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