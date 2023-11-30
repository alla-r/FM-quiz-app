import React, { useState, useEffect } from "react";

import styles from "@/styles/theme.util.module.css";

function ThemeToggle() {
  const [theme, setTheme] = useState();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  const defaultTheme = () => {
    const themeLocalStorage = localStorage.getItem("theme");
    const themeSystem = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return themeLocalStorage ?? themeSystem;
  };

  useEffect(() => {
    if (!theme) return setTheme(defaultTheme());

    document.querySelector(":root").dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button
        key="themeToggle"
        onClick={toggleTheme}
        data-theme={theme}
        className={styles.toggle}
      >
        Change Theme
      </button>
    </>
  );
}

export default ThemeToggle;
