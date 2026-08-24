import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productsReducer from "../slices/productSlice";
import authReducer from "../slices/authSlice"
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products:productsReducer,
        auth: authReducer,
    },

});
store.subscribe(() => {
    const state = store.getState();
localStorage.setItem("voltex-cart",JSON.stringify(state.cart.items));
localStorage.setItem(
    "voltex-auth",
    JSON.stringify({
      user: state.auth.user,
      accessToken: state.auth.accessToken,
      refreshToken: state.auth.refreshToken,
      isAuthenticated:
        state.auth.isAuthenticated,
      loading: false,
      error: null,
    })
  );
});
export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;