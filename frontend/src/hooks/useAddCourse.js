import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { useCoursesContext } from "./useCourseContext";

export const useAddCourse = () => {
  const { dispatch } = useCoursesContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // var userID = user.id;
  // console.log(userID, userToken)
  const addcourse = async (
    title,
    short_description,
    description,
    category,
    userId,
    userToken
  ) => {
    setIsLoading(true);
    setError(null);
    var userId = user.id;
    var userToken = user.token;

    const response = await fetch("/api/courses/courses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        title,
        short_description,
        description,
        category,
        userId,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "ADD_COURSES", payload: json });
      setIsLoading(false);
    }
  };

  return { addcourse, isLoading, error };
};
