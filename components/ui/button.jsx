import React from "react";

import styles from "./button.module.css";

function CustomButton({ onButtonClick, text }) {
  return (
    <button className={`${styles.button} heading-S`} onClick={onButtonClick}>
      {text}
    </button>
  );
}

export default CustomButton;
