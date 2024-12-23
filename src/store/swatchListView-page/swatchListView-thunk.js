import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBySwatchlist } from "../../components/services/swatchListView-service";

// Fetch Swatch List
export const fetchSwatchList = createAsyncThunk(
  "getBySwatchlist/fetchSwatchList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBySwatchlist();
      console.log("Success Response:", response.data);  // Only log the required data
      return response.data;  // Return only serializable data
    } catch (error) {
      console.error("Error fetching swatch list:", error);
      return rejectWithValue(
        error.message || "An error occurred while fetching the swatch list."
      );
    }
  }
);
