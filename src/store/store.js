import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./swatch-page/swatch-slice";
import calculationReducer from './calculation-page/calculation-slice';
import SwatchlistviewReducer from './swatchListView-page/swatchListView-slice'
import fileUploadReducer from "./fileUpload-page/upload-slice";
import finaldataReducer from './fileUpload-page/finalData-slice';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    calculation: calculationReducer,
    Swatchlistview:SwatchlistviewReducer,
    fileUpload: fileUploadReducer,
    finaldata:finaldataReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),

});
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

export default store;