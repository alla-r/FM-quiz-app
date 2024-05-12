import React, { useState } from "react";
import Header from "@/components/layout/header";
import ItemRow from "@/components/ui/itemRow";
import CustomButton from "@/components/ui/button";
import { getAllQuizzes } from "@/helpers/api-util";
import { getQuestionDetailsProps, getStartMenuPaths } from "@/helpers/dataFormatters";
import generalStyles from "@/styles/General.module.css";
import successIcon from "@/public/assets/images/icon-correct.svg";
import errorIcon from "@/public/assets/images/icon-incorrect.svg";

// TODO add block
function QuestionPage({ questionDetails }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const optionLetter = ["A", "B", "C", "D"];
  const { options, currentQuestion, question, answer, amountOfQuestions, iconConfig } =
    questionDetails;

  // TODO: replace hard code with state handling logic
  // Status: selected, error, success
  const status = "";
  const isSubmitted = false;

  const items = options.map((option, i) => {
    const optionCharacter = optionLetter[i];
    const iconConfig = {
      color: "grey",
      content: { type: "text", value: optionCharacter },
      altText: `${optionCharacter} icon`,
      status: status,
    };

    const ADDITIONAL_ICON_SRC = {
      success: successIcon,
      error: errorIcon,
    };

    // TODO: think about additionalIconConfig
    const additionalIconConfig = {
      content: {
        type: "icon",
        value: ADDITIONAL_ICON_SRC[status],
      },
      altText: `${status} icon`,
    };

    const onOptionSelected = (selectedOption) => {
      setSelectedOption(selectedOption);
      console.log(selectedOption);
    };

    return (
      <ItemRow
        key={option}
        content={option}
        onRowClick={() => onOptionSelected(option)}
        additionalIconConfig={isSubmitted && additionalIconConfig}
        iconConfig={iconConfig}
        status={status}
      />
    );
  });

  const BUTTON_SUBMIT_ANSWER = "Submit Answer";
  const BUTTON_NEXT_QUESTION = "Next Question";

  const onSubmitAnswer = () => {
    debugger;
    console.log(selectedOption);
  };

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
            <div>
              <ul>{items}</ul>
              <CustomButton
                onButtonClick={selectedOption ? onSubmitAnswer : () => {}}
                text={BUTTON_SUBMIT_ANSWER}
              />
            </div>
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
