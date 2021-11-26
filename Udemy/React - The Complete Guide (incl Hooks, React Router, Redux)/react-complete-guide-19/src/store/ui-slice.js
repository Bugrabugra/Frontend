import {createSlice} from "@reduxjs/toolkit";


const sliceUI = createSlice({
  name: "ui",
  initialState: {cartIsVisible: false, notification: null},
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }
    }
  }
});

export const actionsUI = sliceUI.actions;
export default sliceUI;