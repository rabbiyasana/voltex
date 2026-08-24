import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../app/store";
import type { Product } from "../../types/productType";

import { fetchRelatedProducts } from "../../slices/productSlice";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

function RelatedProducts({
  currentProduct,
}: RelatedProductsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    relatedItems,
    relatedLoading,
  } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchRelatedProducts({
        category: currentProduct.category,
        currentProductId: currentProduct.id,
        limit: 5,
      })
    );
  }, [
    dispatch,
    currentProduct.category,
    currentProduct.id,
  ]);

  if (relatedLoading) {
    return (
      <section className="mt-10">
        <p className="text-sm text-gray-500">
          Loading related products...
        </p>
      </section>
    );
  }

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xl font-extrabold text-[#1D1D1F]">
        Related Products
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {relatedItems
          .slice(0, 4)
          .map((product) => (
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