import type { Product } from "./productType";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;

  items: OrderItem[];

  subtotal: number;
  shipping: number;
  total: number;
}