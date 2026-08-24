import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,  useSelector, } from "react-redux";
import type { AppDispatch, RootState, } from "../../app/store";
import { logout } from "../../slices/authSlice";
import { Search, ShoppingCart, User, Menu, Zap, } from "lucide-react";

interface HeaderProps {
  categories: string[];
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

function Header({
  categories,
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const desktopCategories = categories.slice(0, 6);
  const handleCategoryClick = (category: string) => {
    onCategoryChange?.(category);
    navigate("/products");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMobileMenuOpen(false);
  };
  return (

    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="header-container">
        {/* TOP ROW */}
        <div className="flex h-16 items-center gap-4">
          {/* LOGO */}
          <div className="flex items-center gap-1.5" onClick={() => navigate("/")}>
            <Zap
              size={20}
              className="fill-[#0057FF] text-[#0057FF]"
            />

            <span className="text-xl font-extrabold tracking-tight">
              Voltex
            </span>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="desktop-search relative max-w-md flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                onSearchChange?.(event.target.value)
              }
              placeholder="Search products, brands..."
              className="w-full rounded-xl bg-[#E8E8ED] py-2.5 pl-10 pr-4 text-sm outline-none"
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="ml-auto flex items-center gap-1">

            {/* CART */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-500"
            >
              <ShoppingCart size={17} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#0057FF] px-1 text-[10px] font-extrabold text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            {/* user login */}
            {isAuthenticated && user ? (
             <>
              <button
                type="button"
                onClick={() => navigate("/account")}
                className="desktop-user flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#1D1D1F] transition-colors hover:bg-[#E8E8ED]"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <User size={17} />
                )}

                <span>
                  {user.firstName}
                </span>
              </button>
              <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
             </>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="desktop-user flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-[#E8E8ED] hover:text-[#1D1D1F]"
                aria-label="Login"
              >
                <User size={17} />
              </button>
            )}
            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((current) => !current)

              }
              className="mobile-menu-button flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8E8ED]"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>

        {/* DESKTOP CATEGORY NAVIGATION */}
        <div className="desktop-category-nav h-12 items-center gap-2">
          {desktopCategories.map((category) => {
            const isActive =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => { handleCategoryClick(category); }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${isActive
                  ? "bg-[#0057FF]/10 text-[#0057FF]"
                  : "text-gray-500 hover:bg-[#E8E8ED] hover:text-[#1D1D1F]"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* MOBILE EXPANDED MENU */}
        {mobileMenuOpen && (
          <div className="mobile-menu-panel border-t border-black/10 py-3">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  onSearchChange?.(event.target.value)
                }
                placeholder="Search..."
                className="w-full rounded-xl bg-[#E8E8ED] py-2.5 pl-9 pr-4 text-sm outline-none"
              />
            </div>

            {/* CATEGORIES */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {categories.map((category) => {
                const isActive =
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      handleCategoryClick(category);
                      setMobileMenuOpen(false);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${isActive
                      ? "bg-[#0057FF] text-white"
                      : "bg-[#E8E8ED] text-gray-500"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={() => {
                  navigate("/account");
                  setMobileMenuOpen(false);
                }}
                className="mt-4 flex w-full items-center gap-3 rounded-xl border border-black/10 px-4 py-3 text-left text-sm font-bold text-[#1D1D1F]"
              >
                <User size={17} />

                {user.firstName} {user.lastName}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="mt-4 flex w-full items-center gap-3 rounded-xl border border-black/10 px-4 py-3 text-left text-sm font-bold text-[#1D1D1F]"
              >
                <User size={17} />

                Login
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
export default Header