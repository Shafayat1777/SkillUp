import { useState } from "react";
import PdfView from "./pdfView";

const CourseContent = ({ lesson, i }) => {
  const [showcontent, setShowContent] = useState(false);

  const handleShowContent = () => {
    if (showcontent) {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
  };

  return (
    <div>
      <div key={lesson.id} className="border rounded-md shadow  mt-4">
        <div className="flex justify-between px-5 mt-5 mb-5">
          <div className="flex">
            <h3 className="font-semibold rounded-full w-6 h-6 flex items-center justify-center bg-black text-white">
              {i++}
            </h3>
            <h2 className="text-gray-600 ml-5 font-bold">{lesson.title}</h2>
          </div>
          <div onClick={handleShowContent}>
            {showcontent ? (
              <div className="flex items-center text-gray-60 font-semibold cursor-pointer hover:text-orange-400 ">
                <h3 className="">Hide Content</h3>
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
            ) : (
              <div className="flex items-center text-gray-60 font-semibold cursor-pointer hover:text-orange-400 ">
                <h3 className="">Show Content</h3>
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
            )}
          </div>
        </div>
        {showcontent && (
          <div className="mb-5">
            {lesson.contents &&
              lesson.contents.map((content) => (
                <div key={content.id}>
                  <PdfView content={content} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
