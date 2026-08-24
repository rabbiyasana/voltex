import OrderList from "../components/orders/OrderList";

const orders = [
  {
    id: "VTX-845219",
    date: "August 24, 2026",
    status: "Delivered",
    total: 129.98,
    itemCount: 2,
  },
  {
    id: "VTX-731804",
    date: "August 18, 2026",
    status: "Processing",
    total: 89.99,
    itemCount: 1,
  },
];

function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#1D1D1F]">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and track your previous orders.
          </p>
        </div>

        <OrderList
          orders={orders}
        />
      </div>
    </main>
  );
}

export default OrdersPage;