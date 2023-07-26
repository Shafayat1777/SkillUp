import { Link } from "react-router-dom";

const Navbar = () => {
    const path = window.location.pathname //returns the current url minus the domain name
    const x = 'navLink ml-6 border-b-4 border-orange-500'
    const y = 'navLink ml-6'
  return (
    <nav className="p-4 shadow-md">
      <div className=" mx-40 flex justify-between items-center">
        <Link to="/">
          <h1 className=" text-2xl text-gray-500 hover:text-orange-500 cursor-pointer">
            SkillUp
          </h1>
        </Link>
        <div className="text-gray-500 flex">
          <Link className={path==='/'? x: y} to="/">
            <h1>Home</h1>
          </Link>
          <Link className={path==='/about'? x: y} to="/about">
            <h1>About</h1>
          </Link>
          <Link className={path==='/courses'? x: y} to="/courses">
            <h1>Courses</h1>
          </Link>
          <Link className={path==='/dashboard'? x: y} to="/dashboard">
            <h1>Dashboard</h1>
          </Link>
          <Link className={path==='/profile'? x: y} to="/profile">
            <h1>Profile</h1>
          </Link>
          <Link className={path==='/signup'? x: y} to="/signup">
            <h1>Signup</h1>
          </Link>
          <Link className={path==='/login'? x: y} to="/login">
            <h1>Login</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
