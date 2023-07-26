import { Link } from "react-router-dom";

const SignUp = () => {
  return (
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
            Create your account. It's free and only take a minute. Already have
            an account?{" "}
            <Link
              className="font-semibold text-blue-500 hover:underline"
              to="/login"
            >
              Login
            </Link>{" "}
            now!
          </p>

          <form onSubmit={() => {}}>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Email"
                className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
              />
            </div>
            <div className="mt-5 flex items-center">
              <input type="checkbox" className="border border-gray-400 mr-2" />
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
              <button className="w-full border border-orange-500 py-3 text-center text-orange-500 hover:bg-orange-500 hover:text-white tracking-wider">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
