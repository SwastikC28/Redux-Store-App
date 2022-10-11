import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      console.log(action);
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity || 0;
    },
    addItemtoCart(state, action) {
      state.changed = true;
      let existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalQuantity++;

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      } else {
        const { title, price, id } = action.payload;
        const item = {
          title,
          price,
          id,
          quantity: 1,
          totalPrice: price,
        };
        state.items.push(item);
      }
    },

    removeItemfromCart(state, action) {
      state.changed = true;
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
