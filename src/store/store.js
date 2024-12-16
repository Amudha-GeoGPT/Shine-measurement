import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "./Swatchslice/swatchslice";
import calculationReducer from './calculationslice/calculationSlice';
import SwatchlistviewReducer from './Swatchlistview/swatchlistviewslice'
import { useDispatch , useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    calculation: calculationReducer,
    Swatchlistview:SwatchlistviewReducer,
    finaldata:finaldataReducer,
    
  },

  
});
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

// RootState inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;


export default store;
