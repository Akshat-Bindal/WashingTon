"use client";
import top_products from "@/data/top_products.json"; 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Match structure of your JSON
interface Product {
  _id: { $oid: string };
  name: string;
  description?: string;
  price: number;
  category?: { $oid: string };
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  product: Product | null;
}

const initialState: ProductState = {
  products: top_products, // ✅ load from JSON
  product: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    single_product: (state, action: PayloadAction<string>) => {
      // ✅ compare with MongoDB _id.$oid
      state.product =
        state.products.find((p) => p._id.$oid === action.payload) || null;
    },
  },
});

export const { single_product } = productSlice.actions;

// ✅ Selectors
export const selectProducts = (state: { products: ProductState }) =>
  state.products.products;
export const selectProduct = (state: { products: ProductState }) =>
  state.products.product;

export default productSlice.reducer;
