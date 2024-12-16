import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import calculationReducer from './calculationslice/calculationSlice';
import SwatchlistviewReducer from './Swatchlistview/swatchlistviewslice'
import fileUploadReducer from "./fileuploadSlice/uploadslice";
import finaldataReducer from './fileuploadSlice/finaldataSlice';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    calculation: calculationReducer,
    Swatchlistview:SwatchlistviewReducer,
    fileUpload: fileUploadReducer,
    finaldata:finaldataReducer,
    
  },

  
});
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

export default store;