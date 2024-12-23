import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostwithImage } from '../../utils/axios';
 
// Helper function to convert base64 to Blob
const base64ToBlob = (base64Data, contentType = 'image/png') => {
  const byteCharacters = atob(base64Data.split(',')[1]); // Remove the prefix (data:image/png;base64,)
  const byteArrays = [];
 
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byteArray = byteCharacters.charCodeAt(offset);
    byteArrays.push(byteArray);
  }
 
  return new Blob([new Uint8Array(byteArrays)], { type: contentType });
};
 
export const uploadFilesThunk = createAsyncThunk(
  'fileUpload/uploadFiles',
  async ({ base64Image, Swatchid }, { rejectWithValue }) => {
    try {
      if (!base64Image) {
        throw new Error("No image data provided");
      }

      const blob = base64ToBlob(base64Image, 'image/png');
      const file = new File([blob], 'uploaded-image.png', { type: 'image/png' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('swatch_name', Swatchid || 'default_swatch');

      const response = await apiPostwithImage('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("check response",response);

      // Return only the serializable data
      return response;
      
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while uploading the image.');
    }
  }
);
