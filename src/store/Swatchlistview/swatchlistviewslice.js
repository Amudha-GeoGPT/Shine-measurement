import { createSlice } from '@reduxjs/toolkit';
import { fetchSwatchList } from './swatchlistviewthunk'; // Importing the thunk

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const SwatchlistviewSlice = createSlice({
  name: 'Swatchlistview',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwatchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwatchList.fulfilled, (state, action) => {
        state.data = action.payload; // Assuming response contains the list data
        state.loading = false;
      })
      .addCase(fetchSwatchList.rejected, (state, action) => {
        state.error = action.error.message; // If rejection contains an error message
        state.loading = false;
      });
  },
});

export const { fetchStart, fetchSuccess, fetchError } = SwatchlistviewSlice.actions;

export default SwatchlistviewSlice.reducer;
