import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onCloseModal,
  onSubmitModal,
  onItemSubmitModal,
  onSubmitLogIn,
onEditModalSubmit,
  handleAddLogIn,
  handleAddRegistration,
  openAddItemButton,
  openLogInButton,
  openRegButton,
  openEditProfileButton
}) {
 

  const currentSubmitHandler = openRegButton ? onSubmitModal : onSubmitLogIn;

 
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
          name= ""
          className="modal__form modal__form_add"
          // onSubmit={openAddItemButton ?  onSubmitModal : null}
          onSubmit={currentSubmitHandler}
         
        >
          {children}
          { openRegButton ? (<div><button type="submit" className="modal__submit-btn">
            {buttonText}
          </button><span> or <button type="button" className="modal__submit-btn_alt" onClick={handleAddLogIn}  >
            Sign in
            </button></span></div>) : null}
          

          
          {openLogInButton ? (<div><button type="submit" className="modal__submit-btn"
         >
             {buttonText}
          </button><span> or <button type="button" className="modal__submit-btn_alt" onClick={handleAddRegistration} >
           Sign up
            </button></span></div>) : null}
          


        {openAddItemButton ? (<div><button type="submit" className="modal__submit-btn" onClick={onItemSubmitModal}
         >
             {buttonText}
          </button></div>) : null}



          {openEditProfileButton ? (<div><button type="submit" className="modal__submit-btn" onClick={onEditModalSubmit}
         >
             {buttonText}
          </button></div>) : null}
          
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
