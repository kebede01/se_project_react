import "./ModalWithForm.css";
// import  closeIcon  from '../../assets/close-icon.svg'
function ModalWithForm({children, buttonText, title, activeModal, handleCloseModal}) {
  return (
    <div className={`modal ${activeModal === "add garment" ? "modal_opened" : ""}`} onClick={handleCloseModal}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={handleCloseModal}>
          
        </button>
        <h2 className="modal__title">{ title }</h2>
        <form name="" className="modal__form" noValidate>
             {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
