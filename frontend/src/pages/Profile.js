import ProfileCard from "../components/profileCard";

const Profile = () => {
  return (
    <div className=" mx-10 my-8 grid md:grid-cols-2 lg:grid-cols-3">
      <div className="mx-auto">
        <ProfileCard />
      </div>

      <div className=" p-5 h-full md:border-l lg:border-r border-gray-200">
        <form onSubmit={() => {}}>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Email"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Institite"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
            <input
              type="text"
              placeholder="Designation"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Country"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
            <input
              type="text"
              placeholder="City"
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5">
            <select className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg">
              <option value="Don't specify">Don't specify</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mt-5">
            <textarea
              className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
              cols="30"
              rows="10"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="mt-5">
            <button className="w-full border border-green-500 py-3 text-center text-green-500 hover:bg-green-500 hover:text-white tracking-wider">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="md:flex md:ml-10 mt-5 p-4 h-full md:justify-center lg:block">
        <div>
          <h1 className="font-semibold">Social Accounts</h1>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Link social profile"
              className="border border-gray-400 px-2 py-1 w-80 focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Link social profile"
              className="border border-gray-400 px-2 py-1 w-80 focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Link social profile"
              className="border border-gray-400 px-2 py-1 w-80 focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Link social profile"
              className="border border-gray-400 px-2 py-1 w-80 focus:outline-orange-500 focus:shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
