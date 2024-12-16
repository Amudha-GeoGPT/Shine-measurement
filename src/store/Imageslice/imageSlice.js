import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [], // To store uploaded images
  fileInfo: [], // To store file info like name, size, etc.
  selectedFile: null, // To store the index of the selected file
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImages: (state, action) => {
      console.log("Adding images:", action.payload.images);
      state.images = [...state.images, ...action.payload.images.map((img) => img.url)];
      state.fileInfo = [...state.fileInfo, ...action.payload.fileInfo];
    },
    
    removeImage: (state, action) => {
      const index = action.payload;
      state.images.splice(index, 1);
      state.fileInfo.splice(index, 1);
      if (state.selectedFile === index) {
        state.selectedFile = null;
      }
    },
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { addImages, removeImage, selectFile } = imageSlice.actions;

export const selectImages = (state) => state.image.images;
export const selectFileInfo = (state) => state.image.fileInfo;
export const selectSelectedFile = (state) => state.image.selectedFile;

export default imageSlice.reducer;
