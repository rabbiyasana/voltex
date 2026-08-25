import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ContactStepProps {
  onNext: (data: ContactData) => void;
}

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subscribe: boolean;
}

function ContactStep({
  onNext,
}: ContactStepProps) {
  const [form, setForm] =
    useState<ContactFormState>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subscribe: true,
    });

  const [error, setError] =
    useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleContinue = () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    setError("");

    onNext({
      firstName:
        form.firstName.trim(),

      lastName:
        form.lastName.trim(),

      email:
        form.email.trim(),

      phone:
        form.phone.trim(),
    });
  };

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="text-xl font-extrabold text-[#1D1D1F]">
        Contact Information
      </h2>

      <div className="mt-6 space-y-5">
        {/* FIRST + LAST NAME */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              First Name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={
                handleChange
              }
              placeholder="Alex"
              className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Last Name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={
                handleChange
              }
              placeholder="Morgan"
              className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
            />
          </div>
        </div>

        {/* EMAIL */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-bold uppercase text-gray-500"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="alex.morgan@email.com"
            className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
          />
        </div>

        {/* PHONE */}

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-bold uppercase text-gray-500"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 012-3456"
            className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0057FF]/30"
          />
        </div>

        {/* SUBSCRIBE */}

        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-500">
          <input
            type="checkbox"
            name="subscribe"
            checked={
              form.subscribe
            }
            onChange={
              handleChange
            }
            className="h-4 w-4 accent-[#0057FF]"
          />

          <span>
            Subscribe for
            exclusive deals and
            updates
          </span>
        </label>
      </div>

      {error && (
        <p className="mt-4 text-sm font-semibold text-red-500">
          {error}
        </p>
      )}

      {/* FOOTER BUTTONS */}

      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#F1F1F5] px-5 py-2.5 text-sm font-bold text-gray-400"
        >
          <ArrowLeft
            size={15}
          />
          Back
        </button>

        <button
          type="button"
          onClick={
            handleContinue
          }
          className="flex items-center gap-2 rounded-xl bg-[#0057FF] px-6 py-2.5 text-sm font-extrabold text-white hover:bg-[#0046CC]"
        >
          Continue

          <ArrowRight
            size={15}
          />
        </button>
      </div>
    </section>
  );
}

export default ContactStep;