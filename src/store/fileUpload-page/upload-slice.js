import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  fileInfo: [],
  uploadProgress: 0,
  uploadComplete: false,
  image: [],
  selectedFile: null,
  SwatchName:''
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setFileInfo(state, action) {
      state.fileInfo = action.payload;
      console.log(action.payload)
    },
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload;
    },
    setUploadComplete(state, action) {
      state.uploadComplete = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
    setSelectedFile(state, action) {
      state.selectedFile = action.payload;
    },
    setSwatchName(state, action) {
      state.SwatchName = action.payload;
    },
    resetFileSlice() {
      console.log('umarasdfghjk')
      return initialState; // Correct reset logic
    },
  },
 
  
});

export const { setFileInfo, setUploadProgress, setUploadComplete, setImage, setSelectedFile,setSwatchName,resetFileSlice } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
