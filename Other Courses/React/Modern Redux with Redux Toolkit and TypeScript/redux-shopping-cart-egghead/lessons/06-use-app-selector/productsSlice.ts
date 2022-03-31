import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../app/api";

export interface ProductsState {
  products: { [id: string]: Product };
}

const initialState: ProductsState = {
  products: {
    "123": { name: "Fake Product" },
  },
};

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {},
});

export default productsSlice.reducer;
