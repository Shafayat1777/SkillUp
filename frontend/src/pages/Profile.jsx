import ProfileCard from "../components/profileCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEditProfile } from "../hooks/useEditProfile";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { user } = useAuthContext();
  const { editprofile, isLoading, error } = useEditProfile();
  const [data, setData] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState("");
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const respons = await fetch(`http://localhost:4000/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
      country,
      gender
    );
    setIsSubmitted(true);
  };
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
          </div>

          <div className="mx-8 md:mx-auto flex items-center justify-center">
            <div className="border rounded-lg p-4 shadow border-gray-200 w-full">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                  <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    placeholder="Institute"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                  <input
                    type="text"
                    value={designation}
                    placeholder="Designation"
                    onChange={(e) => setDesignation(e.target.value)}
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                  />
                </div>
                <div className="mt-5">
                  <select
                    value={gender}
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
                <div className="mt-5">
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg"
                    cols="30"
                    rows="10"
                    placeholder="Bio"
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

          <div className="mx-8 xl:mx-auto flex justify-center items-start mt-5 lg:mt-0 md:col-span-2 xl:col-span-1">
            <div className="border rounded-lg p-4 shadow w-full xl:w-96">
              <h1 className="font-semibold">Social Accounts</h1>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Link social profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Link social profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Link social profile"
                  className="border border-gray-400 px-2 py-1 w-full xl:w-80 focus:outline-orange-500 focus:shadow-lg"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Link social profile"
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
