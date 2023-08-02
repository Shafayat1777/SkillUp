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
      <div className="p-5 flex justify-between">
        <div className="flex items-center">
          <div className="rounded-full w-6 bg-black text-white text-center">
            {no}
          </div>
          <div className="ml-3 text-gray-600 font-bold text-xl">
            <h1>{lesson.title}</h1>
          </div>
        </div>
        <div
          onClick={() => handleDelete(lesson.id)}
          className="hover:bg-red-200 cursor-pointer border-red-500 ml-3 border w-8 h-8 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-6 h-6 text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
      <div className="px-5 text-gray-600">
        <p>{lesson.description}</p>
      </div>

      {isVisible && (
        <div className="px-5 mt-8">
          <div className="px-5 flex items-center hover:bg-orange-200 cursor-pointer h-10">
            <form action="">
              <div className="rounded-full w-5 bg-black text-white text-center text-sm">
                1
              </div>
              <div className="ml-3 text-gray-600 font-bold text-md">
                <h3>Chapter Title</h3>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-10 border-t">
        <div className="p-5 sm:flex justify-between items-center">
          <h2
            onClick={handleOnClick}
            className=" font-bold text-gray-600 hover:underline hover:text-orange-500 cursor-pointer"
          >
            {!isVisible ? (
              <div className="flex  items-center">
                {" "}
                View chapter details{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
            )}
          </h2>
          <button className="mt-2 sm:mt-0 text-lg border w-32 h-10 border-orange-500 hover:bg-orange-200 text-orange-500 text-center rounded ">
            Start Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessionDetails;
