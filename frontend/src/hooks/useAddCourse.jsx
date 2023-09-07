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
    level,
    total_hours,
    userId
  ) => {
    setIsLoading(true);
    setError(null);
    var userId = user.id;

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/courses/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title,
        short_description,
        description,
        category,
        level,
        total_hours,
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
