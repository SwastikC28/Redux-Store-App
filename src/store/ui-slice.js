import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  notification: null,
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart(state, action) {
      state.isVisible = !state.isVisible;
    },

    showNotification(state, action) {
      const { title, status, message } = action.payload;
      state.notification = { title, status, message };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
