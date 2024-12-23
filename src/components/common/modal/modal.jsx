import React from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./modal.module.scss";

const Modal = ({ show, handleClose, title, body, primaryButtonLabel }) => {
  return (
    <BootstrapModal show={show} onHide={handleClose} className={s.modall}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title className={s.modalTitle}>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className={s.modalContent}> 
        {body}
      </BootstrapModal.Body>
      <BootstrapModal.Footer className={s.modalFoooter}>
        <Button variant="primary" onClick={handleClose}>
            {primaryButtonLabel || 'Save Changes'}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
