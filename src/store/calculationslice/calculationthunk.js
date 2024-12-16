// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getByCalculate } from "../../components/services/CalculationService";

// // Get by Calculate List
// export const getbycalculatelist = createAsyncThunk(
//   'getByCalculate/getbycalculatelist',
//   async () => {
//     return new Promise((resolve, reject) => {
//       getByCalculate()
//         .then((response) => {
//             console.log("Success Response: ", response); // Log the response on success
//           resolve(response);
//         })
//         .catch((e) => {
//             console.log("error",e);
//           reject(e);
//         });
//     });
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getByCalculate } from "../../components/services/CalculationService";

// Get by Calculate List
export const getbycalculatelist = createAsyncThunk(
  'getByCalculate/getbycalculatelist',
  async (swatchName, { rejectWithValue }) => {
    try {
      const response = await getByCalculate(swatchName);
      console.log("Success Response: ", response); 
      return response;
    } catch (error) {
      console.log("Error: ", error);
      return rejectWithValue(error);
    }
  }
);
