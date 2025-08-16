import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  buttonText,
  title,
  onCloseModal,
  isOpen,
  openAddItemButton,
  onSubmitAddItemModal,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleImageInput = (e) => {
    setImage(e.target.value);
  };
  const handleRadioInput = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    onSubmitAddItemModal(name, image, weatherType);
    setName("");
    setImage("");
    setWeatherType("");
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      openAddItemButton={openAddItemButton}
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onItemSubmitModal={handleSubmitModal}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          minLength="1"
          maxLength="30"
          className="modal__input"
          placeholder="Name"
          required
          name="name"
          value={name}
          onChange={handleNameInput}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          id="imageUrl"
          type="text"
          className="modal__input"
          placeholder=" Image URL"
          name="imageUrl"
          value={image}
          required
          onChange={handleImageInput}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type-radio">
          <input
            type="radio"
            id="hot"
            className="modal__radio-input"
            name="weather"
            value="hot"
            checked={weatherType === "hot"}
            onChange={handleRadioInput}
          />
          <span className="modal__span">Hot</span>
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type-radio">
          <input
            type="radio"
            id="cold"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={weatherType === "cold"}
            onChange={handleRadioInput}
          />
          <span className="modal__span">Cold</span>
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type-radio">
          <input
            type="radio"
            id="warm"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={weatherType === "warm"}
            onChange={handleRadioInput}
          />
          <span className="modal__span">Warm</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
