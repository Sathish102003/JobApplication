// src/components/ModalMessage.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalMessage = ({ show, message, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMessage;
