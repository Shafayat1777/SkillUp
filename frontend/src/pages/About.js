import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const About = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const { user } = useAuthContext();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleClick = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("id", user.id);
    userData.append("image", avatar);

    try {
      const response = await axios.post("/api/courses/upload", userData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data", // Important to set the correct Content-Type
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setProfilePictureUrl(response.data.profilePictureUrl);
      setError(null);
      setUpdated(response.data.mssg);
    } catch (error) {
      console.error("Error uploading the file:", error);
      setError("Error uploading the file");
      setUpdated(null);
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
      <div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="upload-progress">Upload Progress: {uploadProgress}%</div>
        )}
      </div>
    </div>
  );
};

export default About;
