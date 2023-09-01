import { Link } from "react-router-dom";

const ProfileCard = ({ user }) => {
  return (
    <div>
      {user && (
        <div className="flex items-center justify-center">
          <div className="rounded-sm border shadow w-full">
            <div className="flex items-center justify-center pt-10 flex-col">
              <img
                className="rounded-full w-32 h-32"
                src={`${user.profile_pic? user.profile_pic:"/img/default_avatar.png"}`}
                alt=""
              />
              <h1 className="text-gray-800 font-semibold text-xl mt-5">
                {user.first_name} {user.last_name}
              </h1>
              <h1 className="text-gray-800 text-sm">
                {user.city} {user.city && user.country && ","} {user.country}
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
                <h1 className="text-xs  text-gray-500">{user.designation}</h1>
                <h1 className="text-xs  text-gray-500">{user.institute}</h1>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-3 mb-6">
              <h1 className="text-xs text-gray-500">Get Connected</h1>
              <div className="mt-4 flex items-center gap-5">
                {user.socials && user.socials.social1 && (
                  <Link to={user.socials.social1}>
                    <img
                      className="w-6 h-6 hover:bg-gray-300 rounded-full"
                      src="/img/assets/github.png"
                      alt="github.png"
                    />
                  </Link>
                )}
                {user.socials && user.socials.social2 && (
                  <Link to={user.socials.social2}>
                    <img
                      className="w-6 h-6 hover:bg-blue-300 rounded-full"
                      src="/img/assets/facebook.png"
                      alt="facebook.png"
                    />
                  </Link>
                )}
                {user.socials && user.socials.social3 && (
                  <Link to={user.socials.social3}>
                    <img
                      className="w-6 h-6 hover:bg-blue-400 rounded-full"
                      src="/img/assets/linkedin.png"
                      alt="linkedin.png"
                    />
                  </Link>
                )}
                {user.socials && user.socials.social4 && (
                  <Link to={user.socials.social4}>
                    <img
                      className="w-6 h-6 hover:bg-red-500 rounded-full"
                      src="/img/assets/youtube.png"
                      alt="youtube.png"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
