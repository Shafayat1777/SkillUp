import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCourseContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import CourseForm from "../components/courseForm";
import MyCourses from "../components/myCourses";

const Dashboard = () => {
  const { courses, dispatch } = useCoursesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch("/api/courses/", {
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

  return (
    <div className="m-5 grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <h1 className="mb-5 text-gray-600 font-semibold text-lg">My course</h1>
        {courses && <MyCourses courses={courses} />}
      </div>
      <div>
        <h1 className="mb-5 text-gray-600 font-semibold text-lg">
          Add a course
        </h1>
        <CourseForm />
      </div>
    </div>
  );
};

export default Dashboard;
