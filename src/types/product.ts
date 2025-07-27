// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;  // Make sure this is required (not optional)
  reviews: number;
  badge?: string;
}