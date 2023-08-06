import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConfPassword] = useState("");
  const [passError, setPassError] = useState(null);
  const [role, setRole] = useState("STUDENT");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassError(null);

    if (password !== conf_password) {
      setPassError("Password and Confirm passowrds dont match!");
    } else {
      await signup(email, password, role);
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
      
      <div className="mx-auto p-40">
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
              <div className="mt-5">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Email"
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                />
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
