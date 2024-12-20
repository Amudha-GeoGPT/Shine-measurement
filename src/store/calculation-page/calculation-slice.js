import { createSlice } from '@reduxjs/toolkit';
import { getbycalculatelist } from './calculation-thunk';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getbycalculatelist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getbycalculatelist.fulfilled, (state, action) => {
        state.data = action.payload; // Save only the serialized data
        state.loading = false;
      })
      .addCase(getbycalculatelist.rejected, (state, action) => {
        state.error = action.payload; // Use payload for the error
        state.loading = false;
      });
  },
});

export default calculationSlice.reducer;
