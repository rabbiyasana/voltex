import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { clearCart } from "../../features/cart/cartSlice";

interface CheckoutFormState {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] =
    useState<CheckoutFormState>({
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.postalCode
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    setError("");

    dispatch(clearCart());
    
    alert("Order placed successfully!");
    
    navigate("/products");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6"
    >
      <h2 className="mb-5 text-lg font-extrabold text-[#1D1D1F]">
        Shipping Information
      </h2>

      <div className="space-y-4">
        {/* FULL NAME */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-semibold"
          >
            Full Name
          </label>

          <input
            id="fullName"
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#0057FF]"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#0057FF]"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label
            htmlFor="address"
            className="mb-1.5 block text-sm font-semibold"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street address"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#0057FF]"
          />
        </div>

        {/* CITY + POSTAL CODE */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="city"
              className="mb-1.5 block text-sm font-semibold"
            >
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#0057FF]"
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="mb-1.5 block text-sm font-semibold"
            >
              Postal Code
            </label>

            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Postal code"
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#0057FF]"
            />
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-sm font-semibold text-red-500">
          {error}
        </p>
      )}

      {/* PLACE ORDER */}
      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-[#0057FF] py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#0046CC]"
      >
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;