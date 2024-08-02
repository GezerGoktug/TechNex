import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //! Kullanıcı giriş işlemi
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    //! Kullanıcı çıkış işlemi
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    //! Kullanıcı bilgilerini güncelleme işlemi
    update(state, action) {
      state.user = action.payload;
    },
  },
});
export const authActions = authSlice.actions;
