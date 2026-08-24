import { useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole, User, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../app/store";
import { registerThunk } from "../slices/authSlice";

interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    registerLoading,
    registerError,
    registerSuccess,
  } = useSelector(
    (state: RootState) => state.auth
  );

  const [form, setForm] =
    useState<RegisterFormState>({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.username.trim() ||
      !form.password.trim()
    ) {
      return;
    }

    try {
      await dispatch(
        registerThunk(form)
      ).unwrap();
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    }
  }, [registerSuccess, navigate]);

  return (
    <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#F5F5F7] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0057FF]/10">
            <User
              size={22}
              className="text-[#0057FF]"
            />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-[#1D1D1F]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your Voltex account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
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
                onChange={handleChange}
                className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none"
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
                onChange={handleChange}
                className="w-full rounded-2xl bg-[#F1F1F5] px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Email
            </label>

            <div className="flex items-center rounded-2xl bg-[#F1F1F5] px-4">
              <Mail
                size={17}
                className="text-gray-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Username
            </label>

            <div className="flex items-center rounded-2xl bg-[#F1F1F5] px-4">
              <User
                size={17}
                className="text-gray-400"
              />

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Password
            </label>

            <div className="flex items-center rounded-2xl bg-[#F1F1F5] px-4">
              <LockKeyhole
                size={17}
                className="text-gray-400"
              />

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                className="text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {registerError && (
            <p className="text-sm font-semibold text-red-500">
              {registerError}
            </p>
          )}

          <button
            type="submit"
            disabled={registerLoading}
            className="w-full rounded-xl bg-[#0057FF] py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerLoading
              ? "Creating account..."
              : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="font-bold text-[#0057FF]"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;