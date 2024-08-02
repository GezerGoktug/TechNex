import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";
import { filtreSlice } from "./slices/filtreSlice";
import { modalSlice } from "./slices/modalSlice";
import { productsSlice } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    cartSlice: cartSlice.reducer,
    filtreSlice:filtreSlice.reducer,
    modalSlice:modalSlice.reducer,
    productsSlice:productsSlice.reducer
  },
});
