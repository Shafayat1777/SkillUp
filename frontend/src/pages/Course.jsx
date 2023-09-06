import format from "date-fns/format";
import ProfileCard from "../components/profileCard";
import LessionDetails from "../components/LessionDetails";
import ChatRoom from "../components/ChatRoom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Helmet } from "react-helmet";
import { useEnrollCourse } from "../hooks/useEnroll";
import { useSetProgress } from "../hooks/useSetProgress";
import { useUpdateProgress } from "../hooks/useUpdateProgress";

const Course = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { enrollcourse, responseEnroll, errorEnroll } = useEnrollCourse();
  const { setProgress } = useSetProgress();
  const { updateContentProgress, updateQuizProgress } = useUpdateProgress();
  const [course, setCourse] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [pdfcount, setPdfCount] = useState(0);
  const [videocount, setVideoCount] = useState(0);
  const [quizcount, setQuizCount] = useState(0);
  const [studentcount, setStudentCount] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [reload, setReload] = useState(false);
  const [totalClicked, setTotalClicked] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [chat, setChat] = useState(false);
  const [comments, setComments] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProgress = async (courseId) => {
      const respons = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/users/user/userProgress/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await respons.json();

      if (respons.ok) {
        setUserProgress(json);
      }
    };

    const fetchCourse = async () => {
      const respons = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/courses/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await respons.json();

      if (respons.ok) {
        setCourse(json);

        fetchProgress(json.id);
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [user, id, reload]);

  useEffect(() => {
    // update the course page header data
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

      const totalStudentCount = course.students.length;

      if (course.students) {
        course.students.forEach((student) => {
          if (student.id === user.id) {
            setIsEnrolled(true);
          }
        });
      }

      setPdfCount(totalCount.pdfCnt);
      setVideoCount(totalCount.VideoCnt);
      setQuizCount(totalQuizCount);
      setStudentCount(totalStudentCount);
    }
  }, [user, course]);

  useEffect(() => {
    // update the lesson Progress page header data
    if (userProgress && userProgress.lessons) {
      const checkedContentCount = userProgress.lessons.reduce(
        (count, lesson) => {
          if (lesson.contents) {
            lesson.contents.forEach((content) => {
              count.content++;
              if (content.clicked === true) {
                count.clicked++;
              }
            });
          }
          return count;
        },
        { clicked: 0, content: 0 }
      );

      const checkedQuizCount = userProgress.lessons.reduce(
        (count, lesson) => {
          if (lesson.quiz) {
            lesson.quiz.forEach((quiz) => {
              count.quiz++;
              if (quiz.clicked === true) {
                count.clicked++;
              }
            });
          }
          return count;
        },
        { clicked: 0, quiz: 0 }
      );
      setTotalClicked(checkedContentCount.clicked + checkedQuizCount.clicked);
      setTotalCount(checkedContentCount.content + checkedQuizCount.quiz);
    }
  }, [userProgress, reload]);

  const handleEnroll = (courseId) => {
    if (course) {
      var progress = { courseId: course.id, totalClicked: 0, totalCount: 0 };

      var less = [];
      course.lessons.forEach((lesson) => {
        var les = { lessonId: lesson.id };

        var cnts = [];
        lesson.contents.forEach((content) => {
          var cnt = { contentId: content.id, clicked: false };
          cnts.push(cnt);
        });

        var quzs = [];
        lesson.quiz.forEach((quiz) => {
          var quz = { quizId: quiz.id, quizScore: "", clicked: false };
          quzs.push(quz);
        });

        les.contents = cnts;
        les.quiz = quzs;
        less.push(les);
      });

      progress.lessons = less;

      enrollcourse(courseId, progress);
      handleCourseReload();
      if (!errorEnroll) setIsEnrolled(true);
    }
  };
  const handleProgress = () => {
    setProgress();
  };
  const handleUpdateContentProgress = (lessonId, contentId) => {
    updateContentProgress(userProgress.courseId, lessonId, contentId);
  };
  const handleUpdateQuizProgress = (
    lessonId,
    quizId,
    quizScore,
    totalScore
  ) => {
    updateQuizProgress(
      userProgress.courseId,
      lessonId,
      quizId,
      quizScore,
      totalScore
    );
  };
  const handleCourseReload = () => {
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };

  const handleAddComment = async (
    courseId,
    userId,
    first_name,
    last_name,
    profile_pic
  ) => {
    if (user && course) {
      if (comment) {
        const response = await fetch(
          "http://localhost:4000/api/courses/comment/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              comment,
              courseId,
              first_name,
              last_name,
              profile_pic,
              userId,
            }),
          }
        );

        const json = await response.json();

        if (!response.ok) {
        }
        if (response.ok) {
          handleCourseReload();
        }
      }
    }
  };

  return (
    <div>
      {course && (
        <div className=" relative">
          <div className="head">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Course - {course.title} || SkillUp</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
          </div>

          <div className="flex justify-center">
            <div className="container m-10 w-[70rem]">
              {errorEnroll ? (
                <div className=" my-5 border border-red-500  bg-red-50 rounded text-center text-red-500">
                  {errorEnroll}
                </div>
              ) : (
                responseEnroll && (
                  <div className=" my-5 border border-green-500  bg-green-50 rounded text-center text-green-500">
                    {responseEnroll}
                  </div>
                )
              )}
              <div className="top-banner p-10 border rounded-sm w-full  bg-gray-800">
                <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className=" font-semibold text-white text-3xl">
                    {course.title}
                  </div>
                  {userProgress && userProgress.courseId === course.id && (
                    <div className="flex flex-col ">
                      <div className="progress-bar flex items-center ">
                        <div className="mr-2 w-40 h-2 bg-gray-200 shadow-inner rounded-full overflow-hidden">
                          <div
                            className="w-40 h-4 bg-green-400"
                            style={{
                              width: `${(totalClicked / totalCount) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-green-400">
                          {Math.round((totalClicked / totalCount) * 100)}%
                        </div>
                      </div>
                      <div>
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
                              d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                            />
                          </svg>
                          Get Certificate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-5">
                  <button
                    onClick={handleProgress}
                    className=" py-1 px-3 border rounded-sm font-semibold text-white hover:bg-gray-700"
                  >
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
                  {user && user.role !== "TEACHER" && (
                    <button
                      disabled={isEnrolled}
                      onClick={() => handleEnroll(course.id)}
                      className={`ml-5 py-1 px-3 border rounded-sm font-semibold text-white ${
                        isEnrolled
                          ? "border-yellow-400"
                          : "hover:bg-gray-700 hover:border-yellow-400"
                      }`}
                    >
                      {isEnrolled ? (
                        <div className="flex items-center">
                          Enrolled
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={`w-5 h-5 ml-2 ${
                              isEnrolled ? "text-yellow-400" : ""
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Enroll
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 ml-2 text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  )}
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
                    {studentcount} participants
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
                    course.lessons.map((lesson, i) => (
                      <LessionDetails
                        lessonProgress={
                          userProgress
                            ? userProgress.lessons
                              ? userProgress.lessons[i]
                              : null
                            : null
                        }
                        key={lesson.id}
                        lesson={lesson}
                        no={i + 1}
                        handleUpdateContentProgress={
                          handleUpdateContentProgress
                        }
                        handleUpdateQuizProgress={handleUpdateQuizProgress}
                        handleCourseReload={handleCourseReload}
                        reload={reload}
                      />
                    ))}

                  <div className="mt-10 border">
                    <div className="text-lg font-bold text-gray-600 px-5 py-2 border-b">
                      Comments ({course.Comment && course.Comment.length})
                    </div>
                    <div className="px-5">
                      {course.Comment &&
                        course.Comment.map((cmt, i) => (
                          <div
                            key={cmt.id}
                            className={`${
                              i === course.Comment.length - 1 ? "" : "border-b"
                            } flex py-3`}
                          >
                            <>
                              <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-600 mr-2">
                                <img
                                  className="w-10 h-10"
                                  src={`${
                                    cmt.profile_pic
                                      ? cmt.profile_pic
                                      : "/img/default_avatar.png"
                                  }`}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className=" text-gray-600 font-bold">
                                  {cmt.first_name + " " + cmt.last_name}
                                  <span className="ml-2 text-sm text-gray-400 font-normal">
                                    {format(
                                      new Date(cmt.createdAt),
                                      "dd/MM/yyyy"
                                    )}
                                  </span>
                                </div>
                                <div className="text-gray-600 text-sm font-semibold">
                                  {cmt.comment}
                                </div>
                              </div>
                            </>
                          </div>
                        ))}
                    </div>
                    <div className="border-t p-5 flex items-center">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder="Write a comment..."
                        className="border rounded p-2 w-full resize-y" // Use the 'resize-y' class to allow vertical resizing
                        rows={Math.min(
                          Math.max(Math.ceil(comment.length / 28), 1),
                          8
                        )} // Limit to a maximum of 5 rows
                        style={{ minHeight: "40px" }} // Optional: Set a minimum height
                      />
                      <div
                        onClick={() =>
                          handleAddComment(
                            course.id,
                            user.id,
                            user.first_name,
                            user.last_name,
                            user.profile_pic
                          )
                        }
                        className=" ml-5 border rounded-full p-2 flex items-center justify-center hover:bg-orange-400 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="currentColor"
                          className="w-6 h-6 text-orange-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full relative">
                  <ProfileCard user={course.teacher} />
                  {user && isEnrolled && (
                    <div
                      onClick={() => (chat ? setChat(false) : setChat(true))}
                      className="border mt-5 p-2 shadow cursor-pointer font-semibold text-orange-400 hover:bg-orange-100 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                      </svg>
                      Chat Room
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {chat && (
            <div
              className={` fixed bottom-0 transition-all duration-2000 ease-out right-2`}
            >
              <ChatRoom />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Course;
