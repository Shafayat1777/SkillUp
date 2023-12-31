import { useAddContent } from "../hooks/useAddContent";
import { useAddCourse } from "../hooks/useAddCourse";
import { useAddLesson } from "../hooks/useAddLesson";
import { useAddQuiz } from "../hooks/useAddQuiz";
import { useState } from "react";

const CoursesForm = ({ handleHideForm, courses, handleDetailsReload }) => {
  const { addcourse, isLoading, error } = useAddCourse();
  const { addlesson, isLoadingLesson, errorLesson } = useAddLesson();
  const { addcontent, isLoadingContent, errorContent } = useAddContent();
  const { addquiz, isLoadingQuiz, errorQuiz } = useAddQuiz();

  // useStates for rendering show items
  // to show each type of form
  const [showCourseForm, setShowCourseForm] = useState(true);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showContentForm, setShowContentForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);

  // course add useState
  const [course_title, setTitle] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [main_description, setMainDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [total_hours, setTotalHours] = useState("");

  // lesson add useState
  const [courseId, setCourseId] = useState("");
  const [lesson_title, setLessonTitle] = useState("");
  const [lesson_description, setLessonDescription] = useState("");

  // Content add useState
  const [content_title, setContentTitle] = useState("");
  const [file, setFile] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [lessonId, setLessonId] = useState(null);
  const [link, setLink] = useState("");

  // Quiz add useState
  const [quiz, setQuiz] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCourseId, setQuizCourseId] = useState("");
  const [quizLessoneId, setQuizLessoneId] = useState("");

  const [contentType, setContentType] = useState("PDF");
  const [videoType, setVideoType] = useState("File");

  // to show selected form css
  const selected =
    "mr-5 border-b-4 border-orange-400 py-4 hover:text-orange-400 cursor-pointer";
  const not_selected = "mr-5 py-4 hover:text-orange-400 cursor-pointer";

  const [isDragOver, setIsDragOver] = useState(false);
  // file drag & drop functions
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (event) => {
    event.preventDefault(); // Prevent files from opening in the browser
    setIsDragOver(false);

    // Handle the dropped files here, if needed
    setFile({ file: event.dataTransfer.files[0], progress: 0 });
  };

  // quiz handles
  const handleAddQuestion = (e) => {
    const qv = [
      ...quiz,
      { question: "", o1: "", o2: "", o3: "", o4: "", answer: "" },
    ];
    setQuiz(qv);
  };
  const handleDeleteQuiz = (i) => {
    const deleteQuiz = [...quiz];
    deleteQuiz.splice(i, 1);
    setQuiz(deleteQuiz);
  };
  const handleChangeQuestion = (e, i) => {
    const quizdata = [...quiz];
    quizdata[i].question = e.target.value;
    setQuiz(quizdata);
  };
  const handleChangeO1 = (e, i) => {
    const quizdata = [...quiz];
    quizdata[i].o1 = e.target.value;
    setQuiz(quizdata);
  };
  const handleChangeO2 = (e, i) => {
    const quizdata = [...quiz];
    quizdata[i].o2 = e.target.value;
    setQuiz(quizdata);
  };
  const handleChangeO3 = (e, i) => {
    const quizdata = [...quiz];
    quizdata[i].o3 = e.target.value;
    setQuiz(quizdata);
  };
  const handleChangeO4 = (e, i) => {
    const quizdata = [...quiz];
    quizdata[i].o4 = e.target.value;
    setQuiz(quizdata);
  };
  const handleChangeAnswer = (e, i) => {
    const quizdata = [...quiz];
    quizdata[i].answer = e.target.value;
    setQuiz(quizdata);
  };

  // submit functions
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    await addcourse(
      course_title,
      short_description,
      main_description,
      category,
      level,
      total_hours
    );
  };
  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    await addlesson(
      lesson_title,
      lesson_description,
      courseId,
      handleDetailsReload
    );
  };
  const handleContentSubmit = async (e) => {
    e.preventDefault();
    await addcontent(
      content_title,
      file.file,
      lessonId,
      setFile,
      contentType,
      videoType,
      link,
      handleDetailsReload
    );
  };
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    await addquiz(quizTitle, quizLessoneId, quiz, handleDetailsReload);
  };

  // form show functions
  const handleShowCourseForm = () => {
    setShowCourseForm(true);
    setShowLessonForm(false);
    setShowContentForm(false);
    setShowQuizForm(false);
  };
  const handleShowLessonForm = () => {
    setShowCourseForm(false);
    setShowLessonForm(true);
    setShowContentForm(false);
    setShowQuizForm(false);
  };
  const handleShowContentForm = () => {
    setShowCourseForm(false);
    setShowLessonForm(false);
    setShowContentForm(true);
    setShowQuizForm(false);
  };
  const handleShowQuizForm = () => {
    setShowCourseForm(false);
    setShowLessonForm(false);
    setShowContentForm(false);
    setShowQuizForm(true);
  };

  const handleFileTypeVideo = () => {
    if (contentType === "PDF") {
      setContentType("Video");
      setLink("");
      setFile("");
    }
  };
  const handleFileTypePDF = () => {
    if (contentType === "Video") {
      setContentType("PDF");
      setVideoType("File");
      setLink("");
      setFile("");
    }
  };

  return (
    <div>
      <div className="border shadow rounded-md 2xl:w-[35rem] pt-5 relative">
        <div
          onClick={handleHideForm}
          className="absolute top-3 right-3  rounded  hover:bg-gray-200  cursor-pointer"
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
        <div className="px-6">
          {showCourseForm && (
            <h1 className="font-bold text-gray-600">Add Course</h1>
          )}
          {showLessonForm && (
            <h1 className="font-bold text-gray-600">Add Course Lessons</h1>
          )}
          {showContentForm && (
            <h1 className="font-bold text-gray-600">Add Lesson Contents</h1>
          )}
          {showQuizForm && (
            <h1 className="font-bold text-gray-600">Add Quiz</h1>
          )}
          <div className="flex border-b text-gray-400">
            <h3
              onClick={handleShowCourseForm}
              className={showCourseForm ? selected : not_selected}
            >
              Course
            </h3>
            <h3 className="mr-5 py-4 flex items-center text-orange-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </h3>
            <h3
              onClick={handleShowLessonForm}
              className={showLessonForm ? selected : not_selected}
            >
              Lessons
            </h3>
            <h3 className="mr-5 py-4 flex items-center text-orange-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </h3>
            <h3
              onClick={handleShowContentForm}
              className={showContentForm ? selected : not_selected}
            >
              Content
            </h3>
            <h3 className="mr-5 py-4 flex items-center text-orange-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </h3>
            <h3
              onClick={handleShowQuizForm}
              className={showQuizForm ? selected : not_selected}
            >
              Quiz
            </h3>
          </div>
        </div>

        <div className="mt-6">
          {/*Course Add form */}
          {showCourseForm && (
            <form onSubmit={handleCourseSubmit}>
              <div className="px-6">
                <table className="table-fixed w-full">
                  <tbody>
                    <tr>
                      <td className="flex">
                        <label className=" text-gray-600 font-semibold w-full block">
                          Course Title
                        </label>
                      </td>
                      <td>
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          value={course_title}
                          className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                          type="text"
                          placeholder="Title"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="flex">
                        <label className=" text-gray-600 font-semibold">
                          Course Short Description
                        </label>
                      </td>
                      <td>
                        <textarea
                          onChange={(e) => setShortDescription(e.target.value)}
                          value={short_description}
                          className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                          rows="4"
                          placeholder="Short description"
                        ></textarea>
                      </td>
                    </tr>

                    <tr>
                      <td className="flex">
                        <label className=" text-gray-600 font-semibold">
                          Course Main Description
                        </label>
                      </td>
                      <td>
                        <textarea
                          onChange={(e) => setMainDescription(e.target.value)}
                          value={main_description}
                          className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                          rows="7"
                          placeholder="Main description"
                        ></textarea>
                      </td>
                    </tr>

                    <tr>
                      <td className="flex">
                        <label className=" text-gray-600 font-semibold">
                          Level
                        </label>
                      </td>
                      <td>
                        <select
                          onChange={(e) => setLevel(e.target.value)}
                          value={level}
                          className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                        >
                          <option
                            className="text-orange-500"
                            value=""
                            disabled
                            selected
                          >
                            Select a Level
                          </option>

                          <hr />

                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="flex">
                        <label className=" text-gray-600 font-semibold">
                          Course Duration
                        </label>
                      </td>
                      <td>
                        <select
                          onChange={(e) => setTotalHours(e.target.value)}
                          value={total_hours}
                          className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                        >
                          <option
                            className="text-orange-500"
                            value=""
                            disabled
                            selected
                          >
                            Select total hours
                          </option>

                          <hr />

                          <option value="1-2">1-2</option>
                          <option value="2-3">2-3</option>
                          <option value="3-4">3-4</option>
                          <option value="4-5">4-5</option>
                          <option value="5-6">5-6</option>
                          <option value="5-6">6-7</option>
                          <option value="7-8">7-8</option>
                          <option value="8-9">8-9</option>
                          <option value="9-10">9-10</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="flex">
                        <label className=" text-gray-600 font-semibold">
                          Course Category
                        </label>
                      </td>
                      <td>
                        <select
                          onChange={(e) => setCategory(e.target.value)}
                          value={category}
                          className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                        >
                          <option
                            className="text-orange-500"
                            value=""
                            disabled
                            selected
                          >
                            Select a Category
                          </option>

                          <hr />

                          <option value="Data Manipulation">
                            Data Manipulation
                          </option>
                          <option value="Data Visualization">
                            Data Visualization
                          </option>
                          <option value="Data Engineering">
                            Data Engineering
                          </option>
                          <option value="AI & Machine Learning">
                            AI & Machine Learning
                          </option>
                          <option value="Probability & Satistics">
                            Probability & Satistics
                          </option>
                          <option value="Importing & Cleaning Data">
                            Importing & Cleaning Data
                          </option>
                          <option value="Applied Finance">
                            Web Development
                          </option>
                          <option value="Applied Finance">
                            Android App Development
                          </option>
                          <option value="Applied Finance">
                            Basic Programming
                          </option>
                          <option value="Applied Finance">
                            Advance Programming
                          </option>
                          <option value="Applied Finance">
                            System Desing
                          </option>
                          <option value="Applied Finance">
                            Software Engineering
                          </option>
                          <option value="Applied Finance">
                            Software Testing
                          </option>
                          <option value="Basic Python Programming">
                            Basic Python Programming
                          </option>
                          <option value="Web Development With PHP">
                            Web Development With PHP
                          </option>
                          <option value="Android App Development With Flutter">
                            Android App Development With Flutter
                          </option>
                          <option value="Software Testing">
                            Software Testing
                          </option>
                          <option value="Programming">Programming</option>
                          <option value="Management">Management</option>
                          <option value="Case Study">Case Study</option>

                          <option value="UI UX Desing">UI UX Desing</option>
                          <option value="Others">Others</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=" p-5 bg-gray-200 h-16 flex items-center justify-end">
                <input
                  disabled={isLoading}
                  className="cursor-pointer border-green-400 rounded-sm w-32 h-8 text-sm bg-white text-orange-400 hover:border-orange-400 hover:border"
                  type="reset"
                  value="RESET"
                />
                <input
                  disabled={isLoading}
                  className="cursor-pointer ml-5 rounded-sm w-32 h-8 text-sm bg-orange-400 text-white hover:bg-orange-500"
                  type="submit"
                  value="ADD"
                />
              </div>
            </form>
          )}

          {/*Lesson Add form */}
          {showLessonForm && (
            <form onSubmit={handleLessonSubmit}>
              {!courses[0] && (
                <p className="p-6 text-md text-orange-400">
                  Please add at least a single Course to access this form
                </p>
              )}
              {courses[0] && (
                <div className="px-6">
                  <table className="table-fixed w-full">
                    <tbody>
                      <tr>
                        <td className="flex">
                          <label className="w-full block text-gray-600 font-semibold">
                            Select a course
                          </label>
                        </td>
                        <td>
                          <select
                            onChange={(e) => setCourseId(e.target.value)}
                            value={courseId}
                            className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                          >
                            <option value="" disabled selected>
                              Select a course
                            </option>
                            {courses.map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.title}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td className="flex">
                          <label className="w-full block text-gray-600 font-semibold">
                            Lesson Title
                          </label>
                        </td>
                        <td>
                          <input
                            onChange={(e) => setLessonTitle(e.target.value)}
                            value={lesson_title}
                            className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            type="text"
                            placeholder="Title"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="flex">
                          <label className="w-full block text-gray-600 font-semibold">
                            Lesson Description
                          </label>
                        </td>
                        <td>
                          <textarea
                            onChange={(e) =>
                              setLessonDescription(e.target.value)
                            }
                            value={lesson_description}
                            className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            rows="5"
                            placeholder="Short description"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className=" p-5 bg-gray-200 h-16 flex items-center justify-end">
                <input
                  disabled={isLoadingLesson}
                  className="cursor-pointer border-green-400 rounded-sm w-32 h-8 text-sm bg-white text-orange-400 hover:border-orange-400 hover:border"
                  type="reset"
                  value="RESET"
                />
                <input
                  disabled={isLoadingLesson}
                  className="cursor-pointer ml-5 rounded-sm w-32 h-8 text-sm bg-orange-400 text-white hover:bg-orange-500"
                  type="submit"
                  value="ADD"
                />
              </div>
            </form>
          )}

          {/*Content Add form */}
          {showContentForm && (
            <form onSubmit={handleContentSubmit}>
              {!courses.length > 0 && (
                <p className="p-6 text-md text-orange-400">
                  Please add at least a single Course to access this form
                </p>
              )}
              {courses.length > 0 && (
                <div className="px-6">
                  <table className="table-fixed w-full">
                    <tbody>
                      <tr>
                        <td className="flex">
                          <label className=" text-gray-600 font-semibold">
                            Select a course
                          </label>
                        </td>
                        <td>
                          <select
                            onChange={(e) =>
                              setSelectedCourseId(e.target.value)
                            }
                            value={selectedCourseId}
                            className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                          >
                            <option value="" disabled selected>
                              Select a course
                            </option>
                            {courses &&
                              courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.title}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>

                      {selectedCourseId && (
                        <tr>
                          <td className="flex">
                            <label className=" text-gray-600 font-semibold">
                              Select a Lesson
                            </label>
                          </td>
                          <td>
                            <select
                              onChange={(e) => setLessonId(e.target.value)}
                              value={lessonId}
                              className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            >
                              <option value="" disabled selected>
                                Select a Lesson
                              </option>
                              {courses.map((course) => {
                                if (
                                  course.id === selectedCourseId &&
                                  course.lessons &&
                                  course.lessons.length > 0
                                ) {
                                  return course.lessons.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                      {lesson.title}
                                    </option>
                                  ));
                                }
                                return null;
                              })}
                            </select>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td className="flex">
                          <label className=" text-gray-600 font-semibold">
                            Content Title
                          </label>
                        </td>
                        <td>
                          <input
                            onChange={(e) => setContentTitle(e.target.value)}
                            value={content_title}
                            className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            type="text"
                            placeholder="Title"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="flex flex-col">
                          <label className=" text-gray-600 font-semibold">
                            Content Type
                          </label>
                          {contentType === "Video" && (
                            <label className=" text-gray-600 font-semibold mt-7">
                              Video File Type
                            </label>
                          )}
                        </td>
                        <td>
                          <div className="flex">
                            <h3
                              onClick={handleFileTypePDF}
                              className={`text-center border ${
                                contentType === "PDF"
                                  ? "text-orange-600"
                                  : "text-gray-600"
                              } rounded-sm p-1 mb-5 w-full hover:bg-orange-100 cursor-pointer`}
                            >
                              PDF
                            </h3>{" "}
                            <h3
                              onClick={handleFileTypeVideo}
                              className={`text-center border ${
                                contentType === "Video"
                                  ? "text-orange-600"
                                  : "text-gray-600"
                              } rounded-sm p-1 mb-5 w-full hover:bg-orange-100 cursor-pointer`}
                            >
                              Video
                            </h3>
                          </div>
                          {contentType === "Video" && (
                            <select
                              onChange={(e) => setVideoType(e.target.value)}
                              value={videoType}
                              className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            >
                              <option value="File">File</option>
                              <option value="Link">Link</option>
                            </select>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="flex">
                          <label className="mr-20 text-gray-600 font-semibold">
                            Add {contentType === "PDF" ? "PDF" : "Video"} File{" "}
                            {videoType === "Link" && "Link"}
                          </label>
                        </td>
                        <td>
                          {videoType === "Link" ? (
                            <input
                              onChange={(e) => setLink(e.target.value)}
                              value={link}
                              className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                              type="text"
                              placeholder="Link"
                            />
                          ) : (
                            <div
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              className={`mb-5 flex px-6 py-12 items-center flex-col border-2 border-dashed ${
                                isDragOver
                                  ? "border-orange-500 bg-orange-50"
                                  : "border-gray-400"
                              } rounded-md`}
                            >
                              <svg
                                className="w-12 h-12 text-gray-500"
                                aria-hidden="true"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                              </svg>
                              <p className="text-xl text-gray-700">
                                Drop files to upload
                              </p>

                              <p className="mb-2 text-gray-700">or</p>

                              <label className="cursor-pointer hover:border-orange-300 hover:text-orange-400 bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                                Select files
                                <input
                                  onChange={(e) => {
                                    setFile({
                                      file: e.target.files[0],
                                      progress: 0,
                                    });
                                  }}
                                  type="file"
                                  className="sr-only"
                                />
                              </label>

                              <p className="text-xs text-gray-600 mt-4">
                                Maximum upload file size: 500MB.
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          {file && (
                            <ul className="mb-5 bg-white rounded divide-y divide-gray-200 shadow border">
                              <li className="p-3 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                  {file.file.name}
                                </div>

                                <div className="w-40 bg-gray-200 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
                                  <div
                                    className="inline-block h-full bg-orange-400 absolute top-0 left-0"
                                    style={{ width: `${file.progress}%` }}
                                  ></div>
                                  <div className="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">
                                    {file.progress} %
                                  </div>
                                </div>
                              </li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className=" p-5 bg-gray-200 h-16 flex items-center justify-end">
                <input
                  disabled={isLoadingContent}
                  className="cursor-pointer border-green-400 rounded-sm w-32 h-8 text-sm bg-white text-orange-400 hover:border-orange-400 hover:border"
                  type="reset"
                  value="RESET"
                />
                <input
                  disabled={isLoadingContent}
                  className="cursor-pointer ml-5 rounded-sm w-32 h-8 text-sm bg-orange-400 text-white hover:bg-orange-500"
                  type="submit"
                  value="ADD"
                />
              </div>
            </form>
          )}

          {/*Course Quiz form */}
          {showQuizForm && (
            <form onSubmit={handleQuizSubmit}>
              {!courses.length > 0 && (
                <p className="p-6 text-md text-orange-400">
                  Please add at least a single Course to access this form
                </p>
              )}
              {courses.length > 0 && (
                <div className="px-6">
                  <table className="table-fixed w-full">
                    <tbody>
                      <tr>
                        <td className="flex">
                          <label className=" text-gray-600 font-semibold">
                            Select a course
                          </label>
                        </td>
                        <td>
                          <select
                            onChange={(e) => setQuizCourseId(e.target.value)}
                            value={quizCourseId}
                            className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                          >
                            <option value="" disabled selected>
                              Select a course
                            </option>
                            {courses &&
                              courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.title}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>

                      {quizCourseId && (
                        <tr>
                          <td className="flex">
                            <label className=" text-gray-600 font-semibold">
                              Select a Lesson
                            </label>
                          </td>
                          <td>
                            <select
                              onChange={(e) => setQuizLessoneId(e.target.value)}
                              value={quizLessoneId}
                              className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            >
                              <option value="" disabled selected>
                                Select a Lesson
                              </option>
                              {courses.map((course) => {
                                if (
                                  course.id === quizCourseId &&
                                  course.lessons &&
                                  course.lessons.length > 0
                                ) {
                                  return course.lessons.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                      {lesson.title}
                                    </option>
                                  ));
                                }
                                return null;
                              })}
                            </select>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td className="flex">
                          <label className=" text-gray-600 font-semibold">
                            Quiz Title
                          </label>
                        </td>
                        <td>
                          <input
                            onChange={(e) => setQuizTitle(e.target.value)}
                            value={quizTitle}
                            className="border rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                            type="text"
                            placeholder="Title"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {quiz.map((data, i) => (
                    <div className=" relative mb-4 border rounded">
                      <div className="bg-slate-100 border-b flex items-center pl-5 py-2">
                        <h3 className="">Question</h3>
                        <h3 className="ml-2 text-sm border rounded-full bg-slate-600 text-white w-5 h-5 flex justify-center items-center">
                          {i + 1}
                        </h3>
                        <div
                          onClick={() => handleDeleteQuiz(i)}
                          className="absolute top-3 right-3  rounded  hover:bg-gray-200  cursor-pointer"
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
                      </div>

                      <div className="px-5 pt-2 flex">
                        <table className="table w-full">
                          <tbody>
                            <tr>
                              <td className="flex">
                                <label className=" text-gray-600 font-semibold">
                                  Question
                                </label>
                              </td>
                              <td>
                                <textarea
                                  onChange={(e) => handleChangeQuestion(e, i)}
                                  value={data.question}
                                  className="border rounded-sm p-1 block mb-2 w-full focus:outline-orange-100"
                                  rows="3"
                                  placeholder="Add a question"
                                ></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex">
                                <label className=" text-gray-600 font-semibold">
                                  Option 1
                                </label>
                              </td>
                              <td>
                                <textarea
                                  onChange={(e) => handleChangeO1(e, i)}
                                  value={data.o1}
                                  className="border rounded-sm p-1 block mb-2 w-full focus:outline-orange-100"
                                  rows="2"
                                  placeholder="Add 1st option"
                                ></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex">
                                <label className=" text-gray-600 font-semibold">
                                  Option 2
                                </label>
                              </td>
                              <td>
                                <textarea
                                  onChange={(e) => handleChangeO2(e, i)}
                                  value={data.o2}
                                  className="border rounded-sm p-1 block mb-2 w-full focus:outline-orange-100"
                                  rows="2"
                                  placeholder="Add 2nd option"
                                ></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex">
                                <label className=" text-gray-600 font-semibold">
                                  Option 3
                                </label>
                              </td>
                              <td>
                                <textarea
                                  onChange={(e) => handleChangeO3(e, i)}
                                  value={data.o3}
                                  className="border rounded-sm p-1 block mb-2 w-full focus:outline-orange-100"
                                  rows="2"
                                  placeholder="Add 3rd option"
                                ></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex">
                                <label className=" text-gray-600 font-semibold">
                                  Option 4
                                </label>
                              </td>
                              <td>
                                <textarea
                                  onChange={(e) => handleChangeO4(e, i)}
                                  value={data.o4}
                                  className="border rounded-sm p-1 block mb-2 w-full focus:outline-orange-100"
                                  rows="2"
                                  placeholder="Add 4th option"
                                ></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex">
                                <label className=" text-gray-600 font-semibold">
                                  Correct Answer
                                </label>
                              </td>
                              <td>
                                <select
                                  onChange={(e) => handleChangeAnswer(e, i)}
                                  value={data.answer}
                                  className="border text-gray-600 rounded-sm p-1 block mb-5 w-full focus:outline-orange-100"
                                >
                                  <option value="" disabled selected>
                                    Select an Answer
                                  </option>
                                  <option value={data.o1}>Option 1</option>
                                  <option value={data.o2}>Option 2</option>
                                  <option value={data.o3}>Option 3</option>
                                  <option value={data.o4}>Option 4</option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  <h3
                    onClick={handleAddQuestion}
                    className="mb-3 border rounded w-36 h-10 flex justify-center items-center text-orange-500 cursor-pointer hover:bg-orange-100"
                  >
                    Add a Question
                  </h3>
                </div>
              )}

              <div className=" p-5 bg-gray-200 h-16 flex items-center justify-end">
                <input
                  disabled={isLoadingQuiz}
                  className="cursor-pointer border-green-400 rounded-sm w-32 h-8 text-sm bg-white text-orange-400 hover:border-orange-400 hover:border"
                  type="reset"
                  value="RESET"
                />
                <input
                  disabled={isLoadingQuiz}
                  className="cursor-pointer ml-5 rounded-sm w-32 h-8 text-sm bg-orange-400 text-white hover:bg-orange-500"
                  type="submit"
                  value="ADD"
                />
              </div>
            </form>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-4 w-full border rounded border-red-400 text-center text-red-400 bg-red-100 tracking-wider">
          {error}
        </div>
      )}
      {errorLesson && (
        <div className="mt-4 w-full border rounded border-red-400 text-center text-red-400 bg-red-100 tracking-wider">
          {errorLesson}
        </div>
      )}
      {errorContent && (
        <div className="mt-4 w-full border rounded border-red-400 text-center text-red-400 bg-red-100 tracking-wider">
          {errorContent}
          {console.log(errorContent)}
        </div>
      )}
      {errorQuiz && (
        <div className="mt-4 w-full border rounded border-red-400 text-center text-red-400 bg-red-100 tracking-wider">
          {errorQuiz}
          {console.log(errorQuiz)}
        </div>
      )}
    </div>
  );
};

export default CoursesForm;
