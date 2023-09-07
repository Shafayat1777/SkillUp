import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Helmet } from "react-helmet";

const SignUp = () => {
  // Show Password
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConfPassword] = useState("");
  const [passError, setPassError] = useState(null);
  const [role, setRole] = useState("STUDENT");
  const { signup, error, isLoading } = useSignup();
  const socials = { social1: "", social2: "", social3: "", social4: "" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassError(null);

    if (password !== conf_password) {
      setPassError("Password and Confirm passowrds dont match!");
    } else {
      await signup(firstName, lastName, email, password, socials, role);
    }
  };

  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign Up</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="mx-auto px-10 md:px-10 lg:px-20 xl:px-30 py-20">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 rounded-xl mx-auto shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-12 bg-gradient-to-r from-yellow-500 to-orange-500">
            <h1 className="text-5xl mb-3 text-white">SkillUp</h1>
            <div>
              <p className="text-white">
                Unlock Your Potential: Empowering Education for All - Welcome to
                SkillUP. A free online learning platfrom that offer diverse!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Signup</h2>
            <p className="mb-4">
              Create your account. It's free and only take a minute. Already
              have an account?{" "}
              <Link
                className="font-semibold text-blue-500 hover:underline"
                to="/login"
              >
                Login
              </Link>{" "}
              now!
            </p>

            <form onSubmit={handleSubmit}>
              <div className=" grid md:grid-cols-2 md:gap-5">
                <div className="mt-5">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5 ">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="mt-5 ">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Email"
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5 relative">
                <p className="text-orange-400 font-thin">*Password must be at least 8 characters long and include symbols [$~%], digits [0-9], and both capital and lowercase letters.</p>
              </div>
              <div className="mt-5 relative">
                <input
                  type={passwordType}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg "
                />

                <button
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={(e) => {
                    togglePassword(e);
                  }}
                >
                  {passwordType === "password" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-5">
                <input
                  onChange={(e) => setConfPassword(e.target.value)}
                  value={conf_password}
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5">
                <select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                </select>
              </div>
              <div className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  className="border border-gray-400 mr-2"
                />
                <span>
                  I accept the{" "}
                  <Link
                    className="font-semibold text-blue-500 hover:underline"
                    to="#"
                  >
                    Term of Use
                  </Link>{" "}
                  &{" "}
                  <Link
                    className="font-semibold text-blue-500 hover:underline"
                    to="#"
                  >
                    Privacy
                  </Link>{" "}
                  Policy
                </span>
              </div>
              <div className="mt-5">
                <button
                  disabled={isLoading}
                  className="w-full border border-orange-500 py-3 text-center text-orange-500 hover:bg-orange-500 hover:text-white tracking-wider"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-5">
                {error && (
                  <div className="w-full border border-red-500 text-center text-red-500 bg-red-200 tracking-wider">
                    {error}
                  </div>
                )}
              </div>
              <div className="mt-5">
                {passError && (
                  <div className="w-full border border-red-500 text-center text-red-500 bg-red-200 tracking-wider">
                    {passError}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
