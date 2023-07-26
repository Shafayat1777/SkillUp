import { useAuthContext } from "./useAuthContext";
import Cookies from "js-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from cookies
    Cookies.remove("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
