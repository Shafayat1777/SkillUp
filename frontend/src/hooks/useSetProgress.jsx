import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSetProgress = () => {
  const { user } = useAuthContext();

  const setProgress = async (progress) => {

    const response = await fetch(
      "http://localhost:4000/api/users/setProgress/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
        }),
      }
    );
  };


  return { setProgress };
};
