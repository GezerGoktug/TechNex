import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtreTags: {
    searchTerm: "",
    minPrice: 0,
    filteredBrands: [],
    filteredCategories: [],
    filteredYears: [],
  },
};

export const filtreSlice = createSlice({
  name: "filtreTags",
  initialState,
  reducers: {
    updateFiltreTags(state, action) {
      state.filtreTags = action.payload;
    },
    updateCategory(state, action) {
      state.filtreTags.filteredCategories = action.payload;
    },
    resetFiltreTags(state) {
      state.filtreTags = initialState.filtreTags;
    },
  },
});
export const filtreActions = filtreSlice.actions;
