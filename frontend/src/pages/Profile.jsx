import ProfileCard from "../components/profileCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEditProfile } from "../hooks/useEditProfile";
import { useUpdatePic } from "../hooks/useUpdatePic";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { user } = useAuthContext();
  const { editprofile, isLoading, error } = useEditProfile();
  const { updatePic, errorPic, isLoadingPic } = useUpdatePic();
  const [data, setData] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState("");
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [socials, setSocials] = useState({
    social1: "",
    social2: "",
    social3: "",
    social4: "",
  });
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [profile_pic, setProfilePic] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [changeProfilePic, setChangeProfilePic] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const respons = await fetch(
        `http://localhost:4000/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await respons.json();
      if (respons.ok) {
        setData(json);
        setFirstName(json.first_name);
        setLastName(json.last_name);
        setEmail(json.email);
        setInstitute(json.institute);
        setDesignation(json.designation);
        setAbout(json.about);
        setCity(json.city);
        setSocials(json.socials);
        setCountry(json.country);
        setGender(json.gender);
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [user, isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    await editprofile(
      first_name,
      last_name,
      email,
      institute,
      designation,
      about,
      city,
      socials,
      country,
      gender
    );
    setIsSubmitted(true);
  };

  const handleAboutChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 250) {
      setAbout(inputValue);
    } else {
      const remainingText = inputValue.slice(0, -(inputValue.length - 250));
      setAbout(remainingText);
    }
  };

  const handleChangeProfilePic = () => {
    if (changeProfilePic) setChangeProfilePic(false);
    else setChangeProfilePic(true);
  };

  const handleRemovePicFile = () => {
    setProfilePic(null);
  };

  const handleChangePic = () => {
    updatePic(profile_pic)
  }

  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile || SkillUP</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      {data && (
        <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="mx-8 md:mx-auto md:w-72">
            <ProfileCard user={data} />

            <div className=" mt-5 border p-4 shadow ">
              <p
                onClick={handleChangeProfilePic}
                className="mb-4 py-1 px-3  text-center border rounded  hover:bg-orange-200 cursor-pointer hover:shadow transition-all duration-500 ease-out font-semibold flex items-center justify-between "
              >
                Change Profile pic
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 ${
                    changeProfilePic ? "rotate-180" : ""
                  } transition-all duration-100 ease-out`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </p>
              {changeProfilePic && (
                <div className={`border p-4 mb-5 rounded`}>
                  <div className="mb-5 px-2 py-4 flex flex-col items-center border-2 border-dashed border-orange-400 rounded-md">
                    <label className="mb-2 shadow hover:bg-orange-100 cursor-pointer py-1 px-3 rounded font-semibold flex items-center transition-all duration-500 ease-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      {"Select image "}
                      <input
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        type="file"
                        className=" sr-only"
                      />
                    </label>
                    <p className="">Maximum upload size: 1MB</p>
                    {errorPic && (<p>{errorPic}</p>)}
                    {profile_pic && (
                      <div className="flex flex-col items-center">
                        <p className="mt-5 rounded-md border p-1 flex items-center">
                          {profile_pic.name.length > 20
                            ? profile_pic.name.substring(0, 10) +
                              "..." +
                              profile_pic.name.substr(-10)
                            : profile_pic.name}
                          <svg
                            onClick={handleRemovePicFile}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 ml-2 hover:border rounded-md cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </p>
                        <p disabled={isLoadingPic} onClick={handleChangePic} className="mt-5 w-24 p-1 text-center hover:bg-orange-100 shadow rounded-md inline  cursor-pointer transition-all duration-300 ease-out">Update Pic</p>
                      </div>
                    )}
                  </div>
                  <p className="hover:bg-orange-100 cursor-pointer py-1 px-3 rounded font-semibold flex items-center transition-all duration-500 ease-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Remove photo
                  </p>
                </div>
              )}
              <p className="mb-4 py-1 px-3  text-center border rounded  hover:bg-orange-200 cursor-pointer hover:shadow transition-all duration-500 ease-out font-semibold">
                Change Password
              </p>
            </div>
          </div>

          <div className="mx-8 md:mx-auto ">
            <div className="border rounded-lg p-4 shadow border-gray-200 w-full">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={first_name ? first_name : ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                  <input
                    type="text"
                    value={last_name ? last_name : ""}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    value={email ? email : ""}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={institute ? institute : ""}
                    onChange={(e) => setInstitute(e.target.value)}
                    placeholder="Institute"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                  <input
                    type="text"
                    value={designation ? designation : ""}
                    placeholder="Designation"
                    onChange={(e) => setDesignation(e.target.value)}
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={country ? country : ""}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                  <input
                    type="text"
                    value={city ? city : ""}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5">
                  <select
                    value={gender ? gender : ""}
                    onChange={(e) => setGender(e.target.value)}
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  >
                    <option value="Don't specify">Don't specify</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHERS">Others</option>
                    <option value="DONT_DISCLOSE">Don't Disclose</option>
                  </select>
                </div>
                <div className="mt-5 relative">
                  <textarea
                    value={about ? about : ""}
                    onChange={(e) => handleAboutChange(e)}
                    className=" border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                    cols="30"
                    rows="5"
                    placeholder="Bio"
                  ></textarea>
                  <p className="text-gray-500 absolute bottom-2 right-2">
                    {about ? about.length + "/" + 250 : 0 + "/" + 250}
                  </p>
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

          <div className="mx-8 xl:mx-auto flex justify-center items-start mt-5 lg:mt-0 md:col-span-2 xl:col-span-1">
            <div className="border rounded-lg p-4 shadow w-full xl:w-96">
              <h1 className="font-semibold">Social Accounts</h1>
              <div className="mt-5 flex items-center">
                <img
                  className="w-7 h-7 mr-2"
                  src="/img/assets/github.png"
                  alt="github.png"
                />
                <input
                  value={socials.social1}
                  onChange={(e) =>
                    setSocials((prevSocials) => ({
                      ...prevSocials,
                      social1: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Link Github profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5 flex items-center">
                <img
                  className="w-7 h-7 mr-2"
                  src="/img/assets/facebook.png"
                  alt="facebook.png"
                />
                <input
                  value={socials.social2}
                  onChange={(e) =>
                    setSocials((prevSocials) => ({
                      ...prevSocials,
                      social2: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Link Facebook profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5 flex items-center">
                <img
                  className="w-7 h-7 mr-2"
                  src="/img/assets/linkedin.png"
                  alt="linkedin.png"
                />
                <input
                  value={socials.social3}
                  onChange={(e) =>
                    setSocials((prevSocials) => ({
                      ...prevSocials,
                      social3: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Link LinkedIn profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5 flex items-center">
                <img
                  className="w-7 h-7 mr-2"
                  src="/img/assets/youtube.png"
                  alt="youtube.png"
                />
                <input
                  value={socials.social4}
                  onChange={(e) =>
                    setSocials((prevSocials) => ({
                      ...prevSocials,
                      social4: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Link Youtube profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
