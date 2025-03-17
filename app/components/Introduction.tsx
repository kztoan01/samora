"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ProductList from './ProductList';
import { Category, getAllCategories, getAllProducts, Product } from './api';

// Sample image data - replace with your actual image URLs
const carouselImages = [
    {
        src: "/hero.jpg",
        alt: "Sale on summer collection",
        title: "Summer Collection",
        subtitle: "Up to 50% off on selected items"
    },
    {
        src: "/hero.jpg",
        alt: "New arrivals",
        title: "New Arrivals",
        subtitle: "Check out our latest products"
    },
    {
        src: "/hero.jpg",
        alt: "Exclusive deals",
        title: "Exclusive Deals",
        subtitle: "Limited time offers"
    }
];

export default function IntroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bannerMessage, setBannerMessage] = useState(0);

    const bannerMessages = [
        "🔥 Summer sale - Up to 50% off 🔥",
        "⚡ Free shipping on orders over $50 ⚡",
        "🎁 Use code 'WELCOME10' for 10% off your first order 🎁"
    ];

    // Auto rotate banner messages
    // useEffect(() => {
    // const interval = setInterval(() => {
    //     setBannerMessage((prev) => (prev + 1) % bannerMessages.length);
    // }, 4000);
    // return () => clearInterval(interval);
    // }, [bannerMessages.length]);

    // Function to move to next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    // Function to move to previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    // Auto rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    const navItems = [
        { title: "Women", href: "#" },
        { title: "Men", href: "#" },
        { title: "Kids", href: "#" },
        { title: "Blog", href: "#" },
    ];
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
                setProducts(fetchedProducts.slice(0, 8));
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

        <>
            <div className="h-full w-full max-w-8xl mx-auto p-4 space-y-3 bg-white">
                <div
                    className="bg-zinc-100 flex items-center justify-center text-black p-6 rounded-xl overflow-hidden relative"
                >
                    <div className="text-center text-base font-normal">
                        <span>Về Sâm Ngọc Linh Bảo Ly</span>
                    </div>
                </div>

                {/* Carousel container */}
                <div className="relative rounded-xl overflow-hidden">
                    <div className="max-w-8xl mx-auto relative overflow-hidden ">
                        <div className="bg-white rounded-xl overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Text Content (1/3 width) */}
                                <div className="md:w-7/12 relative rounded-xl">
                                    <div className="h-[28rem] md:h-[40rem] rounded-lg overflow-hidden">
                                        <Image
                                            src="/gold3.png"
                                            alt="Bottom right image"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-5/12 p-8 md:p-12 bg-zinc-100 rounded-xl flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                            Công Dụng Của Sâm Ngọc Linh Bảo Ly
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-gray-800 mb-4 text-sm md:text-base">
                                            Sâm Ngọc Linh Bảo Ly là sản phẩm cao cấp, kết hợp tinh túy của thiên nhiên giúp <strong>tăng cường sức khỏe toàn diện</strong>.
                                            Đây là <strong>siêu thảo dược</strong>  với nhiều <strong>dược tính quý giá</strong> , mang lại lợi ích vượt trội cho cơ thể.
                                        </p>
                                        <ul className="text-gray-800 mb-4 text-sm md:text-base list-disc pl-5 space-y-2">
                                            <li><strong>Bồi bổ cơ thể:</strong> Giúp hồi phục sức khỏe nhanh chóng, đặc biệt hiệu quả với người suy nhược.</li>
                                            <li><strong>Tăng cường miễn dịch:</strong> Hỗ trợ tăng đề kháng, chống lại các tác nhân gây bệnh.</li>
                                            <li><strong>Cải thiện trí nhớ:</strong> Giúp tỉnh táo, tập trung tốt hơn và giảm căng thẳng, mệt mỏi.</li>
                                            <li><strong>Hỗ trợ tim mạch:</strong> Ổn định huyết áp, giảm cholesterol và tăng cường tuần hoàn máu.</li>
                                            <li><strong>Chống lão hóa:</strong> Làm chậm quá trình lão hóa, giúp làn da khỏe mạnh và trẻ trung.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Image (2/3 width) */}

                            </div>
                        </div>
                    </div>
                </div>
                {/* 222 */}

                <div className="relative rounded-xl overflow-hidden">
                    <div className="max-w-8xl mx-auto relative overflow-hidden">
                        <div className="bg-white rounded-xl overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Nội dung mô tả (1/3 chiều rộng) */}
                                <div className="md:w-5/12 p-8 md:p-12 bg-zinc-100 rounded-xl flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Khám Phá Sâm Ngọc Linh</h2>
                                    </div>

                                    <div>
                                        <p className="text-gray-800 mb-4 text-sm md:text-base">
                                            Sâm Ngọc Linh – báu vật thiên nhiên được phát hiện lần đầu tiên vào năm 1973 trên dãy núi Ngọc Linh,
                                            tỉnh Kon Tum, Việt Nam. Đây là loại sâm quý hiếm, sinh trưởng tự nhiên ở độ cao trên 1.500m so với mực nước biển.
                                        </p>
                                        <p className="text-gray-800 mb-4 text-sm md:text-base">
                                            Trải qua hàng thế kỷ, người dân tộc Xơ Đăng đã xem Sâm Ngọc Linh như một thần dược, dùng để bồi bổ sức khỏe
                                            và chữa lành vết thương. Ngày nay, loại sâm này không chỉ là biểu tượng của sức khỏe mà còn mang ý nghĩa văn hóa sâu sắc.
                                        </p>
                                    </div>
                                </div>

                                {/* Hình ảnh (2/3 chiều rộng) */}
                                <div className="md:w-7/12 relative rounded-xl">
                                    <div className="h-[28rem] md:h-[40rem] rounded-lg overflow-hidden">
                                        <Image
                                            src="/sam.png"
                                            alt="Nguồn Gốc Sâm Ngọc Linh"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-zinc-100 flex items-center justify-center text-black p-6 rounded-xl overflow-hidden relative"
                >
                    <div className="text-center text-base font-normal">
                        <span>Xem Thêm Về Sâm Ngọc Linh</span>
                    </div>
                </div>
                {/* Carousel container */}
                <div className="relative rounded-xl overflow-hidden">
                    <ProductList isChebien={false} products={products} />
                </div>
            </div>

        </>
    );
}