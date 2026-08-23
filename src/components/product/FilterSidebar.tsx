import { Check, Star } from "lucide-react";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onCategoryChange: (category: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onRatingChange: (value: number) => void;
  onStockChange: (value: boolean) => void;
  onReset: () => void;
}

function FilterSidebar({
  selectedCategory,
  categories,
  minPrice,
  maxPrice,
  minRating,
  inStockOnly,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onRatingChange,
  onStockChange,
  onReset,
}: FilterSidebarProps) {
  const ratingOptions = [0, 1, 2, 3, 4, 4.5];

  return (
    <aside className="w-52 flex-shrink-0">
      <div className="rounded-2xl border border-black/5 bg-white p-5">
        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
            Filters
          </h3>

          <button
            type="button"
            onClick={onReset}
            className="text-xs font-bold text-[#0057FF] hover:underline"
          >
            Reset
          </button>
        </div>

        {/* CATEGORY */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
            Category
          </p>

          <div className="space-y-0.5">
            {categories.map((category) => {
              const isActive =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    onCategoryChange(category)
                  }
                  className={`w-full rounded-lg px-2.5 py-1.5 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#0057FF]/10 text-[#0057FF]"
                      : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                  }`}
                >
                  {category === "All"
                    ? "All Products"
                    : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRICE RANGE */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
            Price Range
          </p>

          <div className="flex items-center gap-2">
            {/* MIN PRICE */}
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                $
              </span>

              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(event) =>
                  onMinPriceChange(
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-lg bg-[#E8E8ED] py-1.5 pl-5 pr-1 text-xs outline-none"
              />
            </div>

            <span className="text-xs text-gray-400">
              –
            </span>

            {/* MAX PRICE */}
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                $
              </span>

              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(event) =>
                  onMaxPriceChange(
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-lg bg-[#E8E8ED] py-1.5 pl-5 pr-1 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* MIN RATING */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
            Min. Rating
          </p>

          <div className="space-y-1">
            {ratingOptions.map((rating) => {
              const isActive =
                minRating === rating;

              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() =>
                    onRatingChange(rating)
                  }
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors ${
                    isActive
                      ? "bg-[#0057FF]/10"
                      : "hover:bg-[#F5F5F7]"
                  }`}
                >
                  {/* CHECKBOX */}
                  <div
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 ${
                      isActive
                        ? "border-[#0057FF] bg-[#0057FF]"
                        : "border-gray-200"
                    }`}
                  >
                    {isActive && (
                      <Check
                        size={9}
                        strokeWidth={3}
                        className="text-white"
                      />
                    )}
                  </div>

                  {rating === 0 ? (
                    <span className="text-sm text-[#1D1D1F]">
                      Any
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={11}
                              className={
                                star <= rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }
                            />
                          )
                        )}
                      </div>

                      <span className="text-xs text-gray-400">
                        & up
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
            Availability
          </p>

          <button
            type="button"
            onClick={() =>
              onStockChange(!inStockOnly)
            }
            className="flex w-full items-center gap-2.5 py-1"
          >
            <div
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 ${
                inStockOnly
                  ? "border-[#0057FF] bg-[#0057FF]"
                  : "border-gray-200"
              }`}
            >
              {inStockOnly && (
                <Check
                  size={9}
                  strokeWidth={3}
                  className="text-white"
                />
              )}
            </div>

            <span className="text-sm font-medium">
              In Stock Only
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;