import { useState } from "react";

export const useAddLesson = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addlesson = async (
    title,
    description,
    courseId,
    userToken
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/courses/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title, description, courseId }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { addlesson, isLoading, error };
};
