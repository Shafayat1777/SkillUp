import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CourseContextProvider } from "./context/CourseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <CourseContextProvider>
          <App />
        </CourseContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
