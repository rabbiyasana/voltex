import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface ShippingData {
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

interface ShippingStepProps {
    onBack: () => void;

    onNext: (
        data: ShippingData
    ) => void;

    onShippingChange: (
        price: number
    ) => void;
}


function ShippingStep({
    onBack,
    onNext,
    onShippingChange,
}: ShippingStepProps) {
    const [form, setForm] =
        useState<ShippingData>({
            address: "",
            apartment: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            deliveryMethod:
                "standard",
        });

    const [error, setError] = useState("");

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleContinue = () => {
        if (
            !form.address.trim() ||
            !form.city.trim() ||
            !form.state.trim() ||
            !form.postalCode.trim() ||
            !form.country.trim()
        ) {
            setError(
                "Please fill in all required shipping fields."
            );

            return;
        }

        setError("");

        onNext({
            address:
                form.address.trim(),

            apartment:
                form.apartment.trim(),

            city:
                form.city.trim(),

            state:
                form.state.trim(),

            postalCode:
                form.postalCode.trim(),

            country:
                form.country,

            deliveryMethod:
                form.deliveryMethod,
        });
    };
    const handleDeliveryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setForm((current) => ({
            ...current,
            deliveryMethod:
                value as ShippingData["deliveryMethod"],
        }));

        if (value === "standard") {
            onShippingChange(0);
        }

        if (value === "express") {
            onShippingChange(19.99);
        }

        if (value === "overnight") {
            onShippingChange(39.99);
        }
    };
    return (
        <section className="rounded-2xl bg-white p-6">
            <h2 className="text-xl font-extrabold text-[#1D1D1F]">
                Shipping Address
            </h2>

            <div className="mt-6 space-y-5">
                {/* ADDRESS */}
                <div>
                    <label
                        htmlFor="address"
                        className="mb-2 block text-xs font-bold uppercase text-gray-500"
                    >
                        Street Address
                    </label>

                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="123 Market Street"
                        className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
                    />
                </div>

                {/* APARTMENT */}
                <div>
                    <label
                        htmlFor="apartment"
                        className="mb-2 block text-xs font-bold uppercase text-gray-500"
                    >
                        Apartment / Suite
                    </label>

                    <input
                        id="apartment"
                        name="apartment"
                        type="text"
                        value={form.apartment}
                        onChange={handleChange}
                        placeholder="Apartment, suite, unit, etc."
                        className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
                    />
                </div>

                {/* CITY + STATE */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="city"
                            className="mb-2 block text-xs font-bold uppercase text-gray-500"
                        >
                            City
                        </label>

                        <input
                            id="city"
                            name="city"
                            type="text"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="San Francisco"
                            className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="state"
                            className="mb-2 block text-xs font-bold uppercase text-gray-500"
                        >
                            State / Province
                        </label>

                        <input
                            id="state"
                            name="state"
                            type="text"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="California"
                            className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
                        />
                    </div>
                </div>

                {/* POSTAL + COUNTRY */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="postalCode"
                            className="mb-2 block text-xs font-bold uppercase text-gray-500"
                        >
                            ZIP / Postal Code
                        </label>

                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            value={form.postalCode}
                            onChange={handleChange}
                            placeholder="94105"
                            className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="country"
                            className="mb-2 block text-xs font-bold uppercase text-gray-500"
                        >
                            Country
                        </label>

                        <select
                            id="country"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
                        >
                            <option value="">
                                Select country
                            </option>
                            <option value="US">
                                United States
                            </option>
                            <option value="CA">
                                Canada
                            </option>
                            <option value="GB">
                                United Kingdom
                            </option>
                            <option value="PK">
                                Pakistan
                            </option>
                        </select>
                    </div>
                </div>

                {/* DELIVERY METHOD */}
                <div>
                    <p className="mb-3 text-xs font-bold uppercase text-gray-500">
                        Delivery Method
                    </p>

                    <div className="space-y-3">
                        <label
                            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${form.deliveryMethod === "standard"
                                ? "border-[#0057FF] bg-[#0057FF]/5"
                                : "border-black/10"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="deliveryMethod"
                                    value="standard"
                                    checked={
                                        form.deliveryMethod ===
                                        "standard"
                                    }
                                    onChange={handleDeliveryChange}
                                    className="accent-[#0057FF]"
                                />

                                <div>
                                    <p className="text-sm font-bold">
                                        Standard Shipping
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        5–7 business days
                                    </p>
                                </div>
                            </div>

                            <span className="text-sm font-bold text-emerald-600">
                                Free
                            </span>
                        </label>

                        <label
                            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${form.deliveryMethod === "express"
                                ? "border-[#0057FF] bg-[#0057FF]/5"
                                : "border-black/10"
                                }`}
                        >                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="deliveryMethod"
                                    value="express"
                                    checked={
                                        form.deliveryMethod ===
                                        "express"
                                    }
                                    onChange={handleDeliveryChange}
                                    className="accent-[#0057FF]"
                                />

                                <div>
                                    <p className="text-sm font-bold">
                                        Express Shipping
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        2–3 business days
                                    </p>
                                </div>
                            </div>

                            <span className="text-sm font-bold">
                                $19.99
                            </span>
                        </label>

                        <label
                            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${form.deliveryMethod === "overnight"
                                ? "border-[#0057FF] bg-[#0057FF]/5"
                                : "border-black/10"
                                }`}
                        >                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="deliveryMethod"
                                    value="overnight"
                                    checked={
                                        form.deliveryMethod ===
                                        "overnight"
                                    }
                                    onChange={handleDeliveryChange}
                                    className="accent-[#0057FF]"
                                />

                                <div>
                                    <p className="text-sm font-bold">
                                        Overnight
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Next business day
                                    </p>
                                </div>
                            </div>

                            <span className="text-sm font-bold">
                                $39.99
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {error && (
                <p className="mt-4 text-sm font-semibold text-red-500">
                    {error}
                </p>
            )}

            {/* FOOTER */}
            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 rounded-xl border border-black/10 px-5 py-2.5 text-sm font-bold"
                >
                    <ArrowLeft size={15} />
                    Back
                </button>

                <button
                    type="button"
                    onClick={handleContinue}
                    className="flex items-center gap-2 rounded-xl bg-[#0057FF] px-6 py-2.5 text-sm font-extrabold text-white hover:bg-[#0046CC]"
                >
                    Continue
                    <ArrowRight size={15} />
                </button>
            </div>
        </section>
    );
}

export default ShippingStep;