import { useState } from "react";

function useRegistrationForm(checkValidation) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    agreeToTerms: false,
  });

  const [validFormData, setValidFormData] = useState({
    minLengthPassword: null,
    matchPassword: null,
    validEmail: null,
    minLengthFirstName: null,
    minLengthLastName: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      checkValidation(name, value);
    }
  };

  function checkValidation(name, value) {
    if (name === "firstName") {
      setValidFormData((prev) => ({
        ...prev,
        minLengthFirstName: value.length > 0,
      }));
    } else if (name === "lastName") {
      setValidFormData((prev) => ({
        ...prev,
        minLengthLastName: value.length > 0,
      }));
    } else if (name === "password") {
      setValidFormData((prev) => ({
        ...prev,
        minLengthPassword: value.length >= 8,
      }));

      if (validFormData.matchPassword !== null) {
        setValidFormData((prev) => ({
          ...prev,
          matchPassword: formData.confirmPassword === value,
        }));
      }
    } else if (name === "confirmPassword") {
      setValidFormData((prev) => ({
        ...prev,
        matchPassword: formData.password === value,
      }));
    } else if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setValidFormData((prev) => ({
        ...prev,
        validEmail: value.match(emailRegex) !== null ? true : false,
      }));
    }
  }

  return [formData, validFormData, handleInputChange];
}

export default useRegistrationForm;
