import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./Imageslice/imageSlice";
import experimentsReducer from "./Swatchslice/swatchslice";

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    image: imageReducer,
  },
});

export default store;

