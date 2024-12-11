// redux/thunks/fileUploadThunk.js
import {
    setUploadProgress,
    setUploading,
    setUploadError,
    setUploadSuccess,
  } from "../fileupload/fileuploadslice";
  import { client } from "../../utils/client";
  
  export const uploadFiles = ({ files, swatchName }) => async (dispatch) => {
    dispatch(setUploading(true));
  
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("swatch_name", swatchName);
  
      const response = await client("/uploadImage", {
        method: "POST",
        body: formData,
        contentType: "multipart/form-data",
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setUploadProgress(progress));
        },
      });
  
      if (response?.data?.message === "sucess") {
        dispatch(
          setUploadSuccess({
            files: files.map((file) => ({
              name: file.name,
              size: (file.size / 1024).toFixed(2) + " KB",
            })),
          })
        );
      } else {
        dispatch(setUploadError("Failed to upload files."));
      }
    } catch (error) {
      dispatch(setUploadError("An error occurred during the upload."));
    } finally {
      dispatch(setUploading(false));
    }
  };
  