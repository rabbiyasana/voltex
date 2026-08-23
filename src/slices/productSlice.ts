import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import { getProducts } from "../api/productApi";
  import type { Product } from "../types/productType";
  
  interface ProductsState {
    items: Product[];
    total: number;
    limit: number;
    skip: number;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ProductsState = {
    items: [],
    total: 0,
    limit: 12,
    skip: 0,
    loading: false,
    error: null,
  };
  
  export const fetchProducts =
    createAsyncThunk("products/fetchProducts",async ({limit,skip,}: {
        limit: number;
        skip: number;
      }) => {
        return await getProducts(
          limit,
          skip
        );
      }
    );
  
  const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
  
        .addCase(
          fetchProducts.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )
  
        .addCase(
          fetchProducts.fulfilled,
          (state, action) => {
            state.loading = false;
  
            state.items =
              action.payload.products;
  
            state.total =
              action.payload.total;
  
            state.limit =
              action.payload.limit;
  
            state.skip =
              action.payload.skip;
          }
        )
  
        .addCase(
          fetchProducts.rejected,
          (state, action) => {
            state.loading = false;
  
            state.error =
              action.error.message ??
              "Failed to load products.";
          }
        );
    },
  });
  
  export default productsSlice.reducer;