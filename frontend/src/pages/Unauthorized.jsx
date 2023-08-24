import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Unauthorized || SkillUP</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="flex justify-center h-screen">
        <div className="flex items-center">
          <img className="w-44 h-44" src="./img/unauthorized.png" alt="" />
          <div>
            <h1 className="text-5xl text-gray-600 font-light mb-2">Sorry!</h1>
            <h3 className="text-xl text-gray-600 mb-2">
              You are not Authorized to access this page
            </h3>
            <h3 className=" text-gray-600">
              Click here to go to{" "}
              <Link className="text-orange-400" to="/">
                Home
              </Link>{" "}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
