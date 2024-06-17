import { createSlice } from "@reduxjs/toolkit";
import { toastNotify } from "../../components/toastify/toastNotify";
import types from "../../constants/types";

const initialState = {
  cart: [],
  price: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //! Ürün ekleme işlevi
    addCart(state, action) {
      //! Ürünün yorumlarındaki zamanları milisaniyeye dönüştürme
      Object.keys(action.payload.product.comments).forEach((key) => {
        action.payload.product.comments[key].time =
          action.payload.product.comments[key].time.toMillis();
      });

      const selectedProduct = {
        quantity: action.payload.quantity || 1,
        ...action.payload.product,
      };
      state.cart.push(selectedProduct);
      state.price +=
        action.payload.product.price * (action.payload.quantity || 1);
      toastNotify(types.SUCCESS, `Add product successfully`);
    },
    //! Ürün silme işlevi
    removeCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload.product.id
      );
      state.price -=
        action.payload.product.quantity * action.payload.product.price;
    },
    //! Sepeti temizleme işlevi
    clearCart(state) {
      state.cart = [];
      state.price = 0;
    },
    //! Ürün miktarını artırma işlevi
    increaseQuantity(state, action) {
      state.cart.forEach((item) => {
        if (item.id === action.payload.product.id) item.quantity++;
      });
      state.price += action.payload.product.price;
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
      state.price -= action.payload.product.price;
    },
    //! Sepetin başlangıç durumunu güncelleme işlevi
    updateİnitialCartState(state, action) {
      //! Ürün yorumlarındaki zamanları milisaniyeye dönüştürme
      action.payload.cart.forEach((product) => {
        Object.keys(product.comments).forEach((key) => {
          product.comments[key].time = product.comments[key].time.toMillis();
        });
      });
      state.cart = action.payload.cart;
      state.price = action.payload.price;
    },
  },
});
export const cartActions = cartSlice.actions;
