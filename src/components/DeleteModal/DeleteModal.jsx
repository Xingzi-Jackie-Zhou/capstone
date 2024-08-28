import "./DeleteModal.scss"; // Add your styles for the modal here

const DeleteModal = ({ isVisible, onClose, handleDelete, deleteId }) => {
  if (!isVisible) return null;

  const handleConfirm = () => {
    handleDelete(deleteId);
    onClose();
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <h3>
          Are you sure you want to delete the site with ID {deleteId} from all
          records?
        </h3>
        <div className="delete-modal__buttons">
          <button className="delete-modal__button-yes" onClick={handleConfirm}>
            Yes
          </button>
          <button className="delete-modal__button-no" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
