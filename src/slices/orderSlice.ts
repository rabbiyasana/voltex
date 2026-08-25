import {createSlice,type PayloadAction,} from "@reduxjs/toolkit";
  
import type { Order } from "../types/orderType";

interface OrderState {items: Order[];}
  
const savedOrders =localStorage.getItem("voltex-orders");

const initialState: OrderState = {
    items: savedOrders
      ? JSON.parse(savedOrders)
      : [],
  };

  const orderSlice = createSlice({
    name: "orders",
  
    initialState,
  
    reducers: {
      addOrder: (
        state,
        action: PayloadAction<Order>
      ) => {
        state.items.unshift(action.payload);
      },
    },
  });
  export const {
    addOrder,
  } = orderSlice.actions;
  
  export default orderSlice.reducer;  
  