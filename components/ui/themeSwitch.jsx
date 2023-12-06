import React from "react";
import Switch from "react-switch";
import { useMediaQuery } from "react-responsive";
import styles from "./themeSwitch.module.css";

function ThemeSwitch({ theme, toggleThemeHandler }) {
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 37.5em)" });

  return (
    <>
      {isTabletOrDesktop && (
        <Switch
          className={styles.switch}
          onChange={toggleThemeHandler}
          checked={theme === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          width={48}
          height={28}
          handleDiameter={20}
          onColor="#a729f5"
          offColor="#a729f5"
          boxShadow="none"
          activeBoxShadow="none"
        />
      )}

      {!isTabletOrDesktop && (
        <Switch
          className={styles.switch}
          onChange={toggleThemeHandler}
          checked={theme === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          width={32}
          height={20}
          handleDiameter={12}
          onColor="#a729f5"
          offColor="#a729f5"
          boxShadow="none"
          activeBoxShadow="none"
        />
      )}
    </>
  );
}

export default ThemeSwitch;
