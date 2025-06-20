import './ItemModal.css'
function ItemModal({activeModal, selectedCard, handleCloseModal}) {
  return (
    <div className={`modal modal__card ${activeModal === "preview" ? "modal_opened" : ""}` } >
      <div className="modal__content modal__content_type-image">
         <button type="button" className="modal__close modal__close-btn_type-preview" onClick={handleCloseModal}>
          
        </button>
        <img src={selectedCard.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: { selectedCard.weather}</p>
        </div>
     </div>
    </div>
  )
}
export default ItemModal;