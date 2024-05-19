import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/header";
import ItemRow from "@/components/ui/itemRow";
import CustomButton from "@/components/ui/button";
import generalStyles from "@/styles/General.module.css";
import styles from "@/styles/Result.module.css";

function QuestionPage() {
  const router = useRouter();

  const QUIZ_COMPLETED = "Quiz completed";
  const YOU_SCORED = "You scored...";
  const PLAY_AGAIN = "Play Again";

  const questionAmount = 10;
  const score = 8;

  // TODO: add iconConfig
  return (
    <>
      <div className={generalStyles.background}>
        <Header
        // title={questionDetails.quizName}
        // iconConfig={iconConfig}
        />
        <main className={generalStyles.main}>
          <div className={generalStyles["content-wrapper"]}>
            <div className={generalStyles.column}>
              <h1 className={`${styles.header} heading-L`}>{QUIZ_COMPLETED}</h1>
              <p className={`${styles.subheader} heading-L--bold`}>{YOU_SCORED}</p>
            </div>
            <div>
              <div className={styles["result-wrapper"]}>
                <div className={styles.score}>{score}</div>
                <div className={styles["score-description"]}>out of {questionAmount}</div>
              </div>
              <CustomButton onButtonClick={() => router.push("/")} text={PLAY_AGAIN} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default QuestionPage;
