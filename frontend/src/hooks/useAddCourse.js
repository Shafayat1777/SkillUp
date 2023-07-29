import { useState } from "react";

export const useAddCourse = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addcourse = async (
    title,
    short_description,
    description,
    userId,
    userToken
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/courses/courses/", {
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
    }
  };

  return { addcourse, isLoading, error };
};
