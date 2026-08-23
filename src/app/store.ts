import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
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