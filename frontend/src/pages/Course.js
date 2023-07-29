import ProfileCard from "../components/profileCard";
import LessionDetails from "../components/LessionDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Course = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [course, setCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [lessionTitle, setLessionTitle] = useState("");
  const [lessionDescription, setLessionDescription] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const respons = await fetch(`/api/courses/${id}`, {
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

  const handleClick = () => {
    if (showForm) {
      setShowForm(false);
      setLessionTitle("");
      setLessionDescription("");
    } else {
      setShowForm(true);
    }
  };
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
            <LessionDetails />

            {/* Teacher sechtion */}
            <div>
              {showForm ? (
                <div>
                  <div className="mt-10 border rounded-sm bg-orange-50">
                    <form>
                      <div className="p-5 flex items-center">
                        <div className="rounded-full w-6 bg-black text-white text-center">
                          1
                        </div>
                        <div className="ml-3 text-gray-600 font-bold text-xl">
                          <h1 className="flex">
                            <input
                              className="bg-transparent placeholder-gray-500"
                              type="text"
                              placeholder="Add lesson title..."
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </h1>
                        </div>
                      </div>
                      <div className="px-5 pb-5 text-gray-600 flex">
                        <textarea
                          className="bg-transparent placeholder-gray-500 w-full"
                          rows="3"
                          placeholder="Add lession description..."
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div>
                    <button
                      onClick={handleClick}
                      className="mt-6 border w-full text-lg h-12 text-red-600 border-red-600 rounded-r-sm hover:bg-red-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleClick}
                    className="mt-6 border w-full text-lg h-12 text-green-600 border-green-600 rounded-r-sm hover:bg-green-200"
                  >
                    Add a lession
                  </button>
                </div>
              )}
            </div>
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
