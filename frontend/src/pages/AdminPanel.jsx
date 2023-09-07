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
    <div className=" p-10 ">
      <div className="">
        <div className="border mb-10">
          <div className="border-y py-2 px-5 text-lg font-semibold bg-slate-100">
            Enrolled Students
          </div>
          {users && (
            <div className="max-h-xs overflow-auto">
              <Users
                users={users}
                handleReload={handleReload}
                closeShowDetails={closeShowDetails}
              />
            </div>
          )}
        </div>

        <div className="border mb-10 rounded-md">
          <div className="border-y py-2 px-5 text-lg font-semibold bg-slate-100">
            Processing Courses
          </div>
          {courses && (
            <div className="max-h-xs overflow-auto">
              <CoursesAll
                courses={courses}
                courseStatus={"PROCESSING"}
                handleShowDetails={handleShowDetails}
                handleReload={handleReload}
                closeShowDetails={closeShowDetails}
              />
            </div>
          )}
        </div>

        <div className="border mb-10 rounded-md">
          <div className="border-y py-2 px-5 text-lg font-semibold bg-slate-100">
            Active Courses
          </div>
          {courses && (
            <div className="max-h-xs overflow-auto">
              <CoursesAll
                courses={courses}
                courseStatus={"ACTIVE"}
                handleShowDetails={handleShowDetails}
                handleReload={handleReload}
                closeShowDetails={closeShowDetails}
              />
            </div>
          )}
        </div>
      </div>

      <div className=" w-full">
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
