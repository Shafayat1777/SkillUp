import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember_me, setRememberMe] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
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
            <h2 className="text-3xl mb-4">Login</h2>
            <p className="mb-4">
              Already have an account? Login now or Dont have an account?{" "}
              <Link
                className="font-semibold text-blue-500 hover:underline"
                to="/signup"
              >
                Signup
              </Link>{" "}
              here!
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
              <div className="mt-5 flex items-center">
                <input
                  onChange={(e) => setRememberMe(true)}
                  type="checkbox"
                  className="border border-gray-400 mr-2"
                />
                <span>Remember me!</span>
              </div>
              <div className="mt-5">
                <button
                  disabled={isLoading}
                  className="w-full border border-orange-500 py-3 text-center text-orange-500 hover:bg-orange-500 hover:text-white tracking-wider"
                >
                  Log in
                </button>
                <p className="mb-4 mt-2">
                  Forgot your password?{" "}
                  <Link
                    className="font-semibold text-blue-500 hover:underline"
                    to="/forgotpassword"
                  >
                    Click here
                  </Link>{" "}
                  to reset!
                </p>
              </div>
              <div className="mt-5">
                {error && (
                  <div className="w-full border border-red-500 text-center text-red-500 bg-red-200 tracking-wider">
                    {error}
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

export default Login;
