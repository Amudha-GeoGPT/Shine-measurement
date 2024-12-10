import React from 'react';
import s from '../FileUpload.module.scss';

export const Modal = ({ show, title, body, onClose }) => {
  if (!show) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h3>{title}</h3>
        <p>{body}</p>
        <button className={s.modalButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};