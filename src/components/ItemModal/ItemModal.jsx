import './ItemModal.css'
function ItemModal({activeModal, selectedCardItem, onClosePreview}) {
  return (
    <div className={`modal ${activeModal=== "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type-image">
         <button type="button" className="modal__close" onClick={onClosePreview}>
          X
        </button>
        <img src={selectedCardItem.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCardItem.name}</h2>
          <p className="modal__weather">Weather: { selectedCardItem.weather}</p>
        </div>
     </div>
    </div>
  )
}
export default ItemModal;