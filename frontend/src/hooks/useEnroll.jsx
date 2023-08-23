import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useEnrollCourse = () => {
  const { user } = useAuthContext();
  const [errorEnroll, setErrorEnroll] = useState(null);
  const [responseEnroll, setIsResponseEnroll] = useState(null);

  const enrollcourse = async (courseId) => {
    setIsResponseEnroll(null)
    setErrorEnroll(null);
    console.log(courseId)
    const response = await fetch("http://localhost:4000/api/courses/enroll", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        courseId,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setErrorEnroll(json.error);
    }
    if (response.ok) {
        setIsResponseEnroll(json);
    }
  };

  return { enrollcourse, responseEnroll, errorEnroll };
};
