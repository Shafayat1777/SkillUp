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
  let i = 1;

  useEffect(() => {
    const fetchCourse = async () => {
      const respons = await fetch(`/api/courses/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();

      if (respons.ok) {
        setCourse(json);
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [user]);

  return (
    // Chapters

    <div>
      {course && (
        <div>
          <div className="head">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Course - {course.title}</title>
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
                  <button className="py-1 px-3 border rounded-sm font-semibold text-white hover:bg-gray-700">
                    Bookmark
                  </button>
                  <button className="ml-5 py-1 px-3 border rounded-sm font-semibold text-white hover:bg-gray-700">
                    Replay Course
                  </button>
                </div>

                <div className="flex s:w-96 h-16 flex-wrap content-between">
                  <h3 className="mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">Basic</h3>
                  <h3 className="mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">Hours</h3>
                  <h3 className="mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">Videos</h3>
                  <h3 className="mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">Quiz</h3>
                  <h3 className="mr-2 text-white font-semibold rounded-md bg-gray-700 py-0.5 px-2">participants</h3>
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
