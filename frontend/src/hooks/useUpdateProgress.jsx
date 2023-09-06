
import { useAuthContext } from "./useAuthContext";

export const useUpdateProgress = () => {
  const { user } = useAuthContext();

  const updateContentProgress = async (courseId, lessonId, contentId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_HOST}/users/updateContentProgress/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ courseId, lessonId, contentId }),
      }
    );
  };

  const updateQuizProgress = async (courseId, lessonId, quizId, quizScore, totalScore) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_HOST}/users/updateQuizProgress/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ courseId, lessonId, quizId, quizScore, totalScore }),
      }
    );
  };

  return { updateContentProgress, updateQuizProgress };
};
