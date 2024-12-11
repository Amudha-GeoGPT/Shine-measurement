import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import fileUploadReducer from "../store/fileupload/fileuploadslice";

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    fileUpload: fileUploadReducer,
  },
});

export default store;
