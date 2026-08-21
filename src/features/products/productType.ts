export type ProductBadge = "New" | "Sale" | "Best Seller" | "Popular";

export interface Product{
    id: string;
  name: string;
  brand: string;
  category: string
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  badge?: ProductBadge;
  inStock: boolean;
  stockCount: number;
  shortDescription: string;
  specifications: Record<string, string>;
}