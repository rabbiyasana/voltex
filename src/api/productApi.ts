import type { Product } from "../types/productType";

const BASE_URL =import.meta.env.VITE_API_BASE_URL;

interface DummyReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
interface DummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  reviews: DummyReview[];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  sku?: string;
}


interface ProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

function mapProduct(product: DummyProduct): Product {
    const originalPrice =product.discountPercentage > 0
    ? Number(
        (
          product.price /
          (1 - product.discountPercentage / 100)
        ).toFixed(2)
      )
    : undefined;

  return {
    id: String(product.id),
    name: product.title,
    brand: product.brand ?? "Voltex",
    category: product.category,
    price: product.price,
    originalPrice,
    rating: product.rating,
    reviewCount:product.reviews.length,
    image: product.thumbnail,
    images: product.images,
    inStock: product.stock > 0,
    stockCount: product.stock,
    shortDescription: product.description,

    specifications: {
      SKU: product.sku ?? "N/A",
      Warranty:
        product.warrantyInformation ??
        "Standard warranty",
      Shipping:
        product.shippingInformation ??
        "Standard shipping",
      Availability:
        product.availabilityStatus ??
        (product.stock > 0
          ? "In Stock"
          : "Out of Stock"),
      Returns:
        product.returnPolicy ??
        "30 day return policy",
    },
  };
}

export async function getProducts(limit = 12,skip = 0) {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products."
    );
  }

  const data: ProductsResponse =
    await response.json();

  return {
    products:
      data.products.map(mapProduct),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}