import { useSelector } from "react-redux";
import { useNavigate, useParams, } from "react-router-dom";
import type { RootState } from "../app/store";
import OrderItems from "../components/orders/OrderItems";
import OrderDetailsHeader from "../components/orders/OrderDetailsHeader";
import OrderDetailsSummary from "../components/orders/OrderDetailsSummary";
import OrderContactDetails from "../components/orders/OrderContactDetails";
import OrderShippingAddress from "../components/orders/OrderShippingAddress";

function OrderDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const order = useSelector(
        (state: RootState) =>
            state.orders.items.find(
                (order) => order.id === id
            )
    );

    if (!order) {
        return (
            <main className="min-h-screen bg-[#F5F5F7] px-4 py-10 sm:px-6">
                <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center">
                    <h1 className="text-xl font-extrabold text-[#1D1D1F]">
                        Order not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        We couldn't find the order you're looking for.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/account/orders")
                        }
                        className="mt-5 rounded-xl bg-[#0057FF] px-5 py-2.5 text-sm font-bold text-white"
                    >
                        Back to My Orders
                    </button>
                </div>
            </main>
        );
    }

    const orderItems = order.items.map(
        (item) => ({
            id: item.product.id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
        })
    );

    return (
        <main className="min-h-screen bg-[#F5F5F7] px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-4xl space-y-5">
                <OrderDetailsHeader
                    orderId={order.id}
                    date={order.date}
                    status={order.status}
                />

                <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                    <OrderItems
                        items={orderItems}
                    />

                    <OrderDetailsSummary
                        subtotal={order.subtotal}
                        shipping={order.shipping}
                        total={order.total}
                    />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    <OrderContactDetails
                        email={order.contact.email}
                        phone={order.contact.phone}
                    />

                    <OrderShippingAddress
                        firstName={order.shippingAddress.firstName}
                        lastName={order.shippingAddress.lastName}
                        address={order.shippingAddress.address}
                        apartment={order.shippingAddress.apartment}
                        city={order.shippingAddress.city}
                        state={order.shippingAddress.state}
                        postalCode={order.shippingAddress.postalCode}
                        country={order.shippingAddress.country}
                    />
                </div>
            </div>
        </main>
    );
}

export default OrderDetailsPage;