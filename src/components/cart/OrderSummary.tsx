import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
    subtotal: number;
}

function OrderSummary({
    subtotal,
}: OrderSummaryProps) {
    const navigate = useNavigate();

    const shipping = subtotal >= 99 ? 0 : 9.99;
    const total = subtotal + shipping;

    return (
        <aside className="h-fit rounded-2xl bg-white p-5">
            <h2 className="text-lg font-extrabold text-[#1D1D1F]">
                Order Summary
            </h2>

            <div className="mt-5 space-y-3">
                {/* SUBTOTAL */}
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>

                    <span className="font-semibold text-[#1D1D1F]">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>

                {/* SHIPPING */}
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>

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
                <div className="border-t border-black/10 pt-4">
                    <div className="flex justify-between">
                        <span className="font-bold">
                            Total
                        </span>

                        <span className="text-xl font-extrabold text-[#1D1D1F]">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* CHECKOUT */}
            <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-xl bg-[#0057FF] py-3 text-sm font-extrabold text-white hover:bg-[#0046CC]"
            >
                Proceed to Checkout
            </button>

            {/* CONTINUE SHOPPING */}
            <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-3 w-full rounded-xl border border-black/10 py-3 text-sm font-bold text-[#1D1D1F]"
            >
                Continue Shopping
            </button>
        </aside>
    );
}

export default OrderSummary;