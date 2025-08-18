// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const Register = ({
  onCloseModal,
  isOpen,
  onRegistration,
  buttonText,
  title,
  activeModal,
  handleAddLogIn,
  openRegistrationModal,
}) => {
  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [avatarRegister, setAvatarRegister] = useState("");
  //The following 'boolean' is to control button color
  const isFilled =
    emailRegister && nameRegister && passwordRegister && avatarRegister !== "";

  const handleNameRegister = (e) => {
    setNameRegister(e.target.value);
  };

  const handleEmailRegister = (e) => {
    setEmailRegister(e.target.value);
  };

  const handlePasswordRegister = (e) => {
    setPasswordRegister(e.target.value);
  };

  const handleAvatarUrl = (e) => {
    setAvatarRegister(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(
      nameRegister,
      avatarRegister,
      emailRegister,
      passwordRegister
    );
  };
  // To reset the form on modal change
  useEffect(() => {
    setAvatarRegister("");
    setEmailRegister("");
    setNameRegister("");
    setPasswordRegister("");
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmitRegistration={handleSubmit}
      activeModal={activeModal}
      handleAddLogIn={handleAddLogIn}
      openRegistrationModal={openRegistrationModal}
      isFilled={isFilled}
    >
      <label htmlFor="emailRegister" className="modal__label">
        Email
        <input
          id="emailRegister"
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          name="emailRegister"
          value={emailRegister}
          onChange={handleEmailRegister}
        />
      </label>

      <label htmlFor="passwordRegister" className="modal__label">
        Password
        <input
          id="passwordRegister"
          type="password"
          className="modal__input"
          placeholder=" Password"
          name="passwordRegister"
          value={passwordRegister}
          required
          autoComplete="current-password"
          onChange={handlePasswordRegister}
        />
      </label>
      <label htmlFor="nameRegister" className="modal__label ">
        Name
        <input
          type="text"
          id="nameRegister"
          minLength="2"
          maxLength="30"
          className="modal__input"
          name="nameRegister"
          value={nameRegister}
          placeholder="Name"
          autoComplete="nameRegister"
          onChange={handleNameRegister}
        />
      </label>
      <label htmlFor="avatarRegister" className="modal__label ">
        Avatar URL
        <input
          type="url"
          id="avatarRegister"
          className="modal__input"
          name="avatarRegister"
          placeholder="https://example.com"
          value={avatarRegister}
          onChange={handleAvatarUrl}
        />
      </label>
    </ModalWithForm>
  );
};

export default Register;
