import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const About = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const { user } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("id", user.id);
    userData.append("image", avatar);
// "/api/users/upload"
    const response = await fetch("/api/courses/upload", {
      method: "POST",
      body: userData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setUpdated(null);
    }
    if (response.ok) {
      setError(null);
      setUpdated("Profile updated");
    }
  };

  

  return (
    <div>
      <form onSubmit={handleClick}>

        <label>Profile picture:</label>
        <input
          className="border m-3"
          type="file"
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
        />
        <button className="border m-3">Submit</button>
        {error && <div className="error">{error}</div>}
        {updated && <div className="error">{updated}</div>}
      </form>

      <div className="border m-4">
        <img src={profilePictureUrl} />
      </div>
    </div>
  );
};

export default About;
