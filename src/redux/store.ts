import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filters";
import cartReducer from "./slices/cart";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
  },
});

export default store;
