import { Link } from "react-router-dom";
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";
import format from "date-fns/format";

const UserDetails = ({ users }) => {
  const { user } = useAuthContext();
  const { dispatch } = useUsersContext();
  let i = 1;

  const handleClick = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/ + ${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };

  return (
    <div className="mx-20 overflow-auto rounded-lg shadow border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              First Name
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Last Name
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Email
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Role
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Institute
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Designation
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Country
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              City
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Socials
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
          {users.map((user) => (
            <tr
              key={user.id}
              className={i % 2 !== 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-3 text-sm text-gray-700">
                <Link
                  to="/profile"
                  className="font-bold text-blue-500 hover:underline hover:border-blue-500 border rounded-full px-4 py-2 hover:bg-blue-200"
                >
                  {i++}
                </Link>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.first_name}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.last_name}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.email}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className={user.role === "TEACHER" ? "tch" : "std"}>
                  {user.role}
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.institute}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.designation}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.country}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.city}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {user.socials}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {format(new Date(user.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {format(new Date(user.updatedAt), "dd/MM/yyyy")}
              </td>
              <td className="p-3 text-sm text-gray-700">
                <button
                  onClick={() => handleClick(user.id)}
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

export default UserDetails;
