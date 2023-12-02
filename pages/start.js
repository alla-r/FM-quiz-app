import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/StartMenu.module.css";

import iconHTML from "../public/assets/images/icon-html.svg";
import iconCSS from "../public/assets/images/icon-css.svg";
import iconJS from "../public/assets/images/icon-js.svg";
import iconAccessibility from "../public/assets/images/icon-accessibility.svg";

const inter = Inter({ subsets: ["latin"] });

export default function StartMenu() {
  const START_MENU_CONFIG = [
    {
      id: "html",
      text: "HTML",
      imgSrc: iconHTML,
      bgClassName: "orange-bg",
    },
    {
      id: "css",
      text: "CSS",
      imgSrc: iconCSS,
      bgClassName: "green-bg",
    },
    {
      id: "js",
      text: "Javascript",
      imgSrc: iconJS,
      bgClassName: "blue-bg",
    },
    {
      id: "accessibility",
      text: "Accessibility",
      imgSrc: iconAccessibility,
      bgClassName: "purple-bg",
    },
  ];

  const items = START_MENU_CONFIG.map(({ id, text, imgSrc, bgClassName }) => {
    return (
      <li key={id} className={styles.item}>
        <div className={`${styles["image-wrapper"]} ${bgClassName}`}>
          <Image src={imgSrc} alt={`${text} image`} width={25} height={25} />
        </div>

        <h3 className="heading-S">{text}</h3>
      </li>
    );
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles["content-wrapper"]}>
          <h1 className="heading-L">
            Welcome to the <br />
            <span className="heading-L--bold">Frontend Quiz!</span>
          </h1>
          <p className="body-S">Pick a subject to get started.</p>

          <ul>{items}</ul>
        </div>
      </main>
    </>
  );
}