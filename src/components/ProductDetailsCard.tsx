import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../features/products/productType";

import { Minus, Plus, ShoppingCart, Star } from "lucide-react";



interface ProductDetailsCardProps {
    product: Product;
}

function ProductDetailsCard({
    product,
}: ProductDetailsCardProps) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedImage, setSelectedImage] = useState(product.image);

    const isOnSale =
        product.originalPrice !== undefined &&
        product.originalPrice > product.price;

    return (
        <div className="grid gap-8 rounded-2xl bg-white p-6 lg:grid-cols-2 lg:p-8">
            {/* PRODUCT IMAGE */}
            {/* PRODUCT GALLERY */}
            <div className="min-w-0">
                {/* MAIN IMAGE */}
                <div className="overflow-hidden rounded-2xl bg-[#F5F5F7]">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="aspect-square w-full object-cover"
                    />
                </div>

                {/* THUMBNAILS */}
                {product.images.length > 1 && (
                    <div className="mt-3 flex gap-3 overflow-x-auto">
                        {product.images.map((image, index) => {
                            const isActive = selectedImage === image;

                            return (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => setSelectedImage(image)}
                                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${isActive
                                            ? "border-[#0057FF]"
                                            : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* PRODUCT INFO */}
            <div className="flex flex-col">
                {/* BRAND */}
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-400">
                    {product.brand}
                </p>

                {/* TITLE */}
                <h1 className="text-3xl font-extrabold leading-tight text-[#1D1D1F]">
                    {product.name}
                </h1>

                {/* RATING */}
                <div className="mt-3 flex items-center gap-2">
                    <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-bold">
                        {product.rating}
                    </span>

                    <span className="text-sm text-gray-400">
                        ({product.reviewCount.toLocaleString()} reviews)
                    </span>
                </div>

                {/* PRICE */}
                <div className="mt-6 flex items-center gap-3">
                    <span className="text-3xl font-extrabold">
                        ${product.price}
                    </span>

                    {isOnSale && (
                        <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                        </span>
                    )}
                </div>

                {/* STOCK */}
                <div className="mt-4">
                    {product.inStock ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                            In Stock
                        </span>
                    ) : (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 text-sm leading-7 text-gray-500">
                    {product.shortDescription}
                </p>

                {/* QUANTITY */}
                <div className="mt-8">
                    <p className="mb-2 text-sm font-bold">
                        Quantity
                    </p>

                    <div className="flex w-fit items-center rounded-xl border border-black/10">
                        {/* MINUS */}
                        <button
                            type="button"
                            onClick={() =>
                                setQuantity((current) =>
                                    Math.max(1, current - 1)
                                )
                            }
                            className="flex h-10 w-10 items-center justify-center"
                        >
                            <Minus size={15} />
                        </button>

                        {/* QUANTITY VALUE */}
                        <span className="w-10 text-center font-bold">
                            {quantity}
                        </span>

                        {/* PLUS */}
                        <button
                            type="button"
                            onClick={() =>
                                setQuantity((current) =>
                                    Math.min(
                                        product.stockCount,
                                        current + 1
                                    )
                                )
                            }
                            className="flex h-10 w-10 items-center justify-center"
                        >
                            <Plus size={15} />
                        </button>
                    </div>
                </div>

                {/* ADD TO CART */}
                <button
                    type="button"
                    onClick={() => {
                        dispatch(
                          addToCart({
                            product,
                            quantity,
                          })
                        );
                      }}
                    disabled={!product.inStock}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold ${product.inStock
                            ? "bg-[#0057FF] text-white hover:bg-[#0046CC]"
                            : "cursor-not-allowed bg-[#E8E8ED] text-gray-400"
                        }`}
                >
                    <ShoppingCart size={17} />

                    {product.inStock
                        ? `Add ${quantity} to Cart`
                        : "Out of Stock"}
                </button>
            </div>
        </div>
    );
}

export default ProductDetailsCard;