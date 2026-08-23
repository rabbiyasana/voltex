import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productsReducer from "../slices/productSlice";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products:productsReducer
    },

});
store.subscribe(() => {
    localStorage.setItem(
        "voltex-cart",
        JSON.stringify(store.getState().cart.items)
    );
});
export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;