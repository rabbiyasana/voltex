import { Mail, Phone } from "lucide-react";

interface OrderContactDetailsProps {
  email: string;
  phone: string;
}

function OrderContactDetails({
  email,
  phone,
}: OrderContactDetailsProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-[#1D1D1F]">
        Contact Details
      </h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F5F7]">
            <Mail
              size={16}
              className="text-gray-500"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase text-gray-400">
              Email
            </p>

            <p className="mt-1 text-sm font-semibold text-[#1D1D1F]">
              {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F5F7]">
            <Phone
              size={16}
              className="text-gray-500"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase text-gray-400">
              Phone
            </p>

            <p className="mt-1 text-sm font-semibold text-[#1D1D1F]">
              {phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderContactDetails;