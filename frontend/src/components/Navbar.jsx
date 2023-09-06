import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [ham, setHam] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = () => {
    logout();
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
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
          <Link
            onClick={() => handleLinkClick("/")}
            className={`${
              activeLink === "/"
                ? "navLink ml-6 border-b-4 border-orange-500"
                : "navLink ml-6"
            }`}
            to="/"
          >
            <h1>Home</h1>
          </Link>
          <Link
            onClick={() => handleLinkClick("/about")}
            className={`${
              activeLink === "/about"
                ? "navLink ml-6 border-b-4 border-orange-500"
                : "navLink ml-6"
            }`}
            to="/about"
          >
            <h1>About</h1>
          </Link>
          <Link
            onClick={() => handleLinkClick("/courses")}
            className={`${
              activeLink === "/courses"
                ? "navLink ml-6 border-b-4 border-orange-500"
                : "navLink ml-6"
            }`}
            to="/courses"
          >
            <h1>Courses</h1>
          </Link>
          {user && user.role && user.role === "ADMIN" && (
            <Link
              onClick={() => handleLinkClick("/adminpanel")}
              className={`${
                activeLink === "/adminpanel"
                  ? "navLink ml-6 border-b-4 border-orange-500"
                  : "navLink ml-6"
              }`}
              to="/adminpanel"
            >
              <h1>Admin panel</h1>
            </Link>
          )}
          {user && user.role && user.role !== "TEACHER" && (
            <Link
              onClick={() => handleLinkClick("/enrolled")}
              className={`${
                activeLink === "/enrolled"
                  ? "navLink ml-6 border-b-4 border-orange-500"
                  : "navLink ml-6"
              }`}
              to="/enrolled"
            >
              <h1>Enrolled</h1>
            </Link>
          )}
          {user && user.role && user.role !== "STUDENT" && (
            <Link
              onClick={() => handleLinkClick("/dashboard")}
              className={`${
                activeLink === "/dashboard"
                  ? "navLink ml-6 border-b-4 border-orange-500"
                  : "navLink ml-6"
              }`}
              to="/dashboard"
            >
              <h1>Dashboard</h1>
            </Link>
          )}

          <Link
            onClick={() => handleLinkClick("/profile")}
            className={`${
              activeLink === "/profile"
                ? "navLink ml-6 border-b-4 border-orange-500"
                : "navLink ml-6"
            }`}
            to="/profile"
          >
            <h1>Profile</h1>
          </Link>
        </div>

        <div className="flex items-center">
          {!user && (
            <div className="flex">
              <Link
                to="/signup"
                className="w-20 h-8 border transition-all ease-out duration-500 font-semibold hover:bg-orange-300 hover:text-gray-600 text-orange-500 text-center rounded flex items-center justify-center"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="ml-4 w-20 h-8 border transition-all ease-out duration-500 font-semibold hover:bg-orange-300 hover:text-gray-600 text-orange-500 text-center rounded flex items-center justify-center"
              >
                Log in
              </Link>
            </div>
          )}
          {user && (
            <div className="flex items-center">
              <h3
                className={`rounded-full border px-2  text-center text-sm ${
                  user.role === "TEACHER" && "text-purple-800 bg-purple-200 "
                } ${user.role === "STUDENT" && "text-blue-800 bg-blue-200 "} ${
                  user.role === "ADMIN" && "text-yellow-800 bg-yellow-200 "
                }`}
              >
                {user.role}
              </h3>
              <button
                className="ml-4 w-20 h-8 border transition-all ease-out duration-500 font-semibold hover:bg-orange-300 hover:text-gray-600 text-orange-500 text-center rounded"
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
                <Link
                  onClick={() => handleLinkClick("/")}
                  className={`${activeLink === "/" ? " text-orange-500" : ""}`}
                  to="/"
                >
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
                <Link
                  onClick={() => handleLinkClick("/about")}
                  className={`${
                    activeLink === "/about" ? " text-orange-500" : ""
                  }`}
                  to="/about"
                >
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
                <Link
                  onClick={() => handleLinkClick("/courses")}
                  className={`${
                    activeLink === "/courses" ? " text-orange-500" : ""
                  }`}
                  to="/courses"
                >
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
                {user.role && user.role !== "TEACHER" && (
                  <Link
                    onClick={() => handleLinkClick("/enrolled")}
                    className={`${
                      activeLink === "/enrolled" ? " text-orange-500" : ""
                    }`}
                    to="/enrolled"
                  >
                    <div className="hover:bg-orange-200 p-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>

                      <h1 className="ml-3">Enrolled</h1>
                    </div>
                  </Link>
                )}
                {user.role && user.role !== "STUDENT" && (
                  <Link
                    onClick={() => handleLinkClick("/dashboard")}
                    className={`${
                      activeLink === "/dashboard" ? " text-orange-500" : ""
                    }`}
                    to="/dashboard"
                  >
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
                )}
                <Link
                  onClick={() => handleLinkClick("/profile")}
                  className={`${
                    activeLink === "/profile" ? " text-orange-500" : ""
                  }`}
                  to="/profile"
                >
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
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
