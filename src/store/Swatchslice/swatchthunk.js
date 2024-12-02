import { createAsyncThunk } from "@reduxjs/toolkit";
import { newSwatchName } from "../../components/services/SwatchService";

// Async thunk for fetching swatch name
export const fetchSwatchName = createAsyncThunk(
  "experiments/fetchSwatchName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await newSwatchName();
      return response?.data?.results?.swatchname?.swatch_name;
    } catch (error) {
      return rejectWithValue("Failed to generate swatch name");
    }
  }
);
