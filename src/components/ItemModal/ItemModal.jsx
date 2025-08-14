import "./ItemModal.css";
import{useContext} from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ItemModal({
  activeModal,
  selectedCard,
  handleCloseModal,
  onItemModalDeletButton,
}) {

  const { currentUser } = useContext(CurrentUserContext)
  
  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === currentUser._id;
  
  // Creating a variable which you'll then set in `className` for the delete button
const itemDeleteButtonClassName = (
  `modal__button-delete modal__footer_text ${isOwn ? "" : 'modal__button-delete_hidden'}`
);


  return (
    <div
      className={`modal modal__card ${
        activeModal === "preview" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content modal__content_type-image">
        <button
          type="button"
          className="modal__close modal__close-btn_type-preview"
          onClick={handleCloseModal}
        ></button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer modal__footer_text">
          <div className="modal__footer__heading">
            <h2 className="modal__footer-name modal__footer_text">
              {selectedCard.name}
            </h2>
            <button
              type="button"
              onClick={onItemModalDeletButton}
              className={itemDeleteButtonClassName}
            >
              Delete
            </button>
          </div>

          <p className="modal__weather modal__footer_text">
            Weather: {selectedCard.weather}
          </p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
