import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetAllCourses = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState(null);

  const getallcourses = async () => {
    const respons = await fetch("http://localhost:4000/api/courses/courses", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await respons.json();

    if (respons.ok) {
      setCourses(json);
      if (courses) console.log(courses);
    }
    if (!respons.ok) {
    }
  };

  return { getallcourses, courses };
};
