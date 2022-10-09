import { createSlice } from "@reduxjs/toolkit";
import { TCartItem, TState } from "../state.types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload as TCartItem;
      if (state.items.length > 0) {
        const targetProduct = (state as TState["cart"]).items.find(
          (item) => item.id === newItem.id
        );
        if (targetProduct) targetProduct.quantity = targetProduct.quantity + 1;
        else {
          newItem.quantity = 1;
          (state as TState["cart"]).items.push(newItem);
        }
      } else {
        newItem.quantity = 1;
        (state as TState["cart"]).items.push(newItem);
      }
    },
    removeItem(state, action) {
      const itemToRemove = action.payload as TCartItem;
      const targetItem = (state as TState["cart"]).items.find(
        (item) => item.id === itemToRemove.id
      );
      if (targetItem) {
        if (targetItem.quantity > 1)
          targetItem.quantity = targetItem.quantity - 1;
        else {
          const newItems = (state as TState["cart"]).items.filter(
            (item) => item.id !== itemToRemove.id
          );
          (state as TState["cart"]).items = newItems;
        }
      }
    },

    updateCartItem(state, action) {
      const newItem = action.payload as TCartItem;
      // let targetProduct = (state as TState["cart"]).items.find(
      //   (item) => item.id === newItem.id
      //   );
      //   if (targetProduct) targetProduct.attributes = newItem.attributes;

      const newItems = (state as TState["cart"]).items.map((item) => {
        if (item.id === newItem.id) return newItem;
        else return item;
      });
      state.items = newItems as any;
    },
  },
});

export const { removeItem, addItem, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
