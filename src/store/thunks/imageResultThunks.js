import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchImages = createAsyncThunk(
  'imageResult/fetchImages',
  async (swatchName, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://shinemeasurementdev.ckdigital.in/api/getbyswatchname', {
        swatch_name: swatchName
      });

      if (response.data.message === 'sucess' && response.data.results) {
        return response.data.results.map((item, index) => ({
          id: index,
          imageUrl: item.inputImage_name,
          downloadLink: item.outputImage_name,
          title: item.roi || `ROI ${index + 1}`,
        }));
      }
      
      return rejectWithValue('No results found in the API response');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);