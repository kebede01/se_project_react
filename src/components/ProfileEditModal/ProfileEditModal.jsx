import "./ProfileEditModal.css";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ProfileEditModal({
  onCloseModal,
  isOpen,
  onSubmitEditModal,
  openEditProfileButton,
  buttonText,
  title,
}) {
  const [nameProfile, setNameProfile] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  //The following 'boolean' is to control button color
  const isFilled = nameProfile && avatarUrl !== "";

  const { currentUser } = useContext(CurrentUserContext);

  const handleNameProfile = (e) => {
    setNameProfile(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitEditModal(nameProfile, avatarUrl);
  };

  useEffect(() => {
    if (currentUser && currentUser.name && currentUser.avatar) {
      setNameProfile(currentUser.name);
      setAvatarUrl(currentUser.avatar);
    }
  }, [isOpen]);

  return (
    <>
      <ModalWithForm
        onCloseModal={onCloseModal}
        isOpen={isOpen}
        onEditModalSubmit={handleSubmit}
        openEditProfileButton={openEditProfileButton}
        buttonText={buttonText}
        title={title}
        isFilled={isFilled}
      >
        <label htmlFor="nameProfile" className="modal__label">
          Name
          <input
            id="nameProfile"
            type="text"
            className="modal__input"
            placeholder="Name"
            name="nameProfile"
            value={nameProfile}
            required
            onChange={handleNameProfile}
          />
        </label>
        <label htmlFor="avatarUrl" className="modal__label ">
          Avatar
          <input
            type="url"
            id="avatarUrl"
            className="modal__input"
            name="avatarUrl"
            value={avatarUrl}
            placeholder="Avatar"
            onChange={handleAvatar}
          />
        </label>
      </ModalWithForm>
    </>
  );
}

export default ProfileEditModal;
