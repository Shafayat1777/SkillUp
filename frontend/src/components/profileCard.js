const ProfileCard = ({ user }) => {
  return (
    <div>
      {user && (
        <div className="flex items-center justify-center">
          <div className="rounded-sm border shadow w-full">
            <div className="flex items-center justify-center pt-10 flex-col">
              <img
                className="rounded-full w-32"
                src="/img/default_avatar.png"
                alt=""
              />
              <h1 className="text-gray-800 font-semibold text-xl mt-5">
                {user.first_name} {user.last_name}
              </h1>
              <h1 className="text-gray-800 text-sm">
                {user.city}, {user.country}
              </h1>
              <p className="text-gray-800 text-sm p-4 text-center">
                {user.about}
              </p>
            </div>
            <div className="flex justify-between p-4">
              <div>
                <h1 className="text-xs uppercase text-gray-500">Role</h1>
                <h1
                  className={
                    user.role === "TEACHER"
                      ? "text-xs  text-purple-500"
                      : "text-xs  text-blue-500"
                  }
                >
                  {user.role}
                </h1>
              </div>
              <div>
                <h1 className="text-xs  text-gray-500">
                  {user.designation}
                </h1>
                <h1 className="text-xs  text-gray-500">
                  {user.institute}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center mt-3 mb-6">
              <h1 className="text-xs text-gray-500">Get Connected</h1>
              <div>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
