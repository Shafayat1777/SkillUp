import { Link } from "react-router-dom";

const CourseShowAll = () => {
  return (
    <Link to='/course'>
      <div className="mt-10">
        <div className="border w-full bg-orange-50 rounded-sm shadow hover:shadow-lg transition-all ease-out duration-1100 cursor-pointer">
          <div className="px-6 mt-6">
            <h1 className="font-bold text-gray-600">Title</h1>
          </div>
          <div className="px-6 mt-2 text-gray-600">
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              nisi, illo porro voluptatum doloremque qui ullam repellendus
              expedita quis omnis modi tenetur eveniet dolorem similique quidem
              quibusdam magni non numquam.
            </p>
          </div>
          <div className="px-6 mt-6 text-gray-600">
            <h3 className="">4 hours</h3>
          </div>
          <div className="p-6 mt-6 border-t flex items-center">
            <img
              className="rounded-full w-20"
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <div className="ml-4">
              <h3 className="font-semibold text-gray-600">
                Md. Shafayat Hossain
              </h3>
              <h4 className=" text-gray-600">Instructor, EWU </h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseShowAll;
