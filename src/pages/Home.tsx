import { useState } from "react";
import { products } from "../features/products/productsData";

import { Check, ChevronLeft, ChevronRight, ChevronDown, Search, SlidersHorizontal, } from "lucide-react";

import FilterSidebar from "../components/product/FilterSidebar";
import ProductCard from "../features/products/ProductCard";
import HeroBanner from "../components/product/HeroBanner";
import LoadingSkeleton from "../components/product/LoadingSkeleton";


interface HomePageProps {
    searchTerm: string;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    onSearchChange: (value: string) => void;
}

function HomePage({
    searchTerm,
    selectedCategory,
    onCategoryChange,
    onSearchChange,
}: HomePageProps) {
    const [sortBy, setSortBy] = useState("popular");

    const [loading] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const [page, setPage] = useState(1);
    const productsPerPage = 6;

    const handleReset = () => {
        setMinPrice(0);
        setMaxPrice(2000);
        setMinRating(0);
        setInStockOnly(false);
        setPage(1);

        onCategoryChange("All");
        onSearchChange("");
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
    const totalPages = Math.ceil(
        sortedProducts.length / productsPerPage
    );

    const startIndex = (page - 1) * productsPerPage;

    const paginatedProducts = sortedProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );
    return (
        <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

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
                        <HeroBanner />
                        {/* PRODUCT TOOLBAR */}
                        <div className="mb-5 flex items-center gap-3">
                            {/* MOBILE FILTER BUTTON */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowMobileFilters((current) => !current)
                                }
                                className="mobile-filter-button items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold"
                            >
                                <SlidersHorizontal size={14} />
                                Filters
                            </button>

                            {/* PRODUCT COUNT */}
                            <p className="whitespace-nowrap text-sm text-gray-500">
                                <span className="font-bold text-[#1D1D1F]">
                                    {sortedProducts.length}
                                </span>{" "}
                                {sortedProducts.length === 1
                                    ? "product"
                                    : "products"}

                                {selectedCategory !== "All" &&
                                    ` in ${selectedCategory}`}
                            </p>

                            {/* SORT */}
                            <div className="ml-auto flex min-w-0 items-center gap-2">
                                <span className="sort-label whitespace-nowrap text-sm text-gray-500">
                                    Sort:
                                </span>

                                <div className="relative min-w-0">
                                    <select
                                        value={sortBy}
                                        onChange={(event) => {
                                            setSortBy(event.target.value);
                                            setPage(1);
                                        }}
                                        className="max-w-[170px] appearance-none cursor-pointer rounded-xl border border-black/10 bg-white py-2 pl-3 pr-8 text-sm font-semibold outline-none focus:border-[#0057FF]"
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

                                    <ChevronDown
                                        size={13}
                                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* MOBILE FILTER PANEL */}
                        {showMobileFilters && (
                            <div className="mobile-filter-panel mb-5 rounded-2xl border border-black/10 bg-white p-5">
                                <div className="mobile-filter-grid">
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
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
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
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                                {paginatedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        )}

                        {/* PAGINATION */}
                        {!loading && totalPages > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((current) =>
                                            Math.max(1, current - 1)
                                        )
                                    }
                                    disabled={page === 1}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white transition-colors hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft size={15} />
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() =>
                                            setPage(pageNumber)
                                        }
                                        className={`h-9 w-9 rounded-xl text-sm font-bold transition-colors ${page === pageNumber
                                            ? "bg-[#0057FF] text-white"
                                            : "border border-black/10 bg-white text-[#1D1D1F] hover:bg-[#F5F5F7]"
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((current) =>
                                            Math.min(totalPages, current + 1)
                                        )
                                    }
                                    disabled={page === totalPages}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white transition-colors hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;