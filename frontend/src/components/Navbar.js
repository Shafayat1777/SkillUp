import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const path = window.location.pathname; //returns the current url minus the domain name
  const x = "navLink ml-6 border-b-4 border-orange-500";
  const y = "navLink ml-6";
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="p-4 shadow-md">
      <div className=" mx-40 flex justify-between items-center">
        <div>
          <Link to="/">
            <h1 className=" text-2xl text-gray-500 hover:text-orange-500 cursor-pointer">
              SkillUp
            </h1>
          </Link>
        </div>
        <div className="text-gray-500 flex">
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
        <div className="flex">
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
              <span>{user.email}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
