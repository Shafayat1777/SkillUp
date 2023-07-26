import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { users: action.payload };
    case "CREATE_USER":
      return { users: [action.payload, ...state.users] };
    case "DELETE_USER":
      return { users: state.users.filter((u) => u.id !== action.payload.id) };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: null,
  });

  console.log('UserContext state:', state)

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
