import React from "react";
import Image from "next/image";

import styles from "./icon.module.css";

function Icon({ color, content, altText }) {
  // const bgColorClassNameMapping = {
  //   orange: "orange-bg",
  //   green: "green-bg",
  //   blue: "orange-bg",
  //   purple: "purple-bg",
  //   selected: "",
  //   unselected: "",
  //   success: "",
  //   error: "",
  // };

  return (
    <div className={`${styles.square} ${color}-bg`}>
      {content.type === "icon" && (
        <Image src={content.value} alt={altText} width={25} height={25} />
      )}

      {content.type === "text" && <p>{content.value}</p>}
    </div>
  );
}

export default Icon;
