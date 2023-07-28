import { useState } from "react";
import { useAddCourse } from "../hooks/useAddCourse";
import { useAuthContext } from "../hooks/useAuthContext";

const CourseForm = () => {
  const [title, setTitle] = useState();
  const [short_description, setShortDescripotion] = useState();
  const [description, setDescripotion] = useState();
  const {user} = useAuthContext()

  const { addcourse, error, isLoading } = useAddCourse();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addcourse(title, short_description, description, user.id, user.token);
  };

  return (
    <div>
      <div className="lg:border-r border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Title"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5">
            <textarea
              onChange={(e) => setShortDescripotion(e.target.value)}
              value={short_description}
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
              rows="2"
              placeholder="Short Description"
            ></textarea>
          </div>
          <div className="mt-5">
            <textarea
              onChange={(e) => setDescripotion(e.target.value)}
              value={description}
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
              rows="5"
              placeholder="Main Description"
            ></textarea>
          </div>

          <div className="mt-5">
            <button
              disabled={isLoading}
              className="w-full border border-green-500 py-3 text-center text-green-500 hover:bg-green-500 hover:text-white tracking-wider"
            >
              Save
            </button>
          </div>
          <div className="mt-5">
            {error && (
              <div className="w-full border border-red-500 text-center text-red-500 bg-red-200 tracking-wider">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
