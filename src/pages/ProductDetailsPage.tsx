import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";
import { fetchProductById } from "../slices/productSlice";

import ProductDetailsCard from "../components/product/ProductDetailsCard";
import RelatedProducts from "../components/product/RelatedProducts";

function ProductDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const {
        selectedProduct,
        loading,
        error,
        items: products,
      } = useSelector(
        (state: RootState) => state.products
      );
    useEffect(() => {
    if (id) {
        dispatch(fetchProductById(id));
    }
    }, [dispatch, id]);
    

    if (loading) {
        return (
          <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
              <p className="text-sm text-gray-500">
                Loading product...
              </p>
            </div>
          </main>
        );
      }
      if (error) {
        return (
          <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
              <div className="rounded-2xl bg-white p-8 text-center">
                <h2 className="text-lg font-extrabold">
                  Failed to load product
                </h2>
    
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              </div>
            </div>
          </main>
        );
      }
      if (!selectedProduct) {
        return (
          <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
              <div className="rounded-2xl bg-white p-8 text-center">
                Product not found.
              </div>
            </div>
          </main>
        );
      }
    

      return (
        <main className="min-h-screen bg-[#F5F5F7]">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <ProductDetailsCard
              product={selectedProduct}
            />
    
            <RelatedProducts
              currentProduct={selectedProduct}
              products={products}
            />
          </div>
        </main>
      );
    }

export default ProductDetailsPage;