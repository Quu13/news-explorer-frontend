import React from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  title,
  buttonText,
  secondaryBtnText,
  onClose,
  onSubmit,
}) => {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    if (!name || !email || !password) {
      return;
    }

    onSubmit({ name, email, password });
    onClose();
  };
  return (
    <ModalWithForm
      title={title}
      buttonText={buttonText}
      secondaryBtnText={secondaryBtnText}
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

      <label htmlFor="name" className="modal__label">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        id="name"
        value={values.name || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="50"
        placeholder="Enter name"
      />
    </ModalWithForm>
  );
};

export default RegisterModal;