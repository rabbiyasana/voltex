import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<LoginFormState>({
      email: "",
      password: "",
      rememberMe: false,
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    setError("");

    navigate("/products");
  };

  return (
    <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#F5F5F7] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0057FF]/10">
            <LockKeyhole
              size={22}
              className="text-[#0057FF]"
            />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-[#1D1D1F]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your Voltex account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold uppercase text-gray-500"
            >
              Email Address
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
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
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
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                className="text-gray-400 hover:text-[#1D1D1F]"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 accent-[#0057FF]"
              />

              Remember me
            </label>

            <button
              type="button"
              className="text-sm font-semibold text-[#0057FF]"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0057FF] py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#0046CC]"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;