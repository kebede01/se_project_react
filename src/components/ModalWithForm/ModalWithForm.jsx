import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onCloseModal,
  onSubmitModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onCloseModal}
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form
          name=""
          className="modal__form modal__form_add"
          onSubmit={onSubmitModal}
          noValidate
        >
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
