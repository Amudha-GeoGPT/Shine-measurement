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
    console.log("swatch",Swatchid);
    console.log("swatch",base64Image);
 
    try {
      // Check if base64 image exists
      if (!base64Image) {
        throw new Error("No image data provided");
      }
 
      // Convert base64 string to Blob
      const blob = base64ToBlob(base64Image, 'image/png'); // Change MIME type if needed
 
      // Create a File from the Blob
      const file = new File([blob], 'uploaded-image.png', { type: 'image/png' });
 
      // Prepare FormData
      const formData = new FormData();
      formData.append('file', file); // Append the image file
      formData.append('swatch_name', Swatchid || 'default_swatch'); // Pass swatch ID dynamically
 
      console.log('FormData:', formData); // Debugging FormData
 
      // Call the API
      const response = await apiPostwithImage('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
        },
      });
     
      console.log("response", JSON.stringify(response));
      // Return the response from the server (e.g., uploaded image URL)
      return response;
    } catch (error) {
      // Return error message if something goes wrong
      return rejectWithValue(error.message || 'An error occurred while uploading the image.');
    }
  }
);
 
 