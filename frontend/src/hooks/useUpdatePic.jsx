import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";

export const useUpdatePic = () => {
  const { user } = useAuthContext();
  const [errorPic, setErrorPic] = useState(null);
  const [isLoadingPic, setIsLoadingPic] = useState(null);

  const updatePic = async (profile_pic) => {
    setIsLoadingPic(true);

    // set the Form data
    const contentData = new FormData();
    contentData.append("profile_pic", profile_pic);
    for (const [key, value] of contentData.entries()) {
      console.log(key, value);
    }

    // config the headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_HOST}/users/user/updatePic`,
        contentData,
        config
      );
      setIsLoadingPic(false);
      
    
    } catch (error) {
      if (error.response.status === 400) {
        setIsLoadingPic(false);
        setErrorPic(error.response.message);
      } else {
        setIsLoadingPic(false);
        alert("An unknown error occurred.");
      }
    }
  };

  return { updatePic, errorPic, isLoadingPic };
};
