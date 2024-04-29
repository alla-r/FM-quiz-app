import React, { useState } from "react";
import Header from "@/components/layout/header";
import ItemRow from "@/components/ui/itemRow";
import { getAllQuizzes } from "@/helpers/api-util";
import { getQuestionDetailsProps, getStartMenuPaths } from "@/helpers/dataFormatters";
import generalStyles from "@/styles/General.module.css";

// TODO add block
function QuestionPage({ questionDetails }) {
  const [selectedOption, setSelectedOption] = useState("false");
  const optionLetter = ["A", "B", "C", "D"];
  const { options, currentQuestion, question, answer, amountOfQuestions, iconConfig } =
    questionDetails;

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

  return (
    <>
      <div className={generalStyles.background}>
        <Header title={questionDetails.quizName} iconConfig={iconConfig} />
        <main className={generalStyles.main}>
          <div className={generalStyles["content-wrapper"]}>
            <div className={generalStyles.column}>
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

// TODO add try catch

export async function getStaticProps(context) {
  const { params } = context;
  const questionNumber = params.id;
  const quiz = params.quiz;

  const data = await getAllQuizzes();

  return getQuestionDetailsProps(data, quiz, questionNumber);
}

export async function getStaticPaths() {
  const data = await getAllQuizzes();

  const pathsConfig = getStartMenuPaths(data);
  return {
    paths: pathsConfig,
    fallback: "blocking",
  };
}

export default QuestionPage;
