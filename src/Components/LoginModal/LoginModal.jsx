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
  isOpen, // ✅ added here
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
    console.log("Attempting to submit with:", { email, password }); // ✅ Log 1
    console.log("onSubmit is:", onSubmit); // ✅ Log 2
    onSubmit({ email, password });
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      buttonText={buttonText}
      secondaryBtnText={secondaryBtnText}
      onSecondaryBtnClick={onSecondaryBtnClick}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      containerClassName="modal__container--login"
    >
      <label className="modal__field" htmlFor="login-email">
        <span className="modal__label">Email</span>
        <input
          className="modal__input"
          type="email"
          name="email"
          id="login-email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__field" htmlFor="login-password">
        <span className="modal__label">Password</span>
        <input
          className="modal__input"
          type="password"
          name="password"
          id="login-password"
          value={values.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
