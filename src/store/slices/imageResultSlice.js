import { createSlice } from '@reduxjs/toolkit';
import { fetchImages } from '../thunks/imageResultThunks';

const initialState = {
  images: [],
  loading: false,
  error: null,
};

const imageResultSlice = createSlice({
  name: 'imageResult',
  initialState,
  reducers: {
    clearImages: (state) => {
      state.images = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearImages } = imageResultSlice.actions;
export default imageResultSlice.reducer;