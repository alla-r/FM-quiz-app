import React, { useState } from "react";
import Header from "@/components/layout/header";
import ItemRow from "@/components/ui/itemRow";
import CustomButton from "@/components/ui/button";
import ErrorMessage  from "@/components/ui/errorMessage";
import { getAllQuizzes } from "@/helpers/api-util";
import { getQuestionDetailsProps, getStartMenuPaths } from "@/helpers/dataFormatters";
import { OPTION_LETTERS, ADDITIONAL_ICON_SRC, BUTTON_SUBMIT_ANSWER, BUTTON_NEXT_QUESTION } from "@/helpers/constants";
import generalStyles from "@/styles/General.module.css";

// TODO add block
function QuestionPage({ questionDetails }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(null);
  const [quizInfo, setQuizInfo] = useState({});

  const { options, currentQuestion, question, answer, amountOfQuestions, iconConfig } =
    questionDetails;

  // TODO: replace hard code with state handling logic
  // Status: selected, error, success
  const status = "error";
  const isSubmitted = true;

  const items = options.map((option, i) => {
    const optionCharacter = OPTION_LETTERS[i];
    const iconConfig = {
      color: "grey",
      content: { type: "text", value: optionCharacter },
      altText: `${optionCharacter} icon`,
      status: status,
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
      setIsErrorVisible(false);
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

  const onSubmitAnswer = () => {
    debugger;
    console.log(selectedOption);
    if (!selectedOption) {
      setIsErrorVisible(true);
      return;
    }
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
                onButtonClick={onSubmitAnswer}
                text={BUTTON_SUBMIT_ANSWER}
              />
              {isErrorVisible && <ErrorMessage />}
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
