import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F5F7]">
        <ShoppingBag
          size={26}
          className="text-gray-400"
        />
      </div>

      <h1 className="text-xl font-extrabold text-[#1D1D1F]">
        Your cart is empty
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Add some products before checking out.
      </p>

      <button
        type="button"
        onClick={() => navigate("/products")}
        className="mt-6 rounded-xl bg-[#0057FF] px-5 py-2.5 text-sm font-bold text-white"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default EmptyCart;