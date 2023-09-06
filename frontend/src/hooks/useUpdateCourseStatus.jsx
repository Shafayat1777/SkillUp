import { useAuthContext } from "./useAuthContext";

export const useUpdateCourseState = () => {
  const { user } = useAuthContext();

  const updatecoursestate = async (courseId, status) => {
    if (user && user.token) {
      console.log(courseId, status)
      const response = await fetch(
        `http://localhost:4000/api/courses/course/updateCourseStatus/${courseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );
      const json = await response.json();
      if (response.ok) {
      }
    }
  };

  return { updatecoursestate };
};
