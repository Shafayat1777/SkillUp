import { useState } from "react";

const LessionDetails = () => {
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
      <div className="p-5 flex items-center">
        <div className="rounded-full w-6 bg-black text-white text-center">
          1
        </div>
        <div className="ml-3 text-gray-600 font-bold text-xl">
          <h1>Chapter Title</h1>
        </div>
      </div>
      <div className="px-5 text-gray-600">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          laudantium eos eum, iusto nobis quisquam eius adipisci doloribus, nemo
          suscipit minus facilis? Libero veritatis quod nesciunt, magnam dolor
          velit accusamus.Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Pariatur laudantium eos eum, iusto nobis quisquam eius adipisci
          doloribus, nemo suscipit minus facilis? Libero veritatis quod
          nesciunt, magnam dolor velit accusamus.
        </p>
      </div>

      {isVisible && (
        <div className="px-5 mt-8">
          <div className="px-5 flex items-center hover:bg-orange-200 cursor-pointer h-10">
            <div className="rounded-full w-5 bg-black text-white text-center text-sm">
              1
            </div>
            <div className="ml-3 text-gray-600 font-bold text-md">
              <h3>Chapter Title</h3>
            </div>
          </div>
          <div className="px-5 flex items-center hover:bg-orange-200 cursor-pointer h-10">
            <div className="rounded-full w-5 bg-black text-white text-center text-sm">
              2
            </div>
            <div className="ml-3 text-gray-600 font-bold text-md">
              <h3>Chapter Title</h3>
            </div>
          </div>
          <div className="px-5 flex items-center hover:bg-orange-200 cursor-pointer h-10">
            <div className="rounded-full w-5 bg-black text-white text-center text-sm">
              3
            </div>
            <div className="ml-3 text-gray-600 font-bold text-md">
              <h3>Chapter Title</h3>
            </div>
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
