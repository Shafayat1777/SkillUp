import { useState } from "react";

const LessionDetails = ({ lesson, no, handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClick = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="mt-10 border rounded-sm bg-orange-50">
      <div className="p-5 flex">
        <div className="flex items-center">
          <div className="rounded-full w-6 bg-black text-white text-center">
            {no}
          </div>
          <div className="ml-3 text-gray-600 font-bold text-xl">
            <h1>{lesson.title}</h1>
          </div>
        </div>
      </div>
      <div className="px-5 text-gray-600">
        <p>{lesson.description}</p>
      </div>

      <div className="mt-10">
        <div className="mx-5 py-5 border-t flex justify-between items-center">
          <h2
            onClick={handleOnClick}
            className=" font-bold px-2 py-1 rounded hover:bg-orange-200 text-orange-500 cursor-pointer"
          >
            {!isVisible ? (
              <div className="flex  items-center">
                {" "}
                View chapter details{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex  items-center">
                {" "}
                Hide chapter details{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
            )}
          </h2>
          <button className="mt-2 sm:mt-0 text-md py-1 px-3 hover:bg-orange-500 bg-orange-400 text-black text-center rounded font-semibold ">
            Start Chapter
          </button>
        </div>
        {isVisible && (
          <div className="mb-5">
            <div className="px-5 flex items-center hover:bg-orange-200 cursor-pointer h-10">
              <div className="rounded-full w-5 bg-black text-white text-center text-sm">
                1
              </div>
              <div className="ml-3 text-gray-600 font-bold text-md">
                <h3>Chapter Title</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessionDetails;
