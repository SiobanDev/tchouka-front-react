import React from "react";
//Styles
import "./AlertModal.style.scss";
//Librairies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon
            id="form-dialog-cross"
            icon={faTimes}
            onClick={closeModal}
          />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
export default AlertModal;
