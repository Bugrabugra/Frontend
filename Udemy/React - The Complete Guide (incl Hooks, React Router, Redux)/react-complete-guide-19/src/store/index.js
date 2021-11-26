import {configureStore} from "@reduxjs/toolkit";
import sliceUI from "./ui-slice";
import sliceCart from "./cart-slice";


const store = configureStore({
  reducer: {
    ui: sliceUI.reducer,
    cart: sliceCart.reducer
  }
});

export default store;