import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCoursesContext } from "../hooks/useCourseContext";

const CourseDetails = ({ courseId, reload }) => {
  const { dispatch } = useCoursesContext();
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
  }, [courseId, reload]);

  
  return (
    <div>
      {course && (
        <div className="border rounded-md shadow">
          <div className="border-b py-2 px-5 bg-slate-100">
            <h1 className="font-bold text-xl text-gray-600">Course Details</h1>
          </div>
          <div className="px-5">
            <div className="mt-6">
              <h2 className="font-bold text-gray-600">{course.title}</h2>
            </div>
            <div className="mt-3">
              <p className="text-gray-600">{course.short_description}</p>
            </div>
            <div className="mt-3">
              <p className="text-gray-600">{course.description}</p>
            </div>

            <div className="mt-8 mb-8">
              {course.lessons &&
                course.lessons.map((lesson) => (
                  <div className="border rounded-md shadow p-5 mt-4">
                    <div className="flex justify-between">
                      <div className="flex">
                        <h3 className="font-semibold rounded-full w-6 h-6 flex items-center justify-center bg-black text-white">
                          {i++}
                        </h3>
                        <h2 className="text-gray-600 ml-4 font-bold">
                          {lesson.title}
                        </h2>
                      </div>
                      <div>
                        <h3 className="text-gray-600 ml-4 font-semibold cursor-pointer hover:text-orange-400">
                          Show Content
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
