import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadFilesThunk = createAsyncThunk(
  'fileUpload/uploadFiles',
  async (requestBody, { rejectWithValue }) => {
    try {
      const response = await fetch('https://shinemeasurementdev.ckdigital.in/api/formData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
console.log('data',response);
      const data = await response.json();

      if (response.ok) {
        return data; // API response data
      } else {
        return rejectWithValue(data.message || 'Upload failed.');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong.');
    }
  }
);
