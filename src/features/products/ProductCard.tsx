import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "./productType";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isOnSale =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const discountPercentage = isOnSale
    ? Math.round(
        ((product.originalPrice! - product.price) /
          product.originalPrice!) *
          100
      )
    : null;

  const getBadgeClasses = (badge: string) => {
    switch (badge) {
      case "Sale":
        return "border border-red-200 bg-red-50 text-red-600";

      case "New":
        return "border border-emerald-200 bg-emerald-50 text-emerald-700";

      case "Popular":
        return "border border-blue-200 bg-blue-50 text-blue-700";

      case "Best Seller":
        return "border border-amber-200 bg-amber-50 text-amber-700";

      default:
        return "";
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-[#E8E8ED]/30">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* TOP LEFT BADGES */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {/* Automatically show Sale */}
          {isOnSale && (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClasses(
                "Sale"
              )}`}
            >
              Sale
            </span>
          )}

          {/* Other badges */}
          {product.badge && product.badge !== "Sale" && (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClasses(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}

          {/* Out of Stock */}
          {!product.inStock && (
            <span className="rounded-full bg-[#1D1D1F] px-2.5 py-1 text-xs font-semibold text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* DISCOUNT PERCENTAGE */}
        {discountPercentage !== null && (
          <span className="absolute bottom-3 right-3 rounded-md bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* BRAND + CATEGORY */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {product.brand}
          </span>

          <span className="text-xs text-gray-400">
            {product.category}
          </span>
        </div>

        {/* PRODUCT NAME */}
        <h3 className="text-sm font-semibold leading-snug text-[#1D1D1F]">
          {product.name}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1.5">
          <Star
            size={13}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-xs font-semibold">
            {product.rating}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-base font-extrabold text-[#1D1D1F]">
            ${product.price}
          </span>

          {isOnSale && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          disabled={!product.inStock}
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold transition-all ${
            product.inStock
              ? "bg-[#0057FF] text-white hover:bg-[#0046CC] active:scale-[0.98]"
              : "cursor-not-allowed bg-[#E8E8ED] text-gray-400"
          }`}
        >
          {product.inStock ? (
            <>
              <ShoppingCart size={13} />
              Add to Cart
            </>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;