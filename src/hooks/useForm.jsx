import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail === "") {
      return "Email is required";
    }
    if (!emailRegex.test(trimmedEmail)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) return "Password is required";
    if (trimmedPassword.length < 6)
      return "Password must be at least 6 characters long";
    return "";
  };

  const validateName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return "Name is required";
    if (trimmedName.length < 2)
      return "Name must be at least 2 characters long";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart();

    setValues((prev) => ({ ...prev, [name]: trimmedValue }));

    let errorMsg = "";
    if (name === "email") {
      errorMsg = validateEmail(trimmedValue);
    } else if (name === "password") {
      errorMsg = validatePassword(trimmedValue);
    } else if (name === "name") {
      errorMsg = validateName(trimmedValue);
    }

    const updatedErrors = { ...errors, [name]: errorMsg };
    setErrors(updatedErrors);

    const formIsValid = Object.values(updatedErrors).every(
      (err) => err === ""
    );
    setIsValid(formIsValid);
  };

  return {
    values,
    handleChange,
    setValues,
    errors,
    setErrors,
    isValid,
  };
};

export default useForm;
