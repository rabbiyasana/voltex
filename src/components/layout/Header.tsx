import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Zap,
} from "lucide-react";

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

function Header({
  searchTerm = "",
  onSearchChange,
  selectedCategory = "All",
  onCategoryChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const categories = [
    "All",
    "Audio",
    "Laptops",
    "Wearables",
    "Cameras",
    "TVs",
    "Gaming",
  ];
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const navigate = useNavigate();
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    navigate("/products");
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
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="desktop-user flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-[#E8E8ED] hover:text-[#1D1D1F]"
              aria-label="Login"
            >
              <User size={17} />
            </button>
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
          {categories.map((category) => {
            const isActive =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {handleCategoryClick(category);}}
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
          </div>
        )}
      </div>
    </header>
  );
}
export default Header