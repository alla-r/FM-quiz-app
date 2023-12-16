import React from "react";
import Icon from "./icon";

import styles from "./itemRow.module.css";

// TODO add correct error icon at the end of the row

function ItemRow({ iconConfig, onRowClick, id, content, type, selectedOption }) {
  if (type === "quizOption") {
    iconConfig.status = selectedOption === content ? "selected" : "";
  }

  return (
    <li className={styles.item} onClick={onRowClick}>
      <Icon {...iconConfig} />

      <h3 className="heading-S">{content}</h3>
    </li>
  );
}

export default ItemRow;
