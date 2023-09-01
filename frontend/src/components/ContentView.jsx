import { useState } from "react";

const ContentView = ({
  contentProgress,
  content,
  lessonId,
  handleUpdateContentProgress,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  const handleOpenWindow = () => {
    setShowWindow(true);

    if (contentProgress && contentProgress.clicked !== true && lessonId) {
      handleUpdateContentProgress(lessonId, contentProgress.contentId);
    }
  };
  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  return (
    <div>
      <div onClick={handleOpenWindow}>
        <div className="relative flex items-center px-16 hover:bg-orange-100 cursor-pointer font-bold">
          <div
            className={`w-12 flex items-center justify-center ${
              contentProgress &&
              contentProgress.clicked === true &&
              "border-l-4 border-orange-400"
            } `}
          >
            <div
              className={`border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center my-1.5 ${
                contentProgress &&
                contentProgress.clicked === true &&
                "bg-orange-200"
              } `}
            >
              {content.file.endsWith(".pdf") ? (
                <img className="w-5 h-5" src="/img/pdf.png" alt="pdf.img" />
              ) : (
                <img className="w-5 h-5" src="/img/video.png" alt="video.img" />
              )}
            </div>
          </div>
          <div className="ml-3">{content.title}</div>
          {contentProgress && contentProgress.clicked === true && (
            <div className="absolute right-6 border rounded-full border-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {showWindow && (
        <div className="z-10 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center h-screen bg-blue-950 bg-opacity-20">
          <div className="bg-white rounded-md relative w-[55rem] h-[35rem] m-5">
            <h1 className="p-4 font-bold text-xl text-gray-600">
              Slides - {content.title}
            </h1>
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
            {content.file.endsWith(".pdf") ? (
              <iframe
                className=" rounded-b-md w-full h-full"
                src={content.file}
                title="Embedded PDF content"
              ></iframe>
            ) : (
              <iframe
                className=" rounded-b-md w-full h-full"
                src={content.file}
                title="Embedded video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentView;
