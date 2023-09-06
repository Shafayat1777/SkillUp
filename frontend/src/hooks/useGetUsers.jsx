import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetUsers = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState(null);

  const getusers = async () => {
    if (user && user.token) {
      const respons = await fetch("http://localhost:4000/api/users/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();
      if (respons.ok) {
        setUsers(json);
        if (users) console.log(users);
      }
      if (!respons.ok) {
      }
    }
  };

  return { getusers, users };
};
