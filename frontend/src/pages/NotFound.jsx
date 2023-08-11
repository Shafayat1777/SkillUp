import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-start p-16">
      <div>
        <div className="flex mb-10">
          <h1 className="text-4xl font-bold text-orange-500">404!</h1>{" "}
          <h1 className="text-4xl ml-5 text-gray-600">Page Not Found</h1>
        </div>
        <p className="text-gray-600 text-xl">Sorry, that page cannot be found. Go back to the <Link to="/" className="text-orange-500 underline">homepage</Link>.</p>
        
      </div>
    </div>
  );
};

export default NotFound;
