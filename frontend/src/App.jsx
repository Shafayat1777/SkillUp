import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Session from "./pages/Session";
import Loading from "./pages/Loading";
import Enrolled from "./pages/Enrolled";
import NotFound from "./NotFound";
import Unauthorized from "./Unauthorized";

function App() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  // This useEffect is used to fix the reload problem: When reloading any page then it goes to the home page
  // by using a loading useState and useEffect to check if the user has been loaded we can prevent the problem
  // while the user is loading we are showing a Loading page.
  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar />}
        <div className="pages">
          <Routes>
            <Route
              path="/signup"
              element={
                loading ? <Loading /> : !user ? <SignUp /> : <Navigate to="/" />
              }
            />
            <Route
              path="/login"
              element={
                loading ? <Loading /> : !user ? <Login /> : <Navigate to="/" />
              }
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                loading ? (
                  <Loading />
                ) : user ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/courses"
              element={
                loading ? (
                  <Loading />
                ) : user ? (
                  <Courses />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/course/:id"
              element={
                loading ? (
                  <Loading />
                ) : user ? (
                  <Course />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/enrolled"
              element={
                loading ? (
                  <Loading />
                ) : user ? (
                  user.role !== "TEACHER" ? (
                    <Enrolled />
                  ) : (
                    <Unauthorized />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                loading ? (
                  <Loading />
                ) : user ? (
                  user.role !== "STUDENT" ? (
                    <Dashboard />
                  ) : (
                    <Unauthorized />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/session" element={<Session />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
