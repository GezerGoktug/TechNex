import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";
import { filtreSlice } from "./slices/filtreSlice";
import { modalSlice } from "./slices/modalSlice";
import { productsSlice } from "./slices/productsSlice";
import { favProductsApi } from "./api/favProductApi";
import { productDetailApi } from "./api/productDetailApi";


export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    cartSlice: cartSlice.reducer,
    filtreSlice: filtreSlice.reducer,
    modalSlice: modalSlice.reducer,
    productsSlice: productsSlice.reducer,
    [favProductsApi.reducerPath]: favProductsApi.reducer,
    [productDetailApi.reducerPath]: productDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productDetailApi.middleware)
      .concat(favProductsApi.middleware),
});
