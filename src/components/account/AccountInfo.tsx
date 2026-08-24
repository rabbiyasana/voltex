import { AtSign, Mail } from "lucide-react";

interface AccountInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

function AccountInfo({
  firstName,
  lastName,
  email,
  username,
}: AccountInfoProps) {
  return (
    <div className="mt-8 border-t border-black/10 pt-6">
      <h2 className="text-lg font-extrabold text-[#1D1D1F]">
        Account Information
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#F5F5F7] p-4">
          <p className="text-xs font-bold uppercase text-gray-400">
            First Name
          </p>

          <p className="mt-1 font-semibold text-[#1D1D1F]">
            {firstName}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F5F5F7] p-4">
          <p className="text-xs font-bold uppercase text-gray-400">
            Last Name
          </p>

          <p className="mt-1 font-semibold text-[#1D1D1F]">
            {lastName}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F5F5F7] p-4">
          <div className="flex items-center gap-2">
            <Mail
              size={15}
              className="text-gray-400"
            />

            <p className="text-xs font-bold uppercase text-gray-400">
              Email
            </p>
          </div>

          <p className="mt-1 font-semibold text-[#1D1D1F]">
            {email}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F5F5F7] p-4">
          <div className="flex items-center gap-2">
            <AtSign
              size={15}
              className="text-gray-400"
            />

            <p className="text-xs font-bold uppercase text-gray-400">
              Username
            </p>
          </div>

          <p className="mt-1 font-semibold text-[#1D1D1F]">
            {username}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;