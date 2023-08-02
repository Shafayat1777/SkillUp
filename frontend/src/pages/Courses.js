import CourseCard from "../components/CourseCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react"

const Courses = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      const respons = await fetch("/api/courses/courses", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();

      if (respons.ok) {
        setCourses(json)
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
 <div className="px-8 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
    {courses && courses.map((course)=>(<CourseCard key={course.id} course={course} />))}

 </div>
  
  );
};

export default Courses;
