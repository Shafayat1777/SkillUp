import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="w-full">
      <Link to={`/course/${course.id}`}>
        <div className="border w-full bg-orange-50 rounded-sm shadow hover:shadow-lg transition-all ease-out duration-1100 cursor-pointer">
          <div className="px-6 mt-6">
            <h1 className="font-bold text-gray-600">{course.title}</h1>
          </div>
          <div className="px-6 h-32 mt-2 text-gray-600">
            <p className="">{course.short_description}</p>
          </div>
          <div className="px-6 mt-6 text-gray-600">
            <h3 className="">{course.hours} hours</h3>
          </div>
          <div className="p-6 mt-6 border-t flex items-center">
            <img
              className="rounded-full w-16"
              src="./img/default_avatar.png"
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
