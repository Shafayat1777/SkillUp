import { useGetUsers } from "../hooks/useGetUsers";
import { useGetAllCourses } from "../hooks/useGetAllCourses";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Users from "../components/Users";
import CoursesAll from "../components/CoursesAll";

const AdminPanel = () => {
  const { user } = useAuthContext();
  const { getusers, users } = useGetUsers();
  const { getallcourses, courses } = useGetAllCourses();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getallcourses();
    getusers();
  }, [user, reload]);

  const handleReload = () => {
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };

  return (
    <div className="flex">
      <div className="Side_Nav w-52 h-screen border"></div>

      <div className=" border px-5 py-10">
        {users && <Users users={users} handleReload={handleReload} />}
        {courses && (
          <CoursesAll courses={courses} handleReload={handleReload} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
