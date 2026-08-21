import { products } from "../features/products/productsData";
import ProductCard from "../features/products/ProductCard";

function HomePage() {
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;