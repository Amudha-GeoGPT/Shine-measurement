import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  fileInfo: [],
  uploadProgress: 0,
  uploadComplete: false,
  image: [],
  selectedFile: null,
  swatchName:'',
  croppedImage:null,
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
    setCroppedImage(state, action) {
      state.croppedImage = action.payload;
      console.log('dhfghbfghfghjh',state.croppedImage)
    },
    setSelectedFile(state, action) {
      state.selectedFile = action.payload;
      console.log('dhfghbfghf',state.selectedFile)
    },
    setSwatchName(state, action) {
      state.swatchName = action.payload;
      console.log('fcfecfdcdc',state.swatchName)
    },
  },
 
  
});

export const { setFileInfo, setUploadProgress, setUploadComplete, setImage, setSelectedFile,setSwatchName,setCroppedImage } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
