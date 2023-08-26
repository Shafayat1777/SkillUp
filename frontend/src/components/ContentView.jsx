import { useState } from "react";

const ContentView = ({ content }) => {
  const [showWindow, setShowWindow] = useState(false);

  const handleOpenWindow = () => {
    setShowWindow(true);
  };
  const handleCloseWindow = () => {
    setShowWindow(false);
  };
  

  return (
    <div>
      <div onClick={handleOpenWindow}>
        <div className="flex items-center px-16 py-1.5 hover:bg-orange-100 cursor-pointer font-bold">
          <div className=" border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center">
            {content.file.endsWith(".pdf") ? (
              <img className="w-5 h-5" src="/img/pdf.png" alt="pdf.img" />
            ) : (
              <img className="w-5 h-5" src="/img/video.png" alt="video.img" />
            )}
          </div>
          <div className="ml-3">{content.title}</div>
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
                frameborder="0"
                title="Embedded PDF content"
              ></iframe>
            ) : (
              <iframe
                className=" rounded-b-md w-full h-full"
                src={content.file}
                title="Embedded video player"
                frameborder="0"
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
