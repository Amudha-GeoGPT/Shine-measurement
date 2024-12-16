import { createSlice } from "@reduxjs/toolkit";
import mockExperiments from "../../components/Experiments/data/mockExperiments"
import {fetchSwatchName}  from "../Swatchslice/swatchthunk";

const experimentsSlice = createSlice({
  name: "experiments",
  initialState: {
    view: "home",
    searchTerm: "",
    experiments: mockExperiments,
    swatchName: "",
    status: "idle",
    error: null,
  },
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
      })
      .addCase(fetchSwatchName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.swatchName = action.payload;
      })
      .addCase(fetchSwatchName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setView, setSearchTerm } = experimentsSlice.actions;

export default experimentsSlice.reducer;
