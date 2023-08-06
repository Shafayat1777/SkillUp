import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import CourseContent from "./courseContent";

const CourseDetails = ({ courseId, reload }) => {
  const { user } = useAuthContext();
  const [course, setCourse] = useState(null);

  var i = 1;
  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch("/api/courses/courses/" + courseId, {
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
      fetchCourses();
    }
  }, [courseId, reload, user]);

  return (
    <div>
      {course && (
        <div className="border rounded-md shadow">
          <div className="border-b py-2 px-5 bg-slate-100">
            <h1 className="font-bold text-xl text-gray-600">Course Details</h1>
          </div>
          <div className="px-5">
            <div className="mt-6">
              <p className="inline  text-orange-400 font-semibold">
                Course Title:{" "}
                <h2 className="inline font-bold text-gray-600">
                  {course.title}
                </h2>
              </p>
            </div>
            <div className="mt-3">
              <p className="text-gray-600 text-md font-semibold">
                {" "}
                <p className="inline  text-orange-400">
                  Short Description:
                </p>{" "}
                {course.short_description}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-gray-600 text-md font-semibold">
                <p className="inline text-orange-400">Main Description:</p>{" "}
                {course.description}
              </p>
            </div>

            <div className="mt-8 mb-8">
              {course.lessons &&
                course.lessons.map((lesson) => (
                  <CourseContent lesson={lesson} i={i} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;