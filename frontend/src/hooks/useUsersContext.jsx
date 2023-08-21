import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUsersContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUserContext must be used inside an UserContextProvider");
  }

  return context;
};
