import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import calculationReducer from './calculationslice/calculationSlice';
import SwatchlistviewReducer from './Swatchlistview/swatchlistviewslice'
import fileUploadReducer from "./Fileuploadslice/fileuploadSlice";
import { useDispatch , useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    calculation: calculationReducer,
    Swatchlistview:SwatchlistviewReducer,
    fileUpload: fileUploadReducer,
    
  },

  
});

// RootState inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;


export default store;
