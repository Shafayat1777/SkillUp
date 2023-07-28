import { useState } from "react";
import { useCoursesContext } from "./useCourseContext";

export const useAddCourse = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useCoursesContext()

  const addcourse = async (
    title,
    short_description,
    description,
    userId,
    userToken
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/courses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title, short_description, description, userId }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "CREATE_COURSES", payload: json });
    }
  };

  return { addcourse, isLoading, error };
};
