import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUploadProgress, setUploadComplete } from './fileuploadSlice';
import { client } from '../../utils/client';

export const uploadFilesThunk = createAsyncThunk(
  'fileUpload/uploadFiles',
  async ({ formData}, { dispatch, rejectWithValue }) => {
    const payload = {
      file: fileData,
      swatch_name: swatchName,
    };
    try {
      const response = await client('/uploadImage', {
        method: 'POST',
        body: formData,
        contentType: 'multipart/form-data',
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setUploadProgress(progress));
          if (progress === 100) {
            dispatch(setUploadComplete(true));
          }
        },
      });

   
    } catch (error) {
      return rejectWithValue('An error occurred while uploading the image.');
    }
  }
);
