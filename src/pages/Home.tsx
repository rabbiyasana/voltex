import { useState } from "react";
import { products } from "../features/products/productsData";

import { Check, Search, SlidersHorizontal, } from "lucide-react";

import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../features/products/ProductCard";
import HeroBanner from "../components/HeroBanner";
import LoadingSkeleton from "../components/LoadingSkeleton";


interface HomePageProps {
    searchTerm: string;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

function HomePage({
    searchTerm,
    selectedCategory,
    onCategoryChange,
}: HomePageProps) {
    const [sortBy, setSortBy] = useState("popular");

    const [loading] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const handleReset = () => {
        setMinPrice(0);
        setMaxPrice(2000);
        setMinRating(0);
        setInStockOnly(false);
        onCategoryChange("All");
    };
    // STEP 1:
    // Filter products based on search, category and price
    const filteredProducts = products.filter((product) => {
        const value = searchTerm.trim().toLowerCase();

        const searchableText = `
          ${product.name}
          ${product.brand}
          ${product.category}
          ${product.shortDescription}
        `.toLowerCase();

        const matchesSearch =
            value === "" || searchableText.includes(value);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase();

        const matchesPrice =
            product.price >= minPrice &&
            product.price <= maxPrice;

        const matchesRating =
            product.rating >= minRating;

        const matchesStock =
            !inStockOnly || product.inStock;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice &&
            matchesRating &&
            matchesStock
        );
    });

    // STEP 2:
    // Sort only the products that passed the filters
    const sortedProducts = [...filteredProducts].sort(
        (a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price;

                case "price-desc":
                    return b.price - a.price;

                case "rating":
                    return b.rating - a.rating;

                case "popular":
                default:
                    return b.reviewCount - a.reviewCount;
            }
        }
    );

    return (
        <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* PAGE HEADING */}
                <div className="mb-6">
                    <HeroBanner />
                    <h1 className="text-2xl font-extrabold text-[#1D1D1F]">
                        Explore Products
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Discover the latest tech and accessories.
                    </p>
                </div>

                {/* SIDEBAR + PRODUCTS */}
                <div className="flex gap-6">
                    {/* FILTER SIDEBAR */}
                    <div className="desktop-filter-sidebar">
                        <FilterSidebar
                            selectedCategory={selectedCategory}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            minRating={minRating}
                            inStockOnly={inStockOnly}
                            onCategoryChange={onCategoryChange}
                            onMinPriceChange={setMinPrice}
                            onMaxPriceChange={setMaxPrice}
                            onRatingChange={setMinRating} onStockChange={setInStockOnly}
                            onReset={handleReset}
                        />
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="min-w-0 flex-1">
                        {/* PRODUCT COUNT + SORT */}
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-[#1D1D1F]">
                                    {sortedProducts.length}
                                </span>{" "}
                                {sortedProducts.length === 1
                                    ? "product"
                                    : "products"}

                                {selectedCategory !== "All" &&
                                    ` in ${selectedCategory}`}
                            </p>

                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value)
                                }
                                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0057FF]/20"
                            >
                                <option value="popular">
                                    Most Popular
                                </option>

                                <option value="price-asc">
                                    Price: Low to High
                                </option>

                                <option value="price-desc">
                                    Price: High to Low
                                </option>

                                <option value="rating">
                                    Highest Rated
                                </option>
                            </select>
                        </div>
                        {/* mobile filters */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowMobileFilters((current) => !current)
                            }
                            className="mobile-filter-button mb-4 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold"
                        >
                            <SlidersHorizontal size={14} />
                            Filters
                        </button>
                        {showMobileFilters && (
                            <div className="mobile-filter-panel mb-5 rounded-2xl border border-black/10 bg-white p-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    {/* CATEGORY */}
                                    <div>
                                        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
                                            Category
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {[
                                                "All",
                                                "Audio",
                                                "Laptops",
                                                "Wearables",
                                                "Cameras",
                                                "TVs",
                                                "Gaming",
                                            ].map((category) => {
                                                const isActive =
                                                    selectedCategory === category;

                                                return (
                                                    <button
                                                        key={category}
                                                        type="button"
                                                        onClick={() =>
                                                            onCategoryChange(category)
                                                        }
                                                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${isActive
                                                            ? "bg-[#0057FF] text-white"
                                                            : "bg-[#F5F5F7] text-gray-500"
                                                            }`}
                                                    >
                                                        {category}
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
                                                setInStockOnly(!inStockOnly)
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <div
                                                className={`flex h-4 w-4 items-center justify-center rounded border-2 ${inStockOnly
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

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="mt-4 text-xs font-bold text-[#0057FF] hover:underline"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        )}

                        {/* PRODUCTS */}
                        {loading ? (
                            // LOADING STATE
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <LoadingSkeleton key={index} />
                                ))}
                            </div>
                        ) : sortedProducts.length === 0 ? (
                            // EMPTY STATE
                            <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                                    <Search
                                        size={26}
                                        className="text-gray-400"
                                    />
                                </div>

                                <h2 className="text-lg font-extrabold text-[#1D1D1F]">
                                    No products found
                                </h2>

                                <p className="mt-2 max-w-sm text-sm text-gray-500">
                                    Try adjusting your filters or search terms.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="mt-5 rounded-xl bg-[#0057FF] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            // PRODUCTS
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        )}Ï
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;