import ProfileCard from "../components/profileCard";
import LessionDetails from "../components/LessionDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAddLesson } from "../hooks/useAddLesson";

const Course = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [course, setCourse] = useState(null);
  const [lessionTitle, setLessionTitle] = useState("");
  const [lessionDescription, setLessionDescription] = useState("");
  let i = 1;

  useEffect(() => {
    const fetchCourse = async () => {
      const respons = await fetch(`/api/courses/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();

      if (respons.ok) {
        setCourse(json);
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [user]);



  return (
    // Chapters

    <div>
      {course && (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          <div className="hidden 2xl:block"></div>

          <div className="p-8 w-full col-span-2">
            <div className="text-xl font-semibold text-gray-600">
              <h1>Course Description</h1>
            </div>
            <div className="mt-4 text-gray-600">
              <p>{course.description}</p>
            </div>
            {course.lessons &&
              course.lessons.map((lesson) => (
                <LessionDetails key={lesson.id} lesson={lesson} no={i++} />
              ))}
          </div>

          <div className="p-8 w-full lg:w-96">
            <ProfileCard user={course.teacher} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
