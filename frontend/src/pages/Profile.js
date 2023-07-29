import ProfileCard from "../components/profileCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEditProfile } from "../hooks/useEditProfile";

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
      const respons = await fetch(`/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await respons.json();
      if (respons.ok) {
        setData(json);
        setFirstName(json.first_name)
        setLastName(json.last_name)
        setEmail(json.email)
        setInstitute(json.institute)
        setDesignation(json.designation)
        setAbout(json.about)
        setCity(json.city)
        setCountry(json.country)
        
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [user, isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

      await editprofile(first_name, last_name, email, institute, designation, about, city, country);
      setIsSubmitted(true);

  };

  return (
    <div>
      {data && (
        <div className=" mx-10 my-8 grid  lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="md:w-72 lg:w-96 mx-auto">
            <ProfileCard user={data} />
          </div>

          <div className=" p-5 md:border-l lg:border-r border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mt-5 grid grid-cols-2 gap-5">
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
                <select className="border border-gray-400 px-2 py-1 w-full focus:outline-orange-500 focus:shadow-lg">
                  <option value="Don't specify">Don't specify</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
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
                <button disabled={isLoading} className="w-full border border-green-500 py-3 text-center text-green-500 hover:bg-green-500 hover:text-white tracking-wider">
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

          <div className="md:ml-10 mt-5 p-4 xl:w-96 xl:col-span-1 col-span-1 w-full md:col-span-2">
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
      )}
    </div>
  );
};

export default Profile;
