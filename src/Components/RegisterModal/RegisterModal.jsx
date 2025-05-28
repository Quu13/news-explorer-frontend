import React from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  title,
  buttonText,
  secondaryBtnText,
  onClose,
  onSubmit,
  onSecondaryBtnClick,
}) => {
  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
  } = useForm({
    email: '',
    password: '',
    name: ''
  });

  const isDisabled = !isValid;

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = values;
    if (isDisabled) return;

    onSubmit({ name, email, password });
    onClose();
    setValues({ email: '', password: '', name: '' }); // Reset form after submission
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      buttonText={buttonText}
      secondaryBtnText={secondaryBtnText}
      onClose={onClose}
      onSecondaryBtnClick={onSecondaryBtnClick}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      containerClassName="modal__container--register"
    >
      <label htmlFor="register-email" className="modal__field">
        <span className="modal__label">Email</span>
        <input
          className="modal__input"
          type="email"
          name="email"
          id="register-email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label htmlFor="register-password" className="modal__field">
        <span className="modal__label">Password</span>
        <input
          className="modal__input"
          type="password"
          name="password"
          id="register-password"
          value={values.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          minLength={6}
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </label>

      <label htmlFor="register-name" className="modal__field">
        <span className="modal__label">Name</span>
        <input
          className="modal__input"
          type="text"
          name="name"
          id="register-name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
          minLength={2}
          maxLength={50}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;

