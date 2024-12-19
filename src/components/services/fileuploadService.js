import { FORMDATA } from "../constants/api-constants";
import { apiPost } from "../../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const processImage = createAsyncThunk(
  "fileUpload/processImage", // Action type
  async ({ userName, swatchName, inputImageName, outputImageName, expName }, {  rejectWithValue }) => {
    try {
      const response = await apiPost(`${FORMDATA}`, {
        user_name: userName,
        swatch_name: swatchName,
        inputImage_name: inputImageName,
        outputImage_name: outputImageName,
        exp_name: expName,
      });
      console.log("Process Image Response:", response);
      return response.data; // return data to the reducer
    } catch (error) {
      console.error("Error processing image:", error);
      return rejectWithValue(error); // reject with the error to handle it in extraReducers
    }
  }
);
