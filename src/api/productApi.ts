import type { Product } from "../types/productType";
import apiClient from "./apiClient";

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
  const originalPrice =
    product.discountPercentage > 0
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
    reviewCount: product.reviews.length,
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

export async function getProducts(
  limit = 12,
  skip = 0
) {
  const response =
    await apiClient.get<ProductsResponse>(
      "/products",
      {
        params: {
          limit,
          skip,
        },
      }
    );

  const data = response.data;

  return {
    products: data.products.map(mapProduct),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}

export async function getProductCategories(): Promise<
  string[]
> {
  const response =
    await apiClient.get<string[]>(
      "/products/category-list"
    );

  return response.data;
}

export async function getProductsByCategory(
  category: string,
  limit = 12,
  skip = 0
) {
  const response =
    await apiClient.get<ProductsResponse>(
      `/products/category/${encodeURIComponent(
        category
      )}`,
      {
        params: {
          limit,
          skip,
        },
      }
    );

  const data = response.data;

  return {
    products: data.products.map(mapProduct),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}

export async function searchProducts(
  query: string,
  limit = 12,
  skip = 0
) {
  const response =
    await apiClient.get<ProductsResponse>(
      "/products/search",
      {
        params: {
          q: query,
          limit,
          skip,
        },
      }
    );

  const data = response.data;

  return {
    products: data.products.map(mapProduct),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}

export async function getProductById(
  id: string
): Promise<Product> {
  const response =
    await apiClient.get<DummyProduct>(
      `/products/${id}`
    );

  return mapProduct(response.data);
}