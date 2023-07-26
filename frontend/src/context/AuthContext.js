import { createContext, useReducer } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // checking and updating the gobal satat if the user is stored in cookies

  useEffect(() => {
    if (Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
