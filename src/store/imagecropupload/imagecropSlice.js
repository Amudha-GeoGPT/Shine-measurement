// import { createSlice } from '@reduxjs/toolkit';
// import { imageuploadedlist } from './imagecropthunk'; // Importing the thunk

// const initialState = {
//   data: [],
//   loading: false,
//   error: null,
// };

// const imagecropSlice = createSlice({
//   name: 'imagecrops',
//   initialState,
//   reducers: {
//     fetchStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchSuccess: (state, action) => {
//       state.data = action.payload;
//       state.loading = false;
//     },
//     fetchError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(imageuploadedlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(imageuploadedlist.fulfilled, (state, action) => {
//         state.data = action.payload; // Assuming response contains the list data
//         state.loading = false;
//       })
//       .addCase(imageuploadedlist.rejected, (state, action) => {
//         state.error = action.error.message; // If rejection contains an error message
//         state.loading = false;
//       });
//   },
// });

// export const { fetchStart, fetchSuccess, fetchError } = imagecropSlice.actions;

// export default imagecropSlice.reducer;
