import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //! Ürün ekleme işlevi
    addCart(state, action) {
      const selectedProduct = {
        quantity: action.payload.quantity || 1,
        ...action.payload.product,
      };
      state.cart.push(selectedProduct);
    },
    //! Ürün silme işlevi
    removeCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload.product.id
      );
    },
    //! Sepeti temizleme işlevi
    clearCart(state) {
      state.cart = [];
    },
    //! Ürün miktarını artırma işlevi
    increaseQuantity(state, action) {
      state.cart.forEach((item) => {
        if (item.id === action.payload.product.id) item.quantity++;
      });
    },
    //! Ürün miktarını azaltma işlevi
    decreaseQuantity(state, action) {
      //! Miktar 1 ise ürünü sepetten çıkarma
      if (action.payload.product.quantity === 1) {
        state.cart = state.cart.filter(
          (item) => item.id !== action.payload.product.id
        );
      } else {
        state.cart.forEach((item) => {
          if (item.id === action.payload.product.id) item.quantity--;
        });
      }
    },
    //! Sepetin başlangıç durumunu güncelleme işlevi
    updateİnitialCartState(state, action) {
      const cart = action.payload.cart;
      const newCartArr = [];
      Object.keys(cart).forEach((product) => newCartArr.push(cart[product]));
      state.cart = newCartArr;
    },
  },
});
export const cartActions = cartSlice.actions;
