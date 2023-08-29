
import { useAuthContext } from "./useAuthContext";

export const useUpdateProgress = () => {
  const { user } = useAuthContext();

  const updateContentProgress = async (courseId, lessonId, contentId) => {
    const response = await fetch(
      "http://localhost:4000/api/users/updateProgress/",
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
      "http://localhost:4000/api/users/updateQuizProgress/",
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
