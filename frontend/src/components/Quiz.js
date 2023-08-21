import { useState, useEffect } from "react";

const Quiz = ({ quiz }) => {
  const [showWindow, setShowWindow] = useState(false);
  const [countdown, setCountdown] = useState(10); // Initial countdown value in seconds

  const [o1correct, setO1Correct] = useState(
    "bg-blue-50 border-blue-400 hover:bg-blue-100"
  );
  const [o2correct, setO2Correct] = useState(
    "bg-blue-50 border-blue-400 hover:bg-blue-100"
  );
  const [o3correct, setO3Correct] = useState(
    "bg-blue-50 border-blue-400 hover:bg-blue-100"
  );
  const [o4correct, setO4Correct] = useState(
    "bg-blue-50 border-blue-400 hover:bg-blue-100"
  );
  const [o1, setO1] = useState("idle");
  const [o2, setO2] = useState("idle");
  const [o3, setO3] = useState("idle");
  const [o4, setO4] = useState("idle");

  const handleOpenWindow = () => {
    setShowWindow(true);
  };
  const handleCloseWindow = () => {
    setShowWindow(false);
    setO1("idle");
    setO2("idle");
    setO3("idle");
    setO4("idle");
    setO1Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
    setO2Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
    setO3Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
    setO4Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
  };

  // pagination
  const parsedQuestions = JSON.parse(quiz.questions);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < parsedQuestions.length - 1) {
      setCurrentPage(currentPage + 1);
      setO1("idle");
      setO2("idle");
      setO3("idle");
      setO4("idle");
      setO1Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
      setO2Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
      setO3Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
      setO4Correct("bg-blue-50 border-blue-400 hover:bg-blue-100");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentQuestion = parsedQuestions[currentPage];

  const handleQuizAnswer = (e) => {
    const selectedAnswer = e.target.textContent;
    const id = e.target.getAttribute("id");
    console.log(selectedAnswer + "=" + currentQuestion.answer);
    if (selectedAnswer === currentQuestion.answer) {
      if (id === "o1") {
        setO1Correct("bg-green-50 border-green-400 hover:bg-green-100");
        setO1("correct");
      } else if (id === "o2") {
        setO2Correct("bg-green-50 border-green-400 hover:bg-green-100");
        setO2("correct");
      } else if (id === "o3") {
        setO3Correct("bg-green-50 border-green-400 hover:bg-green-100");
        setO3("correct");
      } else {
        setO4Correct("bg-green-50 border-green-400 hover:bg-green-100");
        setO4("correct");
      }
    } else {
      if (id === "o1") {
        setO1Correct("bg-red-50 border-red-400 hover:bg-red-100");
        setO1("incorrect");
      } else if (id === "o2") {
        setO2Correct("bg-red-50 border-red-400 hover:bg-red-100");
        setO2("incorrect");
      } else if (id === "o3") {
        setO3Correct("bg-red-50 border-red-400 hover:bg-red-100");
        setO3("incorrect");
      } else {
        setO4Correct("bg-red-50 border-red-400 hover:bg-red-100");
        setO4("incorrect");
      }
    }
  };

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
              <div className="flex items-center mr-10 bg-orange-100 text-orange-700 font-semibold rounded p-2">
                <h3>Time Left</h3>
                <div className="ml-2 font-semibold rounded p-1 bg-slate-600 text-white w-10 text-center">
                  {countdown.toString().padStart(2, "0")}
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

              <h3
                id="o1"
                onClick={(e) => handleQuizAnswer(e)}
                className={`relative my-2 flex items-center border rounded pl-3 text-lg ${o1correct} text-gray-600 font-semibold cursor-pointer`}
              >
                {currentQuestion.o1}
                {o1 === "correct" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.4"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-green-500 rounded-full text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {o1 === "incorrect" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-red-500 rounded-full text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </h3>

              <h3
                id="o2"
                onClick={(e) => handleQuizAnswer(e)}
                className={`relative my-2 flex items-center border rounded pl-3 text-lg ${o2correct} text-gray-600 font-semibold cursor-pointer`}
              >
                {currentQuestion.o2}
                {o2 === "correct" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.4"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-green-500 rounded-full text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {o2 === "incorrect" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-red-500 rounded-full text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </h3>
              <h3
                id="o3"
                onClick={(e) => handleQuizAnswer(e)}
                className={`relative my-2 flex items-center border rounded pl-3 text-lg ${o3correct} text-gray-600 font-semibold cursor-pointer`}
              >
                {currentQuestion.o3}
                {o3 === "correct" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.4"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-green-500 rounded-full text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {o3 === "incorrect" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-red-500 rounded-full text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </h3>
              <h3
                id="o4"
                onClick={(e) => handleQuizAnswer(e)}
                className={`relative my-2 flex items-center border rounded pl-3 text-lg ${o4correct} text-gray-600 font-semibold cursor-pointer`}
              >
                {currentQuestion.o4}
                {o4 === "correct" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.4"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-green-500 rounded-full text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {o4 === "incorrect" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 absolute top-1 right-3 border border-red-500 rounded-full text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
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
