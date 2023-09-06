import format from "date-fns/format";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Users = ({ users, handleReload }) => {
  const { user } = useAuthContext();

  const handleChangeUserStatus = async (userId, userStatus) => {
    if (user) {
      const response = await fetch(
        `http://localhost:4000/api/users/user/userStatus/${userId}`,
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
    <div className="overflow-auto rounded-lg shadow border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Email
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Role
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
          {users.map((user, i) => (
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
                  {user.email}
                </h3>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span
                  className={`rounded-full border px-2  text-center text-sm p-1 ${
                    user.role === "TEACHER" && "text-purple-800 bg-purple-200 "
                  } ${
                    user.role === "STUDENT" && "text-blue-800 bg-blue-200 "
                  } ${
                    user.role === "ADMIN" && "text-yellow-800 bg-yellow-200 "
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className={`p-3 text-sm text-gray-700 whitespace-nowrap `}>
                <span
                  className={`rounded-full border px-2  text-center text-sm font-semibold p-1 ${
                    user.isBlocked ? "text-red-500" : ""
                  }`}
                >
                  {user.isBlocked ? "Banned" : "Active"}
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700">
                {format(new Date(user.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {format(new Date(user.updatedAt), "dd/MM/yyyy")}
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
  );
};

export default Users;
