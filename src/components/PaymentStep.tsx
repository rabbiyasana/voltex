import { useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
} from "lucide-react";

interface PaymentStepProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

type PaymentMethod =
  | "card"
  | "paypal"
  | "apple";

interface PaymentFormState {
  method: PaymentMethod;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
}

function PaymentStep({
  onBack,
  onPlaceOrder,
}: PaymentStepProps) {
  const [form, setForm] =
    useState<PaymentFormState>({
      method: "card",
      cardNumber: "",
      expiry: "",
      cvv: "",
      cardholderName: "",
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

  const handlePlaceOrder = () => {
    if (
      form.method === "card" &&
      (
        !form.cardNumber ||
        !form.expiry ||
        !form.cvv ||
        !form.cardholderName
      )
    ) {
      setError(
        "Please enter all card details."
      );
      return;
    }

    setError("");
    onPlaceOrder();
  };

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="text-xl font-extrabold text-[#1D1D1F]">
        Payment Method
      </h2>

      <div className="mt-6 space-y-4">
        {/* CREDIT CARD */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
            form.method === "card"
              ? "border-[#0057FF] bg-[#0057FF]/5"
              : "border-black/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="method"
              value="card"
              checked={form.method === "card"}
              onChange={handleChange}
              className="accent-[#0057FF]"
            />

            <div>
              <p className="text-sm font-bold text-[#1D1D1F]">
                Credit / Debit Card
              </p>

              <p className="text-xs text-gray-400">
                Visa, Mastercard, Amex
              </p>
            </div>
          </div>
        </label>

        {/* PAYPAL */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
            form.method === "paypal"
              ? "border-[#0057FF] bg-[#0057FF]/5"
              : "border-black/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="method"
              value="paypal"
              checked={form.method === "paypal"}
              onChange={handleChange}
              className="accent-[#0057FF]"
            />

            <p className="text-sm font-bold text-[#1D1D1F]">
              PayPal
            </p>
          </div>
        </label>

        {/* APPLE PAY */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
            form.method === "apple"
              ? "border-[#0057FF] bg-[#0057FF]/5"
              : "border-black/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="method"
              value="apple"
              checked={form.method === "apple"}
              onChange={handleChange}
              className="accent-[#0057FF]"
            />

            <p className="text-sm font-bold text-[#1D1D1F]">
              Apple Pay
            </p>
          </div>
        </label>
      </div>

      {/* CARD FORM */}
      {form.method === "card" && (
        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="cardNumber"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Card Number
            </label>

            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="expiry"
                className="mb-2 block text-xs font-bold uppercase text-gray-500"
              >
                Expiry Date
              </label>

              <input
                id="expiry"
                name="expiry"
                type="text"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
              />
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="mb-2 block text-xs font-bold uppercase text-gray-500"
              >
                CVV
              </label>

              <input
                id="cvv"
                name="cvv"
                type="text"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cardholderName"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Cardholder Name
            </label>

            <input
              id="cardholderName"
              name="cardholderName"
              type="text"
              value={form.cardholderName}
              onChange={handleChange}
              placeholder="Alex Morgan"
              className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
            />
          </div>
        </div>
      )}

      {/* SECURITY */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F5F5F7] p-4">
        <LockKeyhole
          size={18}
          className="mt-0.5 flex-shrink-0 text-[#0057FF]"
        />

        <div>
          <p className="text-sm font-bold text-[#1D1D1F]">
            Secure Payment
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Your payment information is encrypted
            and securely processed.
          </p>
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
          onClick={handlePlaceOrder}
          className="rounded-xl bg-[#0057FF] px-6 py-2.5 text-sm font-extrabold text-white hover:bg-[#0046CC]"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}

export default PaymentStep;