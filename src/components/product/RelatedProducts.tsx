import ProductCard from "../../features/products/ProductCard";
import type { Product } from "../../features/products/productType";

interface RelatedProductsProps {
  currentProduct: Product;
  products: Product[];
}

function RelatedProducts({
  currentProduct,
  products,
}: RelatedProductsProps) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#1D1D1F]">
          Related Products
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;