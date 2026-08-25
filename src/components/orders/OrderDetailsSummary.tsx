interface OrderDetailsSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
  }
  
  function OrderDetailsSummary({
    subtotal,
    shipping,
    total,
  }: OrderDetailsSummaryProps) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-[#1D1D1F]">
          Order Summary
        </h2>
  
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
  
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
  
            <span>
              {shipping === 0
                ? "Free"
                : `$${shipping.toFixed(2)}`}
            </span>
          </div>
  
          <div className="border-t border-black/10 pt-4">
            <div className="flex justify-between">
              <span className="font-extrabold text-[#1D1D1F]">
                Total
              </span>
  
              <span className="font-extrabold text-[#1D1D1F]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default OrderDetailsSummary;