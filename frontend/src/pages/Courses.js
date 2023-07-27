import CourseShowAll from "../components/courseShowAll";

const Courses = () => {
  return (
 <div className="px-8 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
    <CourseShowAll />
    <CourseShowAll />
    <CourseShowAll />
    <CourseShowAll />
 </div>
  
  );
};

export default Courses;
