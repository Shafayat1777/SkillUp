import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Navbar = () => {
  const path = window.location.pathname; //returns the current url minus the domain name
  const x = "navLink ml-6 border-b-4 border-orange-500";
  const y = "navLink ml-6";
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [ham, setHam] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleHam = () => {
    if (ham) {
      setHam(false);
    } else {
      setHam(true);
    }
  };

  return (
    <nav className="p-4 shadow-md">
      <div className=" mx-5 md:mx-20 lg:md:mx-40 flex justify-between items-center">
        <div className="md:block">
          <Link to="/">
            <h1 className=" text-2xl text-gray-500 hover:text-orange-500 cursor-pointer">
              SkillUp
            </h1>
          </Link>
        </div>
        <div className="text-gray-500 hidden lg:flex">
          <Link className={path === "/" ? x : y} to="/">
            <h1>Home</h1>
          </Link>
          <Link className={path === "/about" ? x : y} to="/about">
            <h1>About</h1>
          </Link>
          <Link className={path === "/courses" ? x : y} to="/courses">
            <h1>Courses</h1>
          </Link>
          <Link className={path === "/dashboard" ? x : y} to="/dashboard">
            <h1>Dashboard</h1>
          </Link>
          <Link className={path === "/profile" ? x : y} to="/profile">
            <h1>Profile</h1>
          </Link>
        </div>
        <div className="flex items-center">
          {!user && (
            <div className="flex">
              <Link
                to="/signup"
                className="w-20 h-8 border border-orange-500 hover:bg-orange-200 text-orange-500 text-center rounded flex items-center justify-center"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="ml-4 w-20 h-8 border border-orange-500 hover:bg-orange-200 text-orange-500 text-center rounded flex items-center justify-center"
              >
                Log in
              </Link>
            </div>
          )}
          {user && (
            <div>
              <button
                className="ml-4 w-20 h-8 border border-orange-500 hover:bg-orange-200 text-orange-500 text-center rounded"
                onClick={handleClick}
              >
                Log out
              </button>
            </div>
          )}

          <div
            onClick={toggleHam}
            className=" cursor-pointer ml-6 flex items-center lg:hidden relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            
            {ham && (
            <div className="w-60 border bg-white  absolute top-9 right-[-410%] md:right-[-740%]">
              <Link to="/">
                <div className="hover:bg-orange-200 p-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <h1 className="ml-3">Home</h1>
                </div>
              </Link>
              <Link to="/about">
                <div className="hover:bg-orange-200 p-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>

                  <h1 className="ml-3">About</h1>
                </div>
              </Link>
              <Link to="/courses">
                <div className="hover:bg-orange-200 p-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>

                  <h1 className="ml-3">Course</h1>
                </div>
              </Link>
              <Link to="/dashboard">
                <div className="hover:bg-orange-200 p-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>

                  <h1 className="ml-3">Dashboard</h1>
                </div>
              </Link>
              <Link to="/profile">
                <div className="hover:bg-orange-200 p-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <h1 className="ml-3">Profile</h1>
                </div>
              </Link>
            </div>)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
