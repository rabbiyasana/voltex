import OrderCard from "./OrderCard";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

interface OrderListProps {
  orders: Order[];
}

function OrderList({
  orders,
}: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-16 text-center">
        <h2 className="text-lg font-extrabold text-[#1D1D1F]">
          No orders yet
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Your completed orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          id={order.id}
          date={order.date}
          status={order.status}
          total={order.total}
          itemCount={order.itemCount}
        />
      ))}
    </div>
  );
}

export default OrderList;