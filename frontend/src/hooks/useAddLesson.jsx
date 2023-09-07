import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddLesson = () => {
  const { user } = useAuthContext();
  const [errorLesson, setErrorLesson] = useState(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(null);

  var userToken = user.token;

  const addlesson = async (
    lesson_title,
    lesson_description,
    courseId,
    handleDetailsReload
  ) => {
    setIsLoadingLesson(true);
    setErrorLesson(null);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/courses/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ lesson_title, lesson_description, courseId }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoadingLesson(false);
      setErrorLesson(json.error);
    }
    if (response.ok) {
      setIsLoadingLesson(false);
      handleDetailsReload();
    }
  };

  return { addlesson, isLoadingLesson, errorLesson };
};
