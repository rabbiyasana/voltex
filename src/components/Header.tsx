import { Search, ShoppingCart, User, Zap } from "lucide-react";

function Header() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="header-container">

        {/* TOP ROW */}
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <Zap
              size={20}
              className="fill-[#0057FF] text-[#0057FF]"
            />

            <span className="text-xl font-extrabold tracking-tight">
              Voltex
            </span>
          </div>

          {/* Search */}
          <div className="desktop-search relative max-w-md flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products, brands..."
              className="w-full rounded-xl bg-[#E8E8ED] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#0057FF]/30"
            />
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-1">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-[#E8E8ED]">
              <User size={17} />
            </button>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-[#E8E8ED]">
              <ShoppingCart size={17} />

              <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#0057FF] px-1 text-[10px] font-extrabold text-white">
                2
              </span>
            </button>
          </div>
        </div>

        {/* SECOND ROW - Categories */}
        <div className="flex h-12 items-center gap-2">
          <button className="rounded-xl bg-[#0057FF]/10 px-4 py-2 text-sm font-semibold text-[#0057FF]">
            All
          </button>

          {[
            "Audio",
            "Laptops",
            "Wearables",
            "Cameras",
            "TVs",
            "Gaming",
          ].map((category) => (
            <button
              key={category}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-[#E8E8ED] hover:text-[#1D1D1F]"
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
}

export default Header;