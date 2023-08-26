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
    videoType,
    link,
    handleDetailsReload
  ) => {
    setIsLoadingContent(true);
    setErrorContent(null);

    const contentData = new FormData();
    contentData.append("content_title", content_title);
    contentData.append("lessonId", lessonId);
    console.log(content_title, lessonId, link)
    var url = "";
    if (contentType === "PDF") {
      url = "http://localhost:4000/api/courses/contents/file/pdf";
      contentData.append("file", file);
    } else {
      if (videoType === "File") {
        url = "http://localhost:4000/api/courses/contents/file/video";
        contentData.append("file", file);
      } else {
        url = "http://localhost:4000/api/courses/contents/link/video";
        contentData.append("link", link);
      }
    }

    if (videoType === "File") {
      try {
        const response = await axios.post(url, contentData, {
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
    } else {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          content_title,
          lessonId,
          link,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoadingContent(false);
        setErrorContent(json.error);
      }
      if (response.ok) {
        setIsLoadingContent(false);
        handleDetailsReload();
      }
    }
  };

  return { addcontent, isLoadingContent, errorContent };
};
