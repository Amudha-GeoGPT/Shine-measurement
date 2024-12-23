import { createAsyncThunk } from "@reduxjs/toolkit";
import { getByCalculate } from "../../components/services/calculation-service";

// Get by Calculate List
export const getbycalculatelist = createAsyncThunk(
  'getByCalculate/getbycalculatelist',
  async (swatchName, { rejectWithValue }) => {
    try {
      const response = await getByCalculate(swatchName);
      console.log("Success Response: ", response.data); 
      return response.data; // Return only the serializable data
    } catch (error) {
      console.log("Error: ", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
