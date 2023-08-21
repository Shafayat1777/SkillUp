import ProfileCard from "../components/profileCard";
import LessionDetails from "../components/LessionDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Helmet } from "react-helmet";

const Course = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [course, setCourse] = useState(null);
  const [pdfcount, setPdfCount] = useState(0);
  const [videocount, setVideoCount] = useState(0);
  const [quizcount, setQuizCount] = useState(0);
  let i = 1;

  useEffect(() => {
    const fetchCourse = async () => {
      const respons = await fetch(
        `http://localhost:4000/api/courses/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await respons.json();

      if (respons.ok) {
        setCourse(json);
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [user]);

  useEffect(() => {
    if (course && course.lessons) {
      const totalCount = course.lessons.reduce(
        (acc, lesson) => {
          if (lesson.contents) {
            lesson.contents.forEach((content) => {
              content.file.endsWith(".pdf") ? acc.pdfCnt++ : acc.VideoCnt++;
            });
          }
          return acc;
        },
        { pdfCnt: 0, VideoCnt: 0 }
      );

      const totalQuizCount = course.lessons.reduce((acc, lesson) => {
        if (lesson.quiz) {
          lesson.quiz.forEach((quiz) => {
            acc += 1;
          });
        }
        return acc;
      }, 0);

      setPdfCount(totalCount.pdfCnt);
      setVideoCount(totalCount.VideoCnt);
      setQuizCount(totalQuizCount);
    }
  }, [course]);

  return (
    // Chapters

    <div>
      {course && (
        <div>
          <div className="head">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Course - {course.title} || SkillUp</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
          </div>

          <div className="flex justify-center">
            <div className="container m-10 w-[70rem]">
              <div className="top-banner p-10 border rounded-sm w-full h-[18rem] bg-gray-800">
                <h1 className=" mb-10 font-semibold text-white text-3xl">
                  {course.title}
                </h1>

                <div className="mb-5">
                  <button className=" py-1 px-3 border rounded-sm font-semibold text-white hover:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 inline mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    Bookmark
                  </button>
                  <button className="ml-5 py-1 px-3 border rounded-sm font-semibold text-white hover:bg-gray-700">
                    Replay Course
                  </button>
                </div>

                <div className="flex flex-wrap content-between text-white">
                  <h3
                    className={`mb-2 mr-2  ${
                      course.level === "Beginner" && "text-green-400"
                    } ${course.level === "Intermediate" && "text-yellow-400"} ${
                      course.level === "Advanced" && "text-red-400"
                    } font-semibold rounded-md bg-gray-700 py-0.5 px-2`}
                  >
                    {course.level}
                  </h3>
                  <h3 className="mb-2 flex items-center mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {course.total_hours} Hours
                  </h3>
                  <h3 className="mb-2 flex items-center mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    {pdfcount} PDFs
                  </h3>
                  <h3 className="mb-2 flex items-center mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                    {videocount} Videos
                  </h3>
                  <h3 className="mb-2 flex items-center mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                    {quizcount} Quizs
                  </h3>
                  <h3 className="mb-2 flex items-center mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    participants
                  </h3>
                </div>
              </div>

              <div className=" mt-10 grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className=" w-full md:col-span-3">
                  <div className="text-xl font-semibold text-gray-600">
                    <h1>Course Description</h1>
                  </div>
                  <div className="mt-4 text-gray-600">
                    <p>{course.description}</p>
                  </div>
                  {course.lessons &&
                    course.lessons.map((lesson) => (
                      <LessionDetails
                        key={lesson.id}
                        lesson={lesson}
                        no={i++}
                      />
                    ))}
                </div>

                <div className="w-full ">
                  <ProfileCard user={course.teacher} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
