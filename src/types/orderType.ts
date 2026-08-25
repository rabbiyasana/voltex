import type { Product } from "./productType";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface OrderContact {
  email: string;
  phone: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  apartment:string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;

  items: OrderItem[];

  contact: OrderContact;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
}