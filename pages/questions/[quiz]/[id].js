import React, { useState } from "react";
import { promises as fs } from "fs";
// import { useRouter } from "next/router";
import Header from "@/components/layout/header";
import ItemRow from "@/components/ui/itemRow";
import startMenuStyles from "@/styles/StartMenu.module.css";

function QuestionPage({ questionDetails }) {
  const [selectedOption, setSelectedOption] = useState("false");
  const optionLetter = ["A", "B", "C", "D"];
  const { options, currentQuestion, question, answer, amountOfQuestions } = questionDetails;

  // const router = useRouter();
  // TODO remove iconConfig and make auto
  // const iconConfig = {
  //   // color: START_MENU_CONFIG[3].iconBG,
  //   // content: { type: "icon", value: START_MENU_CONFIG[3].imgSrc },
  //   altText: `Accessibility image`,
  // };

  const items = options.map((option, i) => {
    const optionCharacter = optionLetter[i];
    const iconConfig = {
      color: "grey",
      content: { type: "text", value: optionCharacter },
      altText: `${optionCharacter} icon`,
      status: option === answer,
    };

    const onOptionSelected = (selectedOption) => {
      setSelectedOption(selectedOption);
    };

    return (
      <ItemRow
        key={option}
        id={option}
        content={option}
        onRowClick={() => onOptionSelected(option)}
        iconConfig={iconConfig}
        selectedOption={selectedOption}
        type="quizOption"
      />
    );
  });

  // console.log(router.query); // {id: 1, quiz: 'HTML'}

  return (
    <>
      <div className={startMenuStyles.background}>
        <Header
        // title="Accessibility" iconConfig={iconConfig}
        />
        <main className={startMenuStyles.main}>
          <div className={startMenuStyles["content-wrapper"]}>
            <div className={startMenuStyles.column}>
              <p className="body-S">{`Question ${currentQuestion} of ${amountOfQuestions}`}</p>
              <h1 className="heading-M">{question}</h1>
            </div>

            <ul>{items}</ul>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const questionNumber = params.id;
  const quiz = params.quiz;

  const jsonData = await fs.readFile(process.cwd() + "/data/data.json");
  const data = JSON.parse(jsonData);
  const questions = data.quizzes.find((el) => el.title === quiz).questions;
  const questionDetails = questions[questionNumber - 1];

  if (!questionDetails) {
    return {
      notFound: true,
    };
  } else {
    questionDetails.currentQuestion = questionNumber;
    questionDetails.amountOfQuestions = questions.length;
  }

  return {
    props: {
      questionDetails,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { id: "1", quiz: "HTML" },
        params: { id: "1", quiz: "CSS" },
        params: { id: "1", quiz: "JavaScript" },
        params: { id: "1", quiz: "Accessibility" },
      },
    ],
    fallback: "blocking",
  };
}

export default QuestionPage;
