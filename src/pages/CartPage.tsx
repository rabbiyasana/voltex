import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";
import { clearCart } from "../slices/cartSlice";

import CartItem from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import OrderSummary from "../components/cart/OrderSummary";

function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F5F7]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* PAGE HEADER */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1D1D1F]">
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "product"
                : "products"}{" "}
              in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="text-sm font-bold text-red-500 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        {/* CART LAYOUT */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* CART ITEMS */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
              />
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </main>
  );
}

export default CartPage;