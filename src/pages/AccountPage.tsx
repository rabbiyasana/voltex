import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

import AccountHeader from "../components/account/AccountHeader";
import AccountInfo from "../components/account/AccountInfo";

function AccountPage() {
  const {
    user,
    isAuthenticated,
  } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-[#F5F5F7] px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-[#1D1D1F]">
            Please sign in
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            You need to be logged in to view your account.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <AccountHeader
            firstName={user.firstName}
            lastName={user.lastName}
            image={user.image}
          />

          <AccountInfo
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            username={user.username}
          />
        </div>
      </div>
    </main>
  );
}

export default AccountPage;