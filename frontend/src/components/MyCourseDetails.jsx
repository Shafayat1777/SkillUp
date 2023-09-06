import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import MyCourseContent from "./MyCourseContent";
import Users from "./Users";
// require(process.env)

const MyCourseDetails = ({
  courseId,
  reload,
  handleHideDetails,
  handleReload,
}) => {
  const { user } = useAuthContext();
  const [course, setCourse] = useState(null);

  var i = 1;
  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/courses/courses/ + ${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await respons.json();

      if (respons.ok) {
        setCourse(json);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [courseId, reload, user]);

  const handleChangeUserStatus = async (userId, userStatus) => {
    if (user) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/users/user/userStatus/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userStatus,
          }),
        }
      );

      const json = await response.json();
      if (response.ok) {
        handleReload();
      }
    }
  };

  return (
    <div>
      {course && (
        <div className="border rounded-md shadow relative">
          <div className="border-b py-2 px-5 bg-slate-100">
            <h1 className="font-bold text-xl text-gray-600">Course Details</h1>
            <div
              onClick={handleHideDetails}
              className="absolute top-2 right-3  rounded hover:bg-gray-200  cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="px-5">
            <div className="mt-6">
              <div className="inline  text-orange-400 font-semibold">
                Course Title:{" "}
                <h2 className="inline font-bold text-gray-600">
                  {course.title}
                </h2>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-gray-600 text-md font-semibold">
                {" "}
                <p className="inline  text-orange-400">
                  Short Description:
                </p>{" "}
                {course.short_description}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-gray-600 text-md font-semibold">
                <p className="inline text-orange-400">Main Description:</p>{" "}
                {course.description}
              </div>
            </div>

            <div className="mt-8 mb-8">
              {course.lessons &&
                course.lessons.map((lesson) => (
                  <MyCourseContent lesson={lesson} i={i} />
                ))}
            </div>
          </div>

          <div className="">
            <div className="border-y py-2 px-5 text-lg font-semibold bg-slate-100">
              Enrolled Students ({course.students.length})
            </div>
            <table className="w-full">
              <thead className=" border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    No.
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Email
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Role
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Progress
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Status
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {course.students.map((user, i) => (
                  <tr
                    key={user.id}
                    className={i % 2 !== 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-sm text-gray-700">
                      <div className="font-bold text-blue-500  border rounded-full w-10 h-10 flex justify-center items-center">
                        {i + 1}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <h3
                        onClick={null}
                        className="font-bold text-blue-500 hover:underline rounded-full px-4 py-2 hover:bg-blue-200 cursor-pointer"
                      >
                        {user.first_name + " " + user.first_name}
                      </h3>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <h3
                        onClick={null}
                        className="px-2 text-sm font-semibold p-1  "
                      >
                        {user.email}
                      </h3>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span
                        className={`rounded-full border px-2  text-center text-sm p-1 ${
                          user.role === "TEACHER" &&
                          "text-purple-800 bg-purple-200 "
                        } ${
                          user.role === "STUDENT" &&
                          "text-blue-800 bg-blue-200 "
                        } ${
                          user.role === "ADMIN" &&
                          "text-yellow-800 bg-yellow-200 "
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      
                      <div className="progress-bar flex items-center ">
                        <div className="mr-2 w-40 h-2 bg-gray-200 shadow-inner rounded-full overflow-hidden">
                          <div
                            className="w-40 h-4 bg-green-400"
                            style={{
                              width: `${
                                (user.progress.find(
                                  (c) => c.courseId === course.id
                                ).totalClicked /
                                  user.progress.find(
                                    (c) => c.courseId === course.id
                                  ).totalCount) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-green-400">
                          {Math.round(
                            (user.progress.find((c) => c.courseId === course.id)
                              .totalClicked /
                              user.progress.find(
                                (c) => c.courseId === course.id
                              ).totalCount) *
                              100
                          )}
                          %
                        </div>
                      </div>
                    </td>
                    <td
                      className={`p-3 text-sm text-gray-700 whitespace-nowrap `}
                    >
                      <span
                        className={`rounded-full border px-2  text-center text-sm font-semibold p-1 ${
                          user.isBlocked ? "text-red-500" : ""
                        }`}
                      >
                        {user.isBlocked ? "Banned" : "Active"}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {user.isBlocked ? (
                        <div
                          onClick={() => handleChangeUserStatus(user.id, false)}
                          className="flex w-32 items-center justify-center border px-2 py-1 rounded text-normal font-semibold hover:bg-green-200 cursor-pointer"
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
                              d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                            />
                          </svg>
                          Unban User
                        </div>
                      ) : (
                        <div
                          onClick={() => handleChangeUserStatus(user.id, true)}
                          className="flex w-24 items-center justify-center border px-2 py-1 rounded text-normal font-semibold hover:bg-red-200 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mr-1 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                          Ban User
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourseDetails;
