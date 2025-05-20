import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessModal({ isOpen, onClose, onLoginClick }) {
  const handleSignInClick = (e) => {
    e.preventDefault();
    onClose();
    onLoginClick();
  };

  return (
    <div className="success-modal">
      <ModalWithForm
        title="Registration successfully completed!"
        name="success"
        isOpen={isOpen}
        onClose={onClose}
        hideDefaultButton={true}
        containerClassName="modal__container--success"
      >
        <button onClick={handleSignInClick} className="modal__button">
          Sign in
        </button>
      </ModalWithForm>
    </div>
  );
}

export default SuccessModal;
