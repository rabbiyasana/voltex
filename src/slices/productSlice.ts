import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import { getProducts, getProductCategories, getProductsByCategory,searchProducts,getProductById, } from "../api/productApi";
import type { Product } from "../types/productType";

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  categories: string[];
  total: number;
  limit: number;
  skip: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  categories: [],
  total: 0,
  limit: 12,
  skip: 0,
  loading: false,
  error: null,
};

export const fetchProducts =
    createAsyncThunk("products/fetchProducts", async ({ limit, skip, }: {
        limit: number;
        skip: number;
    }) => {
        return await getProducts(
            limit,
            skip
        );
    }
    );
export const fetchProductCategories = createAsyncThunk(
    "products/fetchProductCategories",
    async () => {
        return await getProductCategories();
    }
);
export const fetchProductsByCategory =
    createAsyncThunk(
        "products/fetchProductsByCategory",
        async ({
            category,
            limit,
            skip,
        }: {
            category: string;
            limit: number;
            skip: number;
        }) => {
            return await getProductsByCategory(
                category,
                limit,
                skip
            );
        }
    );
export const fetchSearchProducts =
createAsyncThunk(
    "products/fetchSearchProducts",
    async ({
    query,
    limit,
    skip,
    }: {
    query: string;
    limit: number;
    skip: number;
    }) => {
    return await searchProducts(
        query,
        limit,
        skip
    );
    }
);
export const fetchProductById =
  createAsyncThunk(
    "products/fetchProductById",
    async (id: string) => {
      return await getProductById(id);
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
            )
            .addCase(
                fetchProductCategories.fulfilled,
                (state, action) => {
                    state.categories = action.payload;
                }
            )
            .addCase(
                fetchProductsByCategory.pending,
                (state) => {
                  state.loading = true;
                  state.error = null;
                }
              )
              
              .addCase(
                fetchProductsByCategory.fulfilled,
                (state, action) => {
                  state.loading = false;
                  state.items = action.payload.products;
                  state.total = action.payload.total;
                  state.limit = action.payload.limit;
                  state.skip = action.payload.skip;
                }
              )
              
              .addCase(
                fetchProductsByCategory.rejected,
                (state, action) => {
                  state.loading = false;
                  state.error =
                    action.error.message ??
                    "Failed to load products.";
                }
              )
              .addCase(
                fetchSearchProducts.pending,
                (state) => {
                  state.loading = true;
                  state.error = null;
                }
              )
              
              .addCase(
                fetchSearchProducts.fulfilled,
                (state, action) => {
                  state.loading = false;
                  state.items = action.payload.products;
                  state.total = action.payload.total;
                  state.limit = action.payload.limit;
                  state.skip = action.payload.skip;
                }
              )
              
              .addCase(
                fetchSearchProducts.rejected,
                (state, action) => {
                  state.loading = false;
                  state.error =
                    action.error.message ??
                    "Failed to search products.";
                }
              )
              .addCase(
                fetchProductById.pending,
                (state) => {
                  state.loading = true;
                  state.error = null;
                  state.selectedProduct = null;
                }
              )
              
              .addCase(
                fetchProductById.fulfilled,
                (state, action) => {
                  state.loading = false;
                  state.selectedProduct = action.payload;
                }
              )
              
              .addCase(
                fetchProductById.rejected,
                (state, action) => {
                  state.loading = false;
                  state.selectedProduct = null;
                  state.error =
                    action.error.message ??
                    "Failed to load product details.";
                }
              );
    },
});

export default productsSlice.reducer;