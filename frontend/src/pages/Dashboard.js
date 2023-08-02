import { useEffect, useState } from "react";
import { useCoursesContext } from "../hooks/useCourseContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import MyCourses from "../components/myCourses";
import CoursesForm from "../components/CoursesForm";
import CourseDetails from "../components/CourseDetails";
import { tr } from "date-fns/locale";

const Dashboard = () => {
  const { courses, dispatch } = useCoursesContext();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch("/api/courses/courses/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();

      if (respons.ok) {
        dispatch({ type: "SET_COURSES", payload: json });
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user, dispatch]);

  const handleDetailsReload = () => {
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleHideForm = () => {
    setShowForm(false);
  };
  const handleShowDetails = (courseId) => {
    setShowDetails(courseId);
  };
  const closeShowDetails = () => {
    setShowDetails(null);
  };

  return (
    <div className="m-8 flex">
      {/* grid grid-cols-3 gap-5 */}
      <div className=" col-span-2 w-full">
        <h1 className="mb-5 text-gray-600 font-semibold text-lg">My course</h1>
        <div>
          <button
            onClick={handleShowForm}
            className="bg-green-200 rounded-md  text-green-600 hover:text-green-600 hover:bg-green-300 text-md p-1 flex justify-center items-center w-28 text-center"
          >
            Create{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {courses && (
            <MyCourses
              courses={courses}
              handleShowDetails={handleShowDetails}
              closeShowDetails={closeShowDetails}
            />
          )}
        </div>
        <div className="mt-4">{showDetails && <CourseDetails courseId={showDetails} reload={reload}/>}</div>
      </div>
      {showForm && (
        <div className="ml-5">
          <h1 className="mb-5 text-gray-600 font-semibold text-lg">
            <CoursesForm handleHideForm={handleHideForm} courses={courses} handleDetailsReload={handleDetailsReload} />
          </h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
