import ProductCard from "../features/products/ProductCard";
import { products } from "../features/products/productsData";

interface HomePageProps {
  searchTerm: string;
  selectedCategory: string;
}

function HomePage({
    searchTerm,
    selectedCategory,
  }: HomePageProps) {
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
          product.category.toLowerCase() === selectedCategory.toLowerCase();
      
        return matchesSearch && matchesCategory;
      });
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#1D1D1F]">
            Explore Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover the latest tech and accessories.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center">
            <h2 className="text-lg font-bold text-[#1D1D1F]">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with a different product, brand, or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;