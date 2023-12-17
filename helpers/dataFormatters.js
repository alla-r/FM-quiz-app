const getStartMenuProps = (data) => {
  let result = {
    notFound: true,
  };

  const colorBG = {
    HTML: "orange",
    CSS: "green",
    JavaScript: "blue",
    Accessibility: "purple",
  };

  if (data && data.quizzes && data.quizzes.length > 0) {
    const startMenuConfig = data.quizzes.map(({ title, icon }) => {
      return {
        id: title,
        text: title,
        imgSrc: icon,
        iconBG: colorBG[title] || "orange",
      };
    });

    result = {
      props: {
        startMenuConfig,
      },
    };
  }

  return result;
};

const getQuestionDetailsProps = (data, quiz, questionNumber) => {
  let result = {
    notFound: true,
  };

  if (data && data.quizzes && data.quizzes.length > 0) {
    const questions = data.quizzes.find((el) => el.title === quiz).questions;
    const questionDetails = questions[questionNumber - 1];

    if (questionDetails) {
      questionDetails.currentQuestion = questionNumber;
      questionDetails.amountOfQuestions = questions.length;
    }

    result = {
      props: {
        questionDetails,
      },
    };
  }

  return result;
};

const getStartMenuPaths = (data) => {
  let result = [];

  if (data && data.quizzes && data.quizzes.length > 0) {
    const titleArray = data.quizzes.map((quiz) => quiz.title);

    result = titleArray.map((title) => ({
      params: {
        id: "1",
        quiz: title,
      },
    }));
  }

  return result;
};

export { getStartMenuProps, getQuestionDetailsProps, getStartMenuPaths };
