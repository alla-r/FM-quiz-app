import React, { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import Switch from "react-switch";
import LightSunIcon from "@/public/assets/images/icon-sun-light.svg";
import DarkSunIcon from "@/public/assets/images/icon-sun-dark.svg";
import LightMoonIcon from "@/public/assets/images/icon-moon-light.svg";
import DarkMoonIcon from "@/public/assets/images/icon-moon-dark.svg";
import Icon from "../ui/icon";
import styles from "./header.module.css";

function Header({ title, iconConfig }) {
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
      <Script id="theme.util.jsx" strategy="beforeInteractive">
        {`
          let themeLocalStorage   = localStorage.getItem('theme');
          let themeSystem         = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          document.querySelector(':root').dataset.theme = themeLocalStorage ?? themeSystem;
        `}
      </Script>
      <header className={styles.header}>
        <div>
          <Icon {...iconConfig} />
          <h1 className="heading-S">{title}</h1>
        </div>

        <div className={styles.toggle}>
          <Image
            src={theme === "light" ? DarkSunIcon : LightSunIcon}
            alt="Light theme icon"
            width={16}
            height={16}
          />

          <Switch
            className={styles.switch}
            onChange={toggleTheme}
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

          <Image
            src={theme === "light" ? DarkMoonIcon : LightMoonIcon}
            alt="Light theme icon"
            width={16}
            height={16}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
