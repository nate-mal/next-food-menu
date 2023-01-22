import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <div onClick={props.onBlur} className={styles.backdrop} />
      <div className={styles.overlay}>{props.children}</div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
