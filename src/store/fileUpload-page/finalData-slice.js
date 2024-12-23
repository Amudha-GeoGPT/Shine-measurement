import { createSlice } from '@reduxjs/toolkit';
import { uploadFilesThunk } from './upload-thunk';


const initialState = {
    uploadResponse: null, // Add this to the initial state
    result:null
  };
  
  export const finaldataSlice = createSlice({
    name: ' finaldata',
    initialState,
    reducers: {
        addresult:(state,action)=>{
            state.result=action.payload
        }
    },
    extraReducers: (builder) => {
      builder.addCase(uploadFilesThunk.fulfilled, (state, action) => {
        state.uploadResponse = action.payload; // Store response
      });
    },
  });
  export const {addresult}=finaldataSlice.actions;
  
  export default finaldataSlice.reducer;
  