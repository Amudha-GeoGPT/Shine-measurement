// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { newSwatchName } from "../../components/services/SwatchService";

// // Async thunk for fetching swatch name
// export const fetchSwatchName = createAsyncThunk(
//   "experiments/fetchSwatchName",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await newSwatchName();
//       return response?.data?.results?.swatchname?.swatch_name;
//     } catch (error) {
//       return rejectWithValue("Failed to generate swatch name");
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import {newSwatchName} from '../../components/services/SwatchService'
// Get by Calculate List
export const fetchSwatchName = createAsyncThunk(
  'newSwatchName/fetchSwatchName',
  async () => {
    return new Promise((resolve, reject) => {
      newSwatchName()
        .then((response) => {
            console.log("Success Response: ", response); // Log the response on success
          resolve(response);
        })
        .catch((e) => {
            console.log("error",e);
          reject(e);
        });
    });
  }
);