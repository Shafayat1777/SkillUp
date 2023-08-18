import { useState } from "react";

const Quiz = ({ quiz }) => {
  const [showWindow, setShowWindow] = useState(false);

  const handleOpenWindow = () => {
    setShowWindow(true);
  };
  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  // pagination
  const parsedQuestions = JSON.parse(quiz.questions);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < parsedQuestions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentQuestion = parsedQuestions[currentPage];

  return (
    <div>
      <div onClick={handleOpenWindow}>
        <div className="flex items-center px-16 py-1.5 hover:bg-orange-100 cursor-pointer font-bold">
          <div className=" border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center">
            <img className="w-5 h-5" src="/img/exam.png" alt="pdf.img" />
          </div>
          <div className="ml-3">{quiz.title}</div>
        </div>
      </div>
      {showWindow && (
        <div className="z-10 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center h-screen bg-blue-950 bg-opacity-20">
          <div className="bg-white rounded-md relative w-[40rem] m-5">
            <div className="p-4 border-b-2 flex items-center justify-between">
              <h1 className=" font-bold text-xl text-gray-600">
                Quiz - {quiz.title}
              </h1>
              <div className="flex items-center mr-10 bg-sky-100 text-blue-700 font-semibold rounded p-2">
                <h3>Time Left</h3>
                <div className="ml-2 font-semibold rounded p-1 bg-slate-600 text-white">
                  08
                </div>
              </div>
            </div>
            <div
              onClick={handleCloseWindow}
              className="absolute top-3 right-3 rounded hover:bg-gray-100 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="items-center p-4">
              <h1 className="mb-3 flex items-center text-gray-600 text-xl font-bold">
                {currentPage + 1 + ". "}
                {currentQuestion.question}
              </h1>

              <h3 className="my-2 flex items-center border rounded pl-3 text-lg bg-blue-50 border-blue-400 text-gray-600 font-semibold hover:bg-blue-100 cursor-pointer">
                {currentQuestion.o1}
              </h3>
              <h3 className="my-2 flex items-center border rounded pl-3 text-lg bg-blue-50 border-blue-400 text-gray-600 font-semibold hover:bg-blue-100 cursor-pointer">
                {currentQuestion.o2}
              </h3>
              <h3 className="my-2 flex items-center border rounded pl-3 text-lg bg-blue-50 border-blue-400 text-gray-600 font-semibold hover:bg-blue-100 cursor-pointer">
                {currentQuestion.o3}
              </h3>
              <h3 className="my-2 flex items-center border rounded pl-3 text-lg bg-blue-50 border-blue-400 text-gray-600 font-semibold hover:bg-blue-100 cursor-pointer">
                {currentQuestion.o4}
              </h3>
            </div>
            <div className="p-4 flex items-center border-t-2 justify-between">
              <div className="text-lg text-gray-600 font-semibold">
                {currentPage +
                  1 +
                  " of " +
                  parsedQuestions.length +
                  " questions"}
              </div>
              <div className="flex">
                <h1
                  className="flex items-center justify-center mr-5 text-lg font-semibold h-10 w-24 border rounded  text-orange-500 cursor-pointer hover:bg-orange-50"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  Previous
                </h1>
                <h1
                  className="flex items-center justify-center text-lg font-semibold h-10 w-24 border rounded  text-orange-500 cursor-pointer hover:bg-orange-50"
                  onClick={handleNextPage}
                  disabled={currentPage === parsedQuestions.length - 1}
                >
                  Next
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
