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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = values;
    if (!name || !email || !password) return;

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
      disabled={!isValid}
    >
      <label htmlFor="register-email" className="modallabel">Email</label>
      <input
        className="modalinput"
        type="email"
        name="email"
        id="register-email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />
      {errors.email && <span className="form-error">{errors.email}</span>}

      <label htmlFor="register-password" className="modallabel">Password</label>
      <input
        className="modalinput"
        type="password"
        name="password"
        id="register-password"
        value={values.password}
        onChange={handleChange}
        placeholder="Enter password"
        required
        minLength={6}
      />
      {errors.password && <span className="form-error">{errors.password}</span>}

      <label htmlFor="register-name" className="modallabel">Name</label>
      <input
        className="modalinput"
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
      {errors.name && <span className="form-error">{errors.name}</span>}
    </ModalWithForm>
  );
};

export default RegisterModal;

