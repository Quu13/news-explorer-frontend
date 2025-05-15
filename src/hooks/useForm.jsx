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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart(); // Optional UX choice

    setValues((prev) => ({ ...prev, [name]: trimmedValue }));

    // Validate inputs based on field
    if (name === "email") {
      const errorMsg = validateEmail(trimmedValue);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }

    // Check overall validity
    setIsValid(
      Object.values({
        ...errors,
        [name]: name === "email" ? validateEmail(trimmedValue) : "",
      }).every((err) => err === "")
    );
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