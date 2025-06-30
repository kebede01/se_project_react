import "./ItemModal.css";
function ItemModal({
  activeModal,
  selectedCard,
  handleCloseModal,
  onItemModalDeletButton,
}) {
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
        <img src={selectedCard.imageUrl} alt="" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer__heading">
            <h2 className="modal__caption">{selectedCard.name}</h2>
            <button
              type="button"
              onClick={onItemModalDeletButton}
              className="modal__button"
            >
              Delete
            </button>
          </div>

          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
