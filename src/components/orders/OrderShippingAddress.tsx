import { MapPin } from "lucide-react";

interface OrderShippingAddressProps {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

function OrderShippingAddress({
  firstName,
  lastName,
  address,
  apartment,
  city,
  state,
  postalCode,
  country,
}: OrderShippingAddressProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <MapPin
          size={18}
          className="text-[#0057FF]"
        />

        <h2 className="text-lg font-extrabold text-[#1D1D1F]">
          Shipping Address
        </h2>
      </div>

      <div className="mt-5 text-sm leading-6 text-gray-600">
        <p className="font-bold text-[#1D1D1F]">
          {firstName} {lastName}
        </p>

        <p>{address}</p>

        {apartment && (
          <p>{apartment}</p>
        )}

        <p>
          {city}, {state} {postalCode}
        </p>

        <p>{country}</p>
      </div>
    </div>
  );
}

export default OrderShippingAddress;