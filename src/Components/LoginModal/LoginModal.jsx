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
  const { values, handleChange, errors, isValid } = useForm({
    email: "",
    password: "",
  });

  const isDisabled = !isValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const { email, password } = values;
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
      isDisabled={isDisabled}
    >
      <label htmlFor="email" className="modal__label">
        Email
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        id="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label htmlFor="password" className="modal__label">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        id="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}
    </ModalWithForm>
  );
};

export default LoginModal;
