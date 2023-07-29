import { Link } from "react-router-dom";
import { useCoursesContext } from "../hooks/useCourseContext";
import { useAuthContext } from "../hooks/useAuthContext";
import format from "date-fns/format";

const MyCourses = ({ courses }) => {
  const { user } = useAuthContext();
  const { dispatch } = useCoursesContext();
  let i = 1;

  const handleClick = async (id) => {
    const response = await fetch("/api/courses/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COURSES", payload: json });
    }
  };

  return (
    <div className="overflow-auto rounded-lg shadow border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Title
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Category
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              CreatedAt
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              UpdatedAt
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map((course) => (
            <tr className={i % 2 !== 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 text-sm text-gray-700">
                <Link
                  to="/course"
                  className="font-bold text-blue-500 hover:underline hover:border-blue-500 border rounded-full px-4 py-2 hover:bg-blue-200"
                >
                  {i++}
                </Link>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {course.title}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {course.catagory}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="pus">{course.course_status}</span>
              </td>
              <td className="p-3 text-sm text-gray-700">
                {format(new Date(course.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {format(new Date(course.updatedAt), "dd/MM/yyyy")}
              </td>
              <td className="p-3 text-sm text-gray-700">
                <button
                  onClick={() => handleClick(course.id)}
                  className="w-16 h-6 rounded-sm font-bold hover:text-red-800 bg-red-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCourses;
