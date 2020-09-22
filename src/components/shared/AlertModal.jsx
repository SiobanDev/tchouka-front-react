import React from "react";
//styles
import "./AlertModal.style.scss";

const AlertModal = ({ modalOpen, title, closeModal, children }) => {
  const showHideClassName = modalOpen
    ? "modal display-block"
    : "modal display-none";

  return (
    <div
      open={modalOpen}
      onClose={closeModal}
      id="modal-container"
      className={showHideClassName}
      onClick={closeModal}
    >
      <div id="modal">
        <div id="modal-header">
          <h4 id="form-dialog-title">{title}</h4>
          <i
            onClick={closeModal}
            id="form-dialog-cross"
            className="fas fa-times "
          />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
export default AlertModal;
