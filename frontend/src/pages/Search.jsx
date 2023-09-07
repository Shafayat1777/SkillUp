import CourseCard from "../components/CourseCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Search = () => {
  const { user } = useAuthContext();
  const { search } = useParams();
  const [courses, setCourses] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch(
        `http://localhost:4000/api/courses/coursesBysearch/${search}`,
        {}
      );
      const json = await respons.json();

      if (respons.ok) {
        setCourses(json);
      }
    };

    fetchCourses();
  }, [user, reload]);

  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Courses - Search || SkillUP</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="flex justify-center ">
        <div className="mid-container m-10 w-[70rem]">
          <div className="top-banner pt-10 border rounded-sm w-full h-[25rem] bg-orange-400">
            <h1 className=" px-10 mb-6 font-bold text-gray-800 text-2xl">
              Courses
            </h1>
            <div className=" px-10 mb-3 bg-gray-800 flex items-center h-[3rem] w-[20rem]">
              <h3 className="  font-bold text-white text-xl ">
                Hands on Learning
              </h3>
            </div>
            <p className="px-10 text-lg font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              repudiandae architecto sapiente saepe nisi. Aperiam, eum fuga
              mollitia vel cumque explicabo ad quaerat alias deleniti, laborum,
              dolor tenetur nobis vero.
            </p>
          </div>

          <div className="catagorys mt-10 flex flex-wrap content-between">
            <Link to={`/courses`}>
              <h3 className="mb-2 flex items-center mr-2 text-gray-200 font-semibold rounded-md bg-gray-700 py-0.5 px-2 hover:bg-gray-800 cursor-pointer">
                All
              </h3>
            </Link>
            <Link to={`/category/Data Manipulation`}>
              <h3
                onClick={() => {
                  reload ? setReload(false) : setReload(true);
                }}
                className="mb-2 flex items-center mr-2 text-gray-700 font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer"
              >
                Data Manipulation
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Data Visualization`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Data Visualization
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Data Engineering`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Data Engineering
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/AI & Machine Learning`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                AI & Machine Learning
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Probability & Satistics`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Probability & Satistics
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Importing & Cleaning Data`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Importing & Cleaning Data
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/AI & Machine Learning`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Applied Finance
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Basic Python Programming`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Basic Python Programming
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Web Development With PHP`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Web Development With PHP
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Android App Development With Flutter`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Android App Development With Flutter
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Software Testing`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Software Testing
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Programming`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Programming
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Management`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Management
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Case Study`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Case Study
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/UI UX Desing`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                UI UX Desing
              </h3>
            </Link>
            <Link
              onClick={() => {
                reload ? setReload(false) : setReload(true);
              }}
              to={`/category/Others`}
            >
              <h3 className="mb-2 flex items-center mr-2 text-gray-700  font-semibold rounded-md bg-gray-200 py-0.5 px-2 hover:bg-gray-300 cursor-pointer">
                Others
              </h3>
            </Link>
          </div>

          <div className="catagorys my-5">
            <p className="font-bold text-gray-600 text-md">
              {courses &&
                `${
                  courses.filter((course) => course.course_status === "ACTIVE")
                    .length
                } courses`}
            </p>
          </div>

          <div className="course-cards mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 */}
            {courses &&
              courses
                .filter((course) => course.course_status === "ACTIVE")
                .map((course) => (
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

export default Search;
