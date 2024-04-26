import React from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import styles from "@/styles/StartMenu.module.css";
import Header from "@/components/layout/header";
import ItemRow from "@/components/ui/itemRow";
import { getAllQuizzes } from "@/helpers/api-util";
import { getStartMenuProps } from "@/helpers/dataFormatters";

const inter = Inter({ subsets: ["latin"] });

function StartMenu({ startMenuConfig }) {
  const router = useRouter();

  const items = startMenuConfig.map(({ id, text, imgSrc, iconBG }) => {
    const iconConfig = {
      color: iconBG,
      content: { type: "icon", value: imgSrc },
      altText: `${text} image`,
    };

    const onQuizSelected = (id) => {
      // console.log(id);
      router.push({
        pathname: "questions/[quiz]/[id]",
        query: { id: 1, quiz: id },
      });
    };

    return (
      <ItemRow
        key={id}
        id={id}
        content={text}
        onRowClick={() => onQuizSelected(id)}
        iconConfig={iconConfig}
      />
    );
  });

  return (
    <>
      <div className={styles.background}>
        <Header />
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles["content-wrapper"]}>
            <div className={styles.column}>
              <h1 className="heading-L">
                Welcome to the <br />
                <span className="heading-L--bold">Frontend Quiz!</span>
              </h1>
              <p className="body-S">Pick a subject to get started.</p>
            </div>

            <ul>{items}</ul>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await getAllQuizzes();

  return getStartMenuProps(data);
}

export default StartMenu;
