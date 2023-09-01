import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateProgress = () => {
  const { user } = useAuthContext();

  const updateProgress = async (courseId, lessonId, contentId) => {
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

  return { updateProgress };
};
