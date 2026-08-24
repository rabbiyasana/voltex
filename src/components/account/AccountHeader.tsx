import { User } from "lucide-react";

interface AccountHeaderProps {
  firstName: string;
  lastName: string;
  image?: string;
}
function AccountHeader({firstName,lastName,}: AccountHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      {/* {image ? (
        <img
          src={image}
          alt={firstName}
          className="h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0057FF]/10">
          <User
            size={30}
            className="text-[#0057FF]"
          />
        </div>
      )} */}

      <div>
        <h1 className="text-2xl font-extrabold text-[#1D1D1F]">
          {firstName} {lastName}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account information.
        </p>
      </div>
    </div>
  );
}

export default AccountHeader;