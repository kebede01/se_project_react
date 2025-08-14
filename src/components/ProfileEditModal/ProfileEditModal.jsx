import "./ProfileEditModal.css"
import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
function ProfileEditModal({ onCloseModal, isOpen, onSubmitEditModal, openEditProfileButton, buttonText, title}) {

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
  
    const handleName = (e) => {
      setName(e.target.value);
    };
  
    const handleAvatar = (e) => {
      setAvatar(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmitEditModal(name, avatar);
      onCloseModal();
      setName("");
      setAvatar("");
    };
   
 
  return (
    <>
      <ModalWithForm onCloseModal={onCloseModal}
        isOpen={isOpen}
        onEditModalSubmit={handleSubmit}
        openEditProfileButton={openEditProfileButton}
        buttonText={buttonText}
        title={title}
      >
              <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          name="email"
          value={name}
          required
          onChange={handleName}
        />
      </label>
      <label htmlFor="avatar" className="modal__label ">
       Avatar
        <input
          type="url"
          id="avatar"
          className="modal__input"
          name="avatar"
          value={avatar}
          placeholder="Avatar"
          onChange={handleAvatar}
        />
      </label>   
     </ModalWithForm>
 
    </>
  );
}

export default ProfileEditModal;