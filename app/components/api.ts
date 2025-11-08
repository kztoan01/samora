// app/lib/api.ts
// Lưu ý: Không nên sử dụng 'use client' cho các hàm chỉ chạy trên server

import axios from "axios";

// Định nghĩa TypeScript interfaces
export interface Price {
  originalPrice: number;
}

export interface VolumePrice {
  volume: string;
  price: Price;
}

export interface Product {
  _id: string;
  name: string;
  volumePrices: VolumePrice[];
  price: number;
  selectedVolume?: string;
  selectedPrice?: number;
  slug: string;
  description?: string;
  images: string[];
  category: string;
  stock: number;
  isAvailable: boolean;
  ingredients: string; // Thành phần
  benefits: string; // Công dụng
  usageInstructions: string; // Hướng dẫn sử dụng
  storageInstructions: string; // Cách bảo quản
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Danh sách thể loại (nếu không có API)
export const categories: Category[] = [
  { id: "1", name: "Rượu Sâm Ngọc Linh", slug: "ruou-sam-ngoc-linh" },
];

// API URL

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// app/lib/api.ts (thêm hàm mới)
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/detail/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with slug: ${slug}`, error);
    return null;
  }
}
// Hàm lấy tất cả sản phẩm
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Trả về mảng rỗng thay vì ném lỗi
  }
}

// Hàm lấy sản phẩm theo danh mục
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`, {
      params: { category },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch products for category: ${category}`, error);
    return []; // Trả về mảng rỗng thay vì ném lỗi
  }
}

// Hàm lấy tất cả danh mục - đảm bảo luôn export đúng cách
export function getAllCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}