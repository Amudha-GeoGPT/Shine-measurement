import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";

const store = configureStore({
  reducer: {
    experiments: experimentsReducer
  },
});

export default store;
