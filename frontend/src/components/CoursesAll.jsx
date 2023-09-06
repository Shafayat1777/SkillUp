import format from "date-fns/format";
import { useUpdateCourseState } from "../hooks/useUpdateCourseStatus";

const CoursesAll = ({ courses }) => {
  const { updatecoursestate } = useUpdateCourseState();
  const handleChangeUserStatus = (course) => {
    if (course) {
      updatecoursestate(course.id, "ACTIVE");
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
          {courses.map((course, i) => (
            <>
              {course.course_status === "PROCESSING" && (
                <tr
                  key={course.id}
                  className={i % 2 !== 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 text-sm text-gray-700">
                    <div
                      to={`/course/${course.id}`}
                      className="font-bold text-blue-500 hover:underline hover:border-blue-500 border rounded-full px-4 py-2 hover:bg-blue-200"
                    >
                      {i + 1}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <h3
                      onClick={null}
                      className="font-bold text-blue-500 hover:underline rounded-full px-4 py-2 hover:bg-blue-200 cursor-pointer"
                    >
                      {course.title}
                    </h3>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {course.category}
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
                  <td className="p-3 text-sm text-gray-700 flex justify-evenly">
                    <div
                      onClick={null}
                      className="border rounded-full w-8 h-8 flex items-center justify-center hover:text-red-500 hover:border-red-500 cursor-pointer"
                    >
                      <svg
                        onClick={null}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={()=>handleChangeUserStatus(course)}
                      className="flex items-center border px-2 py-1 rounded text-normal font-semibold hover:bg-green-200 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mr-1 text-green-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3"
                        />
                      </svg>
                      Publish
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesAll;
