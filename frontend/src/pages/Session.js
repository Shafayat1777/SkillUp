import { Link } from "react-router-dom";


const Session = () => {
  return (
    <div className="flex justify-start p-16">
      <div>
        <div className="flex mb-10">
          <h1 className="text-4xl mr-5 text-gray-600">Session </h1>
          <h1 className="text-4xl font-bold text-orange-500">Expired!</h1>
        </div>
        <p className="text-gray-600 text-xl">
          Sorry, You session has expired. Pleas again{" "}
          <Link to="/login" className="text-orange-500 underline">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Session;
