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
  totalPage: 1,
  direction: "next",
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
      state.direction = "next";
    },
    prevPage(state) {
      state.currentPage--;
      state.direction = "prev";
    },
    setPage(state, action) {
      state.currentPage = action.payload;
      if (state.currentPage > action.payload) state.direction = "prev";
      else if (state.currentPage < action.payload) state.direction = "next";
    },
    setPageCount(state, action) {
      state.totalPage = action.payload;
    },
  },
});
export const filtreActions = filtreSlice.actions;
