import { createContext, useReducer } from "react";

export const CourseContext = createContext();

export const courseReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return { courses: action.payload };
    case "CREATE_COURSES":
      return { courses: [action.payload, ...state.courses] };
    case "DELETE_COURSES":
      return { courses: state.courses.filter((u) => u.id !== action.payload.id) };
    default:
      return state;
  }
};

export const CourseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, {
    courses: null,
  });

  console.log('CourseContext state:', state)

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};