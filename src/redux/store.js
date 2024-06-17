import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";
import { filtreSlice } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    cartSlice: cartSlice.reducer,
    filtreSlice:filtreSlice.reducer
  },
});
