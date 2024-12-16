import { createSlice } from '@reduxjs/toolkit';
import { getbycalculatelist } from '../calculationslice/calculationthunk'; // Importing the thunk

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const calculationSlice = createSlice({
  name: 'calculation',
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
      .addCase(getbycalculatelist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getbycalculatelist.fulfilled, (state, action) => {
        state.data = action.payload; // Assuming response contains the list data
        state.loading = false;
      })
      .addCase(getbycalculatelist.rejected, (state, action) => {
        state.error = action.error.message; // If rejection contains an error message
        state.loading = false;
      });
  },
});

export const { fetchStart, fetchSuccess, fetchError } = calculationSlice.actions;

export default calculationSlice.reducer;
