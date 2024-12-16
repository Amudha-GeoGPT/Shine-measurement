import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import calculationReducer from './calculationslice/calculationSlice';
import SwatchlistviewReducer from './Swatchlistview/swatchlistviewslice'
import fileUploadReducer from "./fileuploadSlice/fileuploadSlice";
// import imagecropReducer from "./imagecropupload/imagecropSlice"

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    calculation: calculationReducer,
    Swatchlistview:SwatchlistviewReducer,
    fileUpload: fileUploadReducer,
    // imagecrops:imagecropReducer
  },
});

export default store;
