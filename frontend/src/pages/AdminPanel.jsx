import { useGetUsers } from "../hooks/useGetUsers";
import { useGetAllCourses } from "../hooks/useGetAllCourses";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Users from "../components/Users";
import CoursesAll from "../components/CoursesAll";
import MyCourseDetails from "../components/MyCourseDetails";

const AdminPanel = () => {
  const { user } = useAuthContext();
  const { getusers, users } = useGetUsers();
  const { getallcourses, courses } = useGetAllCourses();
  const [reload, setReload] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    if (user) {
      getallcourses();
      getusers();
    }
  }, [user, reload]);

  const handleReload = () => {
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };

  const handleShowDetails = (courseId) => {
    if (showDetails) setShowDetails(null);
    else setShowDetails(courseId);
  };
  const handleHideDetails = () => {
    if (showDetails) {
      setShowDetails(null);
    }
  };
  const closeShowDetails = () => {
    setShowDetails(null);
  };

  return (
    <div className="flex">
      <div className="Side_Nav w-52 h-screen border"></div>

      <div className=" border px-5 py-10">
        {users && <Users users={users} handleReload={handleReload} />}
        {courses && (
          <CoursesAll courses={courses} handleShowDetails={handleShowDetails} handleReload={handleReload} />
        )}
      </div>

      <div className=" px-5 py-10 w-full">
        {showDetails && (
          <MyCourseDetails
            courseId={showDetails}
            reload={reload}
            handleHideDetails={handleHideDetails}
            handleReload={handleReload}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
