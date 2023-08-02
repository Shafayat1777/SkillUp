import { useAddContent } from "../hooks/useAddContent";
import { useAddCourse } from "../hooks/useAddCourse";
import { useAddLesson } from "../hooks/useAddLesson";
import { useState, useEffect } from "react";

const CoursesForm = ({ handleHideForm, courses, handleDetailsReload }) => {
  const { addcourse, isLoading, error } = useAddCourse();
  const { addlesson, isLoadingLesson, errorLesson } = useAddLesson();
  const { addcontent, isLoadingContent, errorContent } = useAddContent();

  // course add useState
  const [course_title, setTitle] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [main_description, setMainDescription] = useState("");
  const [category, setCategory] = useState("");

  // lesson add useState
  const [courseId, setCourseId] = useState("");
  const [lesson_title, setLessonTitle] = useState("");
  const [lesson_description, setLessonDescription] = useState("");

  // Content add useState
  const [content_title, setContentTitle] = useState("");
  const [file, setFile] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [lessonId, setLessonId] = useState(null);

  // to show each type of form
  const [showCourseForm, setShowCourseForm] = useState(true);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showContentForm, setShowContentForm] = useState(false);

  // to show selected form
  const selected =
    "mr-5 border-b-4 border-orange-400 py-4 hover:text-orange-400 cursor-pointer";
  const not_selected = "mr-5 py-4 hover:text-orange-400 cursor-pointer";
  const [isDragOver, setIsDragOver] = useState(false);

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

    console.log(file);
  };
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    await addcourse(
      course_title,
      short_description,
      main_description,
      category
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
    await addcontent(content_title, file.file, lessonId, handleDetailsReload);
  };

  const handleShowCourseForm = () => {
    setShowCourseForm(true);
    setShowLessonForm(false);
    setShowContentForm(false);
  };
  const handleShowLessonForm = () => {
    setShowCourseForm(false);
    setShowLessonForm(true);
    setShowContentForm(false);
  };
  const handleShowContentForm = () => {
    setShowCourseForm(false);
    setShowLessonForm(false);
    setShowContentForm(true);
  };

  return (
    <div>
      <div className="border shadow rounded-md w-[35rem] pt-5 relative">
        <div
          onClick={handleHideForm}
          className="absolute top-3 right-3 border rounded hover:border-red-500 hover:text-red-500 cursor-pointer"
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
                          rows="5"
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
                          rows="9"
                          placeholder="Main description"
                        ></textarea>
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
                          <option value="" disabled selected>
                            Select a Category
                          </option>
                          <option value="CSE">CSE</option>
                          <option value="PHY">PHY</option>
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
              {/* {courses.length === 0 ? (
                <p className="p-6 text-md text-orange-400">
                  Please add at least a single Course to access this form
                </p>
              ) : (
                <div>
                  {courses.map((course) => {
                    if (course.lessons && course.lessons.length === 0)
                      <p className="p-6 text-md text-orange-400">
                        Please add at least a single Course to access this form
                      </p>;
                  })}
                </div>
              )} */}

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
                        <td className="flex">
                          <label className="mr-20 text-gray-600 font-semibold">
                            Add File
                          </label>
                        </td>
                        <td>
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
                            <p class="text-xl text-gray-700">
                              Drop files to upload
                            </p>

                            <p class="mb-2 text-gray-700">or</p>

                            <label class="cursor-pointer hover:border-orange-300 hover:text-orange-400 bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                              Select files
                              <input
                                onChange={(e) => {
                                  setFile({
                                    file: e.target.files[0],
                                    progress: 0,
                                  });
                                }}
                                type="file"
                                class="sr-only"
                              />
                            </label>

                            <p class="text-xs text-gray-600 mt-4">
                              Maximum upload file size: 512MB.
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* <tr>
                      <td colSpan={2}>
                        {file && (
                          <ul class="mb-5 bg-white rounded divide-y divide-gray-200 shadow border">
                            <li class="p-3 flex items-center justify-between">
                              <div class="text-sm text-gray-700">
                                {file.file.name}
                              </div>

                              <div class="w-40 bg-gray-200 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
                                <div
                                  class="inline-block h-full bg-orange-400 absolute top-0 left-0"
                                  style={{ width: "40%" }}
                                ></div>
                                <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">
                                  {file.progress} %
                                </div>
                              </div>
                            </li>
                          </ul>
                        )}
                      </td>
                    </tr> */}
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
        </div>
      )}
    </div>
  );
};

export default CoursesForm;
