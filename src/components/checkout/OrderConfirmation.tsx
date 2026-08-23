import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Product } from "../../types/productType";
interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderConfirmationProps {
  orderItems: OrderItem[];
  total: number;
  orderNumber: string;
}

function OrderConfirmation({
  orderItems,
  total,
  orderNumber,
}: OrderConfirmationProps) {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-2xl py-10 text-center">
      {/* SUCCESS ICON */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Check size={30} strokeWidth={3} />
      </div>

      <h1 className="mt-5 text-3xl font-extrabold text-[#1D1D1F]">
        Order Confirmed!
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Thank you for your purchase.
      </p>

      <p className="mt-2 text-sm font-semibold text-[#1D1D1F]">
        Order #{orderNumber}
      </p>

      {/* ORDER ITEMS */}
      <div className="mt-8 rounded-2xl bg-white p-6 text-left">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
          Items Ordered
        </p>

        <div className="mt-4 space-y-4">
          {orderItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-[#F5F5F7]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1D1D1F]">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Qty {item.quantity}
                  </p>
                </div>
              </div>

              <span className="flex-shrink-0 text-sm font-bold text-[#1D1D1F]">
                $
                {(
                  item.product.price *
                  item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
          <span className="font-bold text-[#1D1D1F]">
            Total Paid
          </span>

          <span className="text-xl font-extrabold text-[#1D1D1F]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/products")}
        className="mt-6 rounded-xl bg-[#0057FF] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#0046CC]"
      >
        Continue Shopping
      </button>
    </section>
  );
}

export default OrderConfirmation;