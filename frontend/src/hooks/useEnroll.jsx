import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useEnrollCourse = () => {
  const { user } = useAuthContext();
  const [errorEnroll, setErrorEnroll] = useState(null);
  const [responseEnroll, setIsResponseEnroll] = useState(null);

  const enrollcourse = async (courseId, progress) => {
    setIsResponseEnroll(null)
    setErrorEnroll(null);
    console.log(courseId)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/courses/enroll`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        courseId,
        progress,
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
