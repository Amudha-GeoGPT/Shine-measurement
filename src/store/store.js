import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import calculationReducer from './calculationslice/calculationSlice';
import SwatchlistviewReducer from './Swatchlistview/swatchlistviewslice'
import fileUploadReducer from "./fileuploadSlice/fileuploadSlice";

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    calculation: calculationReducer,
    Swatchlistview:SwatchlistviewReducer,
    fileUpload: fileUploadReducer,
    
  },

  
});

export default store;
