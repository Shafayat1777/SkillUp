import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

export const useCheckAuth = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const checkAuth = ({ data }) => {
    if (data === "jwt expired") {
      // remove user from cookies
      Cookies.remove("user");
      //dispatch logout action
      dispatch({ type: "LOGOUT" });
      navigate("/session");
    }
  };
  return { checkAuth };
};
