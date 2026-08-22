import { useParams } from "react-router-dom";

import ProductDetailsCard from "../components/ProductDetailsCard";
import { products } from "../features/products/productsData";
import RelatedProducts from "../components/RelatedProducts";

function ProductDetailsPage() {
    const { id } = useParams();

    const product = products.find(
        (product) => product.id === id
    );

    if (!product) {
        return (
            <main className="min-h-screen bg-[#F5F5F7]">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                    <div className="rounded-2xl bg-white p-10 text-center">
                        <h1 className="text-xl font-extrabold text-[#1D1D1F]">
                            Product not found
                        </h1>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F5F5F7]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* MAIN PRODUCT DETAILS */}
                <ProductDetailsCard
                    product={product}
                />

                {/* SPECIFICATIONS */}
                <section className="mt-8 rounded-2xl bg-white p-6">
                    <h2 className="mb-5 text-xl font-extrabold text-[#1D1D1F]">
                        Specifications
                    </h2>

                    <div className="divide-y divide-black/5">
                        {Object.entries(
                            product.specifications
                        ).map(([key, value]) => (
                            <div
                                key={key}
                                className="grid grid-cols-2 gap-4 py-3 text-sm"
                            >
                                <span className="font-semibold text-gray-500">
                                    {key}
                                </span>

                                <span className="font-semibold text-[#1D1D1F]">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
                <RelatedProducts
                    currentProduct={product}
                    products={products}
                />
            </div>
        </main>
    );
}

export default ProductDetailsPage;