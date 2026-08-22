import type { Product } from "../features/products/productType";

interface CheckoutItem {
  product: Product;
  quantity: number;
}

interface CheckoutSummaryProps {
  cartItems: CheckoutItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

function CheckoutSummary({
  cartItems,
  subtotal,
  shipping,
  total,
}: CheckoutSummaryProps) {
  return (
    <aside className="h-fit rounded-2xl bg-white p-5">
      <h2 className="text-lg font-extrabold text-[#1D1D1F]">
        Order Summary
      </h2>

      {/* ITEMS */}
      <div className="mt-5 space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between gap-4 text-sm"
          >
            <div className="min-w-0">
              <p className="font-medium text-[#1D1D1F]">
                {item.product.name}
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                ${item.product.price} × {item.quantity}
              </p>
            </div>

            <span className="flex-shrink-0 font-semibold text-[#1D1D1F]">
              $
              {(
                item.product.price *
                item.quantity
              ).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* TOTALS */}
      <div className="mt-5 border-t border-black/10 pt-4">
        {/* SUBTOTAL */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-semibold text-[#1D1D1F]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* SHIPPING */}
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-500">
            Shipping
          </span>

          <span
            className={
              shipping === 0
                ? "font-semibold text-emerald-600"
                : "font-semibold text-[#1D1D1F]"
            }
          >
            {shipping === 0
              ? "Free"
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* TOTAL */}
        <div className="mt-4 flex justify-between border-t border-black/10 pt-4">
          <span className="font-bold text-[#1D1D1F]">
            Total
          </span>

          <span className="text-xl font-extrabold text-[#1D1D1F]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default CheckoutSummary;