
import { createAsyncThunk } from "@reduxjs/toolkit";
import {getBySwatchlist} from '../../components/services/SwatchlistviewService'
// Get by Calculate List
export const fetchSwatchList = createAsyncThunk(
  'getBySwatchlist/fetchSwatchList',
  async () => {
    return new Promise((resolve, reject) => {
      getBySwatchlist()
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