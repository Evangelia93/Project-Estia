import React from "react";
import styles from "./Modal.module.css"; // Add modal styles as required

function Modal({ onClose, children }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span onClick={onClose} className={styles.close}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
