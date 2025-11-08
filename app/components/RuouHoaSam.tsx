"use client";

import ProductList from '@/app/components/ProductList';
import CategoryNav from '@/app/components/CategoryNav';
import { notFound } from 'next/navigation';
import { Category, getAllCategories, getProductsByCategory } from '@/app/components/api';
import Nav from '@/app/components/Nav';
import FooterSection from '@/app/components/Footer';
import Link from 'next/link';
import { RuouHoaSamSkeleton } from './Skeleton';
import { useState, useEffect } from 'react';


interface CategoryPageProps {
  params: {
    category: string;
  };
}



export default function RuouHoaPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const category = "che-bien";
        const categories = await getAllCategories();

        // Check if category exists
        const categoryExists = categories.some(c => c.slug === category);
        if (!categoryExists) {
          console.error("Category not found");
          setProducts([]);
          return;
        }

        // Get current category
        const currentCategory = categories.find(c => c.slug === category) as Category;
        
        // Fetch products by category
        const productsData = await getProductsByCategory(currentCategory.name);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <>
      <div className="h-full w-full max-w-8xl mx-auto p-2 md:p-2 mb-2 bg-green-50">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-50 flex items-center justify-center text-black p-6 md:p-8 rounded-xl overflow-hidden relative my-4 shadow-sm">
          <div className="text-center z-10">
            <h1 className="text-xl md:text-3xl font-semibold text-green-800 mb-2">Các sản phẩm chế biến từ Sâm Ngọc Linh</h1>
            <p className="text-sm md:text-base text-green-700 max-w-2xl">
              Với các công dụng như chống buồn ngủ khi lái xe và bổ dưỡng cho cơ thể, chúng tôi cung cấp các sản phẩm chất lượng nhất từ Sâm Ngọc Linh đến với mọi người
            </p>
          </div>
        </div>

        {/* Product list with loading state */}
        <div className="relative rounded-xl overflow-hidden bg-white p-1">
          {loading ? (
            <RuouHoaSamSkeleton />
          ) : products.length > 0 ? (
            <ProductList isChebien={true} products={products.slice(0, 4)} />
          ) : (
            <p className="text-center py-12 text-gray-500">
              Không có sản phẩm nào trong thể loại này.
            </p>
          )}
        </div>
        
        {!loading && (
          <div className="mt-6 text-center">
            <Link href="/san-pham/ruou-hoa-sam-ngoc-linh" className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Xem thêm sản phẩm
              <svg className="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}