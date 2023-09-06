import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddQuiz = () => {
  const { user } = useAuthContext();
  const [errorQuiz, setErrorQuiz] = useState(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(null);
  const addquiz = async (
    quizTitle,
    quizLessoneId,
    quiz,
    handleDetailsReload
  ) => {
    setIsLoadingQuiz(true);
    setErrorQuiz(null);
    var userId = user.id;

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/courses/quiz/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        quizTitle,
        quizLessoneId,
        quiz,
        userId,
      }),
    });

    console.log(quizTitle);
    console.log(quizLessoneId);
    console.log(quiz);
    const json = await response.json();

    if (!response.ok) {
      setIsLoadingQuiz(false);
      setErrorQuiz(json.error);
    }
    if (response.ok) {
      setIsLoadingQuiz(false);
      handleDetailsReload();
    }
  };

  return { addquiz, isLoadingQuiz, errorQuiz };
};
