import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isValid = (value: string) =>
    value.trim().length >= 4 && value.trim().length <= 30;

  const isFormValid = isValid(username) && isValid(password);
  const showUsernameError = username.length > 0 && !isValid(username);
  const showPasswordError = password.length > 0 && !isValid(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    localStorage.setItem("isLoggedIn", "1");
    navigate("/table");
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    showUsernameError,
    showPasswordError,
    isFormValid,
  };
};
