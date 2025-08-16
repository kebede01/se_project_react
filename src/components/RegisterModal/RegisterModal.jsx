// import { Link } from "react-router-dom";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  //The following 'boolean' is to control button color
  const isFilled = email && name && password && avatarUrl !== "";

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarUrl = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(name, avatarUrl, email, password);
    onCloseModal();
    setAvatarUrl("");
    setEmail("");
    setName("");
    setPassword("");
    handleAddLogIn();
  };

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
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={handleEmail}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="password"
          type="password"
          className="modal__input"
          placeholder=" Password"
          name="password"
          value={password}
          required
          autoComplete="current-password"
          onChange={handlePassword}
        />
      </label>
      <label htmlFor="name" className="modal__label ">
        Name
        <input
          type="text"
          id="name"
          minLength="2"
          maxLength="30"
          className="modal__input"
          name="name"
          value={name}
          placeholder="Name"
          autoComplete="name"
          onChange={handleName}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label ">
        Avatar URL
        <input
          type="url"
          id="avatarUrl"
          className="modal__input"
          name="avatarUrl"
          placeholder="https://example.com"
          value={avatarUrl}
          onChange={handleAvatarUrl}
        />
      </label>
    </ModalWithForm>
  );
};

export default Register;
