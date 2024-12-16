import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import imageResultReducer from "../store/slices/imageResultSlice";
const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    imageResult: imageResultReducer,
  },
});

export default store;