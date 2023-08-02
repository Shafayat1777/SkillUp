import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useAddContent = () => {
  const { user } = useAuthContext();
  const [errorContent, setErrorContent] = useState(null);
  const [isLoadingContent, setIsLoadingContent] = useState(null);

  const addcontent = async (
    content_title,
    file,
    lessonId,
    handleDetailsReload
  ) => {
    setIsLoadingContent(true);
    setErrorContent(null);

    const contentData = new FormData();
    contentData.append("title", content_title);
    contentData.append("lessonId", lessonId);
    contentData.append("file", file);
    

    try {
      const response = await axios.post("/api/courses/contents", contentData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data", // Important to set the correct Content-Type
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          
        },
      });

      if (!response.ok) {
        setIsLoadingContent(false);
        setErrorContent(response.data.error);
      }
      if (response.ok) {
        setIsLoadingContent(false);
        handleDetailsReload()
      }
    } catch (error) {
        setIsLoadingContent(false);
      setErrorContent("error");
    }
  };

  return { addcontent, isLoadingContent, errorContent };
};
