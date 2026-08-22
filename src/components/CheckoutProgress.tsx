import { Check } from "lucide-react";

interface CheckoutProgressProps {
  step: number;
}

const steps = [
  { number: 1, label: "Contact" },
  { number: 2, label: "Shipping" },
  { number: 3, label: "Payment" },
];

function CheckoutProgress({
  step,
}: CheckoutProgressProps) {
  return (
    <div className="flex items-center gap-3">
      {steps.map((item, index) => {
        const isCompleted = step > item.number;
        const isActive = step === item.number;

        return (
          <div
            key={item.number}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  isCompleted
                    ? "bg-emerald-500 text-white"
                    : isActive
                      ? "bg-[#0057FF] text-white"
                      : "bg-[#E8E8ED] text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <Check size={15} strokeWidth={3} />
                ) : (
                  item.number
                )}
              </div>

              <span
                className={`text-sm font-semibold ${
                  isActive
                    ? "text-[#1D1D1F]"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <span className="text-gray-300">
                ›
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutProgress;