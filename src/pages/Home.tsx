import { useState } from "react";
import ProductCard from "../features/products/ProductCard";
import { products } from "../features/products/productsData";
import FilterSidebar from "../components/FilterSidebar";

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

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);
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
                    <FilterSidebar
                        selectedCategory={selectedCategory}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        minRating={minRating}
                        inStockOnly={inStockOnly}
                        onCategoryChange={onCategoryChange}
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                        onRatingChange={setMinRating}                        onStockChange={setInStockOnly}
                        onReset={handleReset}
                    />

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

                        {/* PRODUCTS */}
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* EMPTY STATE */
                            <div className="rounded-2xl bg-white p-10 text-center">
                                <h2 className="text-lg font-bold text-[#1D1D1F]">
                                    No products found
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Try changing your search, category,
                                    or price range.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;