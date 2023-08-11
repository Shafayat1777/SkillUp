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
    setFile,
    contentType,
    handleDetailsReload
  ) => {
    setIsLoadingContent(true);
    setErrorContent(null);
    console.log(content_title, contentType)
    const contentData = new FormData();
    contentData.append("title", content_title);
    contentData.append("lessonId", lessonId);
    contentData.append("file", file);

    try {
      const response = await axios.post(contentType==='PDF'? "/api/courses/contents/file/pdf":"/api/courses/contents/file/video", contentData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data", // Important to set the correct Content-Type
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setFile((prevState) => {
            return { ...prevState, progress: percentCompleted };
          });
        },
      });


      if (response.status >= 200 && response.status < 300) {
        setIsLoadingContent(false);
        handleDetailsReload();
      } else {
        setIsLoadingContent(false);
        setErrorContent(response.data.error);
      }
    } catch (error) {
      setIsLoadingContent(false);
      setErrorContent(error.message);
    }
  };

  return { addcontent, isLoadingContent, errorContent };
};
