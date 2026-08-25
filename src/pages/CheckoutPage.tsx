import { useState } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import type {
    AppDispatch,
    RootState,
} from "../app/store";

import { clearCart } from "../slices/cartSlice";

import { addOrder } from "../slices/orderSlice";

import CheckoutProgress from "../components/checkout/CheckoutProgress";

import ContactStep from "../components/checkout/ContactStep";

import ShippingStep from "../components/checkout/ShippingStep";

import PaymentStep from "../components/checkout/PaymentStep";

import CheckoutSummary from "../components/checkout/CheckoutSummary";

import OrderConfirmation from "../components/checkout/OrderConfirmation";

import type { Product } from "../types/productType";

interface OrderItem {
    product: Product;
    quantity: number;
}

interface ContactData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface ShippingData {
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;

    deliveryMethod:
    | "standard"
    | "express"
    | "overnight";
}

function CheckoutPage() {
    const dispatch =
        useDispatch<AppDispatch>();

    const cartItems = useSelector(
        (state: RootState) =>
            state.cart.items
    );

    const [step, setStep] =
        useState(1);

    const [
        completedOrder,
        setCompletedOrder,
    ] = useState<OrderItem[]>([]);

    const [
        completedTotal,
        setCompletedTotal,
    ] = useState(0);

    const [
        orderNumber,
        setOrderNumber,
    ] = useState("");

    const [
        shipping,
        setShipping,
    ] = useState(0);

    // CONTACT INFORMATION
    const [
        contactData,
        setContactData,
    ] = useState<ContactData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    // SHIPPING INFORMATION
    const [
        shippingData,
        setShippingData,
    ] = useState<ShippingData>({
        address: "",
        apartment: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        deliveryMethod:
            "standard",
    });

    const subtotal =
        cartItems.reduce(
            (total, item) =>
                total +
                item.product.price *
                item.quantity,
            0
        );

    const total =
        subtotal + shipping;

    const handlePlaceOrder = () => {
        const newOrderNumber =
            `VTX-${Math.floor(
                100000 +
                Math.random() *
                900000
            )}`;

        const newOrder = {
            id: newOrderNumber,

            date: new Date()
                .toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }
                ),

            status: "Processing",

            items: cartItems,

            contact: {
                email:
                    contactData.email,
                phone:
                    contactData.phone,
            },

            shippingAddress: {
                firstName:
                    contactData.firstName,

                lastName:
                    contactData.lastName,

                address:
                    shippingData.address,

                city:
                    shippingData.city,

                state:
                    shippingData.state,

                postalCode:
                    shippingData.postalCode,

                country:
                    shippingData.country,
                apartment:
                    shippingData.apartment
            },

            subtotal,

            shipping,

            total,
        };

        dispatch(
            addOrder(newOrder)
        );

        setCompletedOrder(
            cartItems
        );

        setCompletedTotal(
            total
        );

        setOrderNumber(
            newOrderNumber
        );

        dispatch(
            clearCart()
        );

        setStep(4);
    };

    if (
        cartItems.length === 0 &&
        step !== 4
    ) {
        return (
            <main className="min-h-screen bg-[#F5F5F7]">
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
                    <div className="rounded-2xl bg-white p-10 text-center">
                        <h1 className="text-xl font-extrabold text-[#1D1D1F]">
                            Your cart is empty
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Add some products
                            before checking out.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                {/* STEPS 1 - 3 */}

                {step !== 4 && (
                    <>
                        {/* CHECKOUT HEADER */}

                        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-extrabold text-[#1D1D1F]">
                                    Checkout
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Complete your order
                                    in a few simple
                                    steps.
                                </p>
                            </div>

                            <CheckoutProgress
                                step={step}
                            />
                        </div>

                        {/* MAIN CHECKOUT LAYOUT */}

                        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                            {/* LEFT SIDE */}

                            <div>
                                {step === 1 && (
                                    <ContactStep
                                        onNext={(
                                            data
                                        ) => {
                                            setContactData(
                                                data
                                            );

                                            setStep(2);
                                        }}
                                    />
                                )}

                                {step === 2 && (
                                    <ShippingStep
                                        onBack={() =>
                                            setStep(1)
                                        }
                                        onNext={(
                                            data
                                        ) => {
                                            setShippingData(
                                                data
                                            );

                                            setStep(3);
                                        }}
                                        onShippingChange={
                                            setShipping
                                        }
                                    />
                                )}

                                {step === 3 && (
                                    <PaymentStep
                                        onBack={() =>
                                            setStep(2)
                                        }
                                        onPlaceOrder={
                                            handlePlaceOrder
                                        }
                                    />
                                )}
                            </div>

                            {/* RIGHT SIDE */}

                            <CheckoutSummary
                                cartItems={
                                    cartItems
                                }
                                subtotal={
                                    subtotal
                                }
                                shipping={
                                    shipping
                                }
                                total={total}
                            />
                        </div>
                    </>
                )}

                {/* STEP 4 */}

                {step === 4 && (
                    <OrderConfirmation
                        orderItems={
                            completedOrder
                        }
                        total={
                            completedTotal
                        }
                        orderNumber={
                            orderNumber
                        }
                    />
                )}
            </div>
        </main>
    );
}

export default CheckoutPage;