import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  isOpen,
  onCloseModal,
  isFilled, // controlls button color
  //button text is decided by ternary operator
  buttonText,
  //came from LoginModal
  openLogInModal, // opens the modal
  onSubmitLogIn, // submits the form
  handleAddRegistration, // to switch from login to register modal

  //came from RegisterModal
  openRegistrationModal, // opens the modal
  onSubmitRegistration, // submits the form
  handleAddLogIn, //to switch from register modal to login modal

  //came from ProfileEditModal & edits user profile
  openEditProfileButton,
  onEditModalSubmit,

  //came from AddItemModal & adds clothing item
  openAddItemButton,
  onItemSubmitModal,
}) {
  const currentSubmitHandler = openRegistrationModal
    ? onSubmitRegistration
    : onSubmitLogIn;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : null}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onCloseModal}
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form
          name="modalWithForm"
          className="modal__form modal__form_add"
          onSubmit={currentSubmitHandler}
        >
          {children}
          {openRegistrationModal ? (
            <div>
              <button
                type="submit"
                className={`modal__submit-btn  ${
                  isFilled ? "modal__submit-btn_modifier" : null
                }`}
              >
                {buttonText}
              </button>
              <span>
                <button
                  type="button"
                  className="modal__submit-btn_alt"
                  onClick={handleAddLogIn}
                >
                  or Log in
                </button>
              </span>
            </div>
          ) : null}

          {openLogInModal ? (
            <div>
              <button
                type="submit"
                className={`modal__submit-btn ${
                  isFilled ? "modal__submit-btn_modifier" : null
                }`}
              >
                {buttonText}
              </button>
              <span>
                <button
                  type="button"
                  className="modal__submit-btn_alt"
                  onClick={handleAddRegistration}
                >
                  or Sign up
                </button>
              </span>
            </div>
          ) : null}

          {openAddItemButton ? (
            <div>
              <button
                type="submit"
                className={`modal__submit-btn ${
                  isFilled ? "modal__submit-btn_modifier" : null
                }`}
                onClick={onItemSubmitModal}
              >
                {buttonText}
              </button>
            </div>
          ) : null}

          {openEditProfileButton ? (
            <div>
              <button
                type="submit"
                className={`modal__submit-btn ${
                  isFilled ? "modal__submit-btn_modifier" : null
                }`}
                onClick={onEditModalSubmit}
              >
                {buttonText}
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
