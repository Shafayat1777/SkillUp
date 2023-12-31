import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useEditProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const editprofile = async (
    first_name,
    last_name,
    email,
    institute,
    designation,
    about,
    city,
    socials,
    country,
    gender
  ) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        institute,
        designation,
        about,
        city,
        socials,
        country,
        gender,
      }),
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

  return { editprofile, isLoading, error };
};
