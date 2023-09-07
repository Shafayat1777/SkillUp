import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentView from "./ContentView";
import Quiz from "./Quiz";
import { useAuthContext } from "../hooks/useAuthContext";
import Enrolled from "../pages/Enrolled";

const LessionDetails = ({
  lessonProgress,
  isEnrolled,
  lesson,
  no,
  handleUpdateContentProgress,
  handleUpdateQuizProgress,
  handleCourseReload,
  reload,
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [totalClicked, setTotalClicked] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // update the lesson Progress page header data
    if (lessonProgress && lessonProgress.contents && lessonProgress.quiz) {
      const checkedContentCount = lessonProgress.contents.reduce(
        (count, content) => {
          count.content++;
          if (content.clicked === true) {
            count.clicked++;
          }
          return count;
        },
        { clicked: 0, content: 0 }
      );
      const checkedQuizCount = lessonProgress.quiz.reduce(
        (count, content) => {
          count.quiz++;
          if (content.clicked === true) {
            count.clicked++;
          }
          return count;
        },
        { clicked: 0, quiz: 0 }
      );

      setTotalClicked(checkedContentCount.clicked + checkedQuizCount.clicked);
      setTotalCount(checkedContentCount.content + checkedQuizCount.quiz);
    }
  }, [lessonProgress, reload]);

  const handleOnClick = () => {
    if (user) {
      if (isEnrolled) {
        if (isVisible) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setError("Please Enroll to view the lessons contents ");
      }
    } else {
      navigate("/login");
    }
  };

  const handleCloseError = () => {
    setError("")
  }
  return (
    <div>
      <div className="mt-10 border rounded-sm bg-orange-50">
        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center justify-center">
            <div className="rounded-full w-6 bg-gray-700 text-white text-center">
              {no}
            </div>
            <div className="ml-3 text-gray-600 font-bold text-xl">
              <h1>{lesson.title}</h1>
            </div>
          </div>
          {lessonProgress && (
            <div className="progress-bar flex items-center">
              <div className="mr-2 w-40 h-2 bg-gray-200 shadow-inner rounded-full overflow-hidden">
                <div
                  className="w-40 h-4 bg-green-400"
                  style={{
                    width: `${(totalClicked / totalCount) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-gray-600">
                {Math.round((totalClicked / totalCount) * 100)}%
              </div>
            </div>
          )}
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
          </div>
          {isVisible && (
            <>
              <div className="mb-5">
                <h1 className="text-center bg-gray-700 text-white text-lg font-bold w-44 rounded-r-md ">
                  Content
                </h1>
              </div>
              <div className="mb-5">
                {lesson.contents &&
                  lesson.contents.map((content, i) => (
                    <div key={content.id}>
                      <ContentView
                        contentProgress={
                          lessonProgress ? lessonProgress.contents[i] : null
                        }
                        content={content}
                        lessonId={
                          lessonProgress ? lessonProgress.lessonId : null
                        }
                        handleUpdateContentProgress={
                          handleUpdateContentProgress
                        }
                        handleCourseReload={handleCourseReload}
                      />
                    </div>
                  ))}
              </div>
              <div className="mb-5">
                <h1 className="text-center bg-gray-700 text-white text-lg font-bold w-44 rounded-r-md ">
                  Quiz
                </h1>
              </div>
              <div className="mb-5">
                {lesson.quiz &&
                  lesson.quiz.map((quiz, i) => (
                    <div key={quiz.id}>
                      <Quiz
                        quiz={quiz}
                        quizProgress={
                          lessonProgress ? lessonProgress.quiz[i] : null
                        }
                        lessonId={
                          lessonProgress ? lessonProgress.lessonId : null
                        }
                        handleUpdateQuizProgress={handleUpdateQuizProgress}
                        handleCourseReload={handleCourseReload}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="relative border px-5 py-2 rounded-sm mt-5 font-semibold text-gray-600 bg-red-100">
          {error}{" "}
          <svg
          onClick={handleCloseError}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className=" absolute right-2 top-2.5 w-5 h-5 rounded-md hover:bg-red-200 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LessionDetails;
