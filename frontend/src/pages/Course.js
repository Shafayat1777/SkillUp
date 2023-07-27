import ProfileCard from "../components/profileCard";
import CourseDetails from "../components/courseDetails";

const Course = () => {
  return (
    // Chapters

    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
      <div className="hidden 2xl:block"></div>

      <div className="p-8 w-full col-span-2">
        <div className="text-xl font-semibold text-gray-600">
          <h1>Course Description</h1>
        </div>
        <div className="mt-4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            delectus possimus iusto ex laudantium, autem eligendi optio. Nemo a
            sed pariatur! Architecto quod laudantium aperiam iusto pariatur
            perferendis minima quos.
          </p>
        </div>
        <CourseDetails/>
      </div>
      <div className="p-8 w-full lg:w-96">
        <ProfileCard />
      </div>
    </div>
  );
};

export default Course;
