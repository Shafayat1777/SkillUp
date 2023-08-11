import ReactPlayer from "react-player";

const PdfView = ({ content, handleCloseWindow }) => {
  const handleCloseClick = (e) => {
    e.stopPropagation();
    handleCloseWindow();
  };

  return (
    <div className="z-10 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center h-screen bg-blue-950 bg-opacity-20">
      <div className="bg-white rounded-md relative w-[55rem] h-[35rem] m-5">
        <h1 className="p-4 font-bold text-xl text-gray-600">
          Slides - {content.title}
        </h1>
        <div
          onClick={handleCloseClick}
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
        {content.file.endsWith(".pdf") ?(
        <iframe
          className=" rounded-b-md w-full h-full"
          src={content.file}
          frameborder="0"
          title="Embedded content"
        ></iframe>):(
          <video >
            <source  src={content.file}/>
          </video>
        )}

        {/* <ReactPlayer controls url={content.file} /> */}
      </div>
    </div>
  );
};

export default PdfView;
