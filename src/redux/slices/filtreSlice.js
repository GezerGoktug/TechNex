import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtreTags: {
    searchTerm: "",
    minPrice: 0,
    filteredBrands: [],
    filteredCategories: [],
    filteredYears: [],
  },
  currentPage: 1,
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
    nextPage(state) {
      state.currentPage++;
    },
    prevPage(state) {
      state.currentPage--;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});
export const filtreActions = filtreSlice.actions;
