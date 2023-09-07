import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="w-full">
      <Link to={`/course/${course.id}`}>
        <div className="border w-full bg-orange-50 rounded-sm shadow hover:shadow-lg transition-all ease-out duration-2000 cursor-pointer">
          <div className="px-6 mt-6">
            <h1 className="font-bold text-gray-600">{course.title}</h1>
          </div>
          <div className="px-6 h-32 mt-2 text-gray-600">
            <p className="">{course.short_description}</p>
          </div>
          <div className="px-6 mt-6 text-gray-600 flex justify-between">
            <h3 className="mb-2 flex items-center mr-2  font-semibold text-gray-600 py-0.5 px-2">
              {" "}
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
              {course.total_hours} hours
            </h3>
            <h3
              className={`mb-2 mr-2  ${
                course.level === "Beginner" && "text-green-400"
              } ${course.level === "Intermediate" && "text-yellow-400"} ${
                course.level === "Advanced" && "text-red-400"
              } font-semibold rounded-md bg-gray-700 w-fit py-0.5 px-2`}
            >
              {course.level}
            </h3>
          </div>
          <div className="p-6 mt-6 border-t flex items-center">
            <img
              className="rounded-full w-16"
              src="/img/default_avatar.png"
              alt=""
            />
            <div className="ml-4">
              <h3 className="font-semibold text-gray-600">
                {course.teacher.first_name} {course.teacher.last_name}
              </h3>
              <h4 className=" text-gray-600">
                {course.teacher.designation}, {course.teacher.institute}{" "}
              </h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
