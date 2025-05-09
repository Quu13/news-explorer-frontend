import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const LoginModal = ({
  title,
  buttonText,
  secondaryBtnText,
  onSecondaryBtnClick,
  onClose,
  onSubmit,
}) => {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      return;
    }

    onSubmit({ email, password });
    onClose();
  };

  return (
    <ModalWithForm
      title={title}
      buttonText={buttonText}
      secondaryBtnText={secondaryBtnText}
      onSecondaryBtnClick={onSecondaryBtnClick}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        id="email"
        value={values.email || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="100"
        placeholder="Enter email"
      />

      <label htmlFor="password" className="modal__label">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        id="password"
        value={values.password || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="100"
        placeholder="Enter password"
      />
    </ModalWithForm>
  );
};

export default LoginModal;