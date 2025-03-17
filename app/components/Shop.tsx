"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import { Category, getAllCategories, getAllProducts, Product } from "./api";
import CategoryNav from "./CategoryNav";
import ProductList from "./ProductList";

export default function ShopSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [fetchedProducts, fetchedCategories] = await Promise.all([
                    getAllProducts(),
                    getAllCategories(),
                ]);
                setProducts(fetchedProducts);
                setCategories(fetchedCategories);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="h-full w-full max-w-8xl mx-auto p-1 md:p-4 mt-1 bg-white">
            <Nav />

            {/* Banner */}
            <div className="bg-blue-100 flex flex-col items-center sm:items-start justify-center h-auto sm:h-[16rem] mb-4 text-black px-6 sm:px-16 py-8 sm:py-16 rounded-xl overflow-hidden relative text-center sm:text-left">
                <h1 className="text-xl sm:text-3xl font-semibold mb-4 mt-4 sm:mt-9">
                    Khám Phá Bộ Sưu Tập
                </h1>
                <p className="text-sm sm:text-base text-zinc-800 max-w-xl">
                    Trải nghiệm những sản phẩm chất lượng cao từ Sâm Ngọc Linh,
                    được tuyển chọn kỹ lưỡng để mang đến sức khỏe tối ưu cho bạn và gia đình.
                </p>
            </div>

            {/* Navigation categories */}
            <CategoryNav categories={categories} />

            {/* Product list */}
            <div className="relative rounded-xl overflow-hidden">
                <ProductList isChebien={false} products={products} />
            </div>
        </div>
    );
}