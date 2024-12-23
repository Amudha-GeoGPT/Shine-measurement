import { createSlice } from "@reduxjs/toolkit";
import { fetchSwatchName } from "../swatch-page/swatch-thunk";

const initialState = {
  view: "home",
  searchTerm: "",
  experiments: "",
  swatchName: "",
  status: "idle",
  error: null,
};

const experimentsSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwatchName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSwatchName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.swatchName = action.payload?.data || ""; // Extract only the relevant data
      })
      .addCase(fetchSwatchName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export const { setView, setSearchTerm } = experimentsSlice.actions;

export default experimentsSlice.reducer;
