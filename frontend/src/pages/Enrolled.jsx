import CourseCard from "../components/CourseCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Enrolled = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch("http://localhost:4000/api/courses/enrolled", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();

      if (respons.ok) {
        setCourses(json);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Enrolled || SkillUP</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="flex justify-center ">
        <div className="mid-container m-10 w-[70rem]">
          <div className="pt-10 text-3xl font-bold text-gray-600">
            Enrolled Courses
          </div>

          <div className="catagorys mt-10 flex flex-wrap content-between">
            <h3 className="mb-2 flex items-center mr-2 text-gray-200 font-semibold rounded-md bg-gray-700 py-0.5 px-2 hover:bg-gray-800 cursor-pointer">
              All
            </h3>
            <h3 className="mb-2 flex items-center mr-2 text-gray-700 font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
              Data Manipulation
            </h3>
            <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
              Data Visualization
            </h3>
            <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
              Data Engineering
            </h3>
            <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
              AI & Machine Learning
            </h3>
          </div>

          <div className="catagorys my-5">
            <p className="font-bold text-gray-600 text-md">
              {courses && `${courses.length} courses`}
            </p>
          </div>

          <div className="course-cards mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 */}
            {courses &&
              courses.map((course) => (
                <div
                  key={course.id}
                  className="transition-transform transform hover:translate-y-[-10px]"
                >
                  <CourseCard className="" key={course.id} course={course} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrolled;
