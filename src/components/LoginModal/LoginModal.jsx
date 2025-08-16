// import { Link } from "react-router-dom";
import { useState } from "react";

import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LogIn = ({
  onCloseModal,
  buttonText,
  title,
  isOpen,
  onLogIn,
  activeModal,
  handleAddRegistration,
  openLogInModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //The following 'boolean' is to control button color
  const isFilled = email && password !== "";

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(email, password);
    onCloseModal();
    setEmail("");
    setPassword("");
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmitLogIn={handleSubmit}
      activeModal={activeModal}
      handleAddRegistration={handleAddRegistration}
      openLogInModal={openLogInModal}
      isFilled={isFilled}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          name="email"
          value={email}
          required
          onChange={handleEmail}
        />
      </label>
      <label htmlFor="password" className="modal__label ">
        Password
        <input
          type="password"
          id=" password"
          className="modal__input"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handlePassword}
        />
      </label>
    </ModalWithForm>
  );
};

export default LogIn;
