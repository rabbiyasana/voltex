import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types/orderType";


interface OrderCardProps {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

function OrderCard({
  id,
  date,
  status,
  total,
  itemCount,
}: OrderCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`/account/orders/${id}`)
      }
      className="flex w-full items-center justify-between rounded-2xl border border-black/5 bg-white p-5 text-left transition-shadow hover:shadow-sm"
    >
      <div>
        <p className="text-sm font-extrabold text-[#1D1D1F]">
          Order #{id}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {date}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
            {status}
          </span>

          <span className="text-xs text-gray-500">
            {itemCount}{" "}
            {itemCount === 1
              ? "item"
              : "items"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-extrabold text-[#1D1D1F]">
          ${total.toFixed(2)}
        </p>

        <ChevronRight
          size={17}
          className="text-gray-400"
        />
      </div>
    </button>
  );
}

export default OrderCard;