interface OrderDetailsHeaderProps {
    orderId: string;
    date: string;
    status: string;
  }
  
  function OrderDetailsHeader({
    orderId,
    date,
    status,
  }: OrderDetailsHeaderProps) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Order
            </p>
  
            <h1 className="mt-1 text-2xl font-extrabold text-[#1D1D1F]">
              #{orderId}
            </h1>
  
            <p className="mt-2 text-sm text-gray-500">
              Placed on {date}
            </p>
          </div>
  
          <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">
            {status}
          </span>
        </div>
      </div>
    );
  }
  
  export default OrderDetailsHeader;