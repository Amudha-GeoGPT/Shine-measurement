// src/store/fileupload/fileUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileInfo: [],
  uploadProgress: 0,
  uploadComplete: false,
  image: [],
  selectedFile: null, // Add selectedFile to the initial state
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setFileInfo: (state, action) => {
      state.fileInfo = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setUploadComplete: (state, action) => {
      state.uploadComplete = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload; // Add a reducer to set the selectedFile
    },
  },
});

export const {
  setFileInfo,
  setUploadProgress,
  setUploadComplete,
  setImage,
  setSelectedFile, // Export the setSelectedFile action
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
