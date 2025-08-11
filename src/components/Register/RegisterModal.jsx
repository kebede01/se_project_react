// import { Link } from "react-router-dom";
import { useState } from "react";

import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const Register = ({  onCloseModal, isOpen }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
  const handleUserName = (e) => {
   setUsername(e.target.username)
  };

  const handleEmail = (e) => {
   setEmail(e.target.email)
  };

   const handlePassword = (e) => {
   setConfirmPassword(e.target.confirmPassword)
  };

   const handleConfirmPassword = (e) => {
   setPassword(e.target.password)
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleRegistration(data);
  // };

  return (
    <ModalWithForm
      buttonText="Sign up"
      title="Register"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      // onSubmitModal={handleSubmitModal}
    >
      <label htmlFor="username" className="modal__label">
        Username
        <input
          id="username"
          type="text"
          minLength="2"
          maxLength="30"
          className="modal__input"
          placeholder="Username"
          required
          name="username"
          value={username}
          onChange={handleUserName}
        />
      </label>

      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder=" email"
          name="email"
          value={email}
          required
        onChange={handleEmail}
        />
      </label>
      <label
        htmlFor=" password"
        className="modal__label "
      >
        Password
        <input
          type="password"
          id=" password"
          className="modal__input"
          name=" password"
          value={password}

          onChange={handlePassword}
        />
        
      </label>
      <label
        htmlFor="confirmPassword"
        className="modal__label "
      >
        Confirm Password
        <input
          type="password"
          id=" confirmPassword"
          className="modal__input"
          name=" confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
      
      </label>
    </ModalWithForm>
  );
};

export default Register;
