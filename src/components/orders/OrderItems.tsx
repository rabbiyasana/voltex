interface OrderItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }
  
  interface OrderItemsProps {
    items: OrderItem[];
  }
  
  function OrderItems({
    items,
  }: OrderItemsProps) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-[#1D1D1F]">
          Items
        </h2>
  
        <div className="mt-5 divide-y divide-black/5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-2xl bg-[#F5F5F7] object-contain"
              />
  
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#1D1D1F]">
                  {item.name}
                </p>
  
                <p className="mt-1 text-xs text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
  
              <p className="text-sm font-extrabold text-[#1D1D1F]">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default OrderItems;