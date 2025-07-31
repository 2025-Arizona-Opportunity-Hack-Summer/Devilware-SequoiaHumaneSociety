import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function useSignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    if (Cookies.get("remember-me") !== undefined) {
      const data = JSON.parse(Cookies.get("remember-me"));
      setFormData((prev) => ({
        ...prev,
        email: data.email,
        password: data.password,
        rememberMe: true,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        rememberMe: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  return [formData, handleInputChange];
}

export default useSignInForm;
