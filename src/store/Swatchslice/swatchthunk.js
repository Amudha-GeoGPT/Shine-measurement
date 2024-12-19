import { createAsyncThunk } from "@reduxjs/toolkit";
import { newSwatchName } from "../../components/services/SwatchService";

// Fetch Swatch Name Thunk
export const fetchSwatchName = createAsyncThunk(
  "newSwatchName/fetchSwatchName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await newSwatchName();
      console.log("Success Response:", response); 
      
      // Ensure only serializable data is returned
      return {
        data: response.data, 
        status: response.status 
      };
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
