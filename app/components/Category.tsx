"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function CategorySection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bannerMessage, setBannerMessage] = useState(0);

    const bannerMessages = [
        "🔥 Summer sale - Up to 50% off 🔥",
        "⚡ Free shipping on orders over $50 ⚡",
        "🎁 Use code 'WELCOME10' for 10% off your first order 🎁"
    ];

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
    
    return (
        <div className="min-h-screen w-full max-w-8xl mx-auto p-2 sm:p-4 space-y-2 sm:space-y-3 bg-white">
            {/* Moving banner */}
            <div
                className="bg-zinc-100 flex items-center justify-center text-black p-4 md:p-6 rounded-xl overflow-hidden relative"
            >
                <div className="text-center text-sm md:text-base font-normal">
                    <span>Sản Phẩm Từ Sâm Ngọc Linh</span>
                </div>
            </div>

            {/* Main Content Container - adjusted for better mobile experience */}
            <div className="relative rounded-xl overflow-hidden">
                <div className="max-w-8xl mx-auto relative overflow-hidden">
                    {/* Changed to flex-col on mobile and grid on lg */}
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4">
                        {/* Left Side - full width on mobile */}
                        <div className="relative rounded-lg overflow-hidden h-[50vh] lg:h-[calc(100vh-140px)]">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/gold.png"
                                    alt="Left side image"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="object-cover"
                                />
                                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 max-w-md">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="backdrop-blur-md bg-blue-700/70 p-3 sm:p-6 rounded-2xl text-white"
                                    >
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Rượu Sâm Ngọc Linh</h2>
                                        <p className="text-gray-200 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-3 sm:line-clamp-none">
                                            Chắt lọc tinh túy từ lá Sâm Ngọc Linh tươi, rượu có màu xanh vàng tự nhiên, vị đậm đà cùng công dụng hỗ trợ tăng cường miễn dịch, cải thiện tuần hoàn máu và nâng cao sức đề kháng.
                                        </p>
                                        <Link href="/san-pham/ruou-sam-ngoc-linh" className="text-zinc-100 hover:text-zinc-300 text-xs sm:text-sm transition duration-200">
                                            Xem Thêm
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - full width on mobile, with adjusted heights */}
                        <div className="flex flex-col h-auto gap-3 sm:gap-4">
                            {/* Top Section */}
                            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4">
                                {/* Top Left Image (full width on mobile, 2/3 on tablet+) */}
                                <div className="w-full sm:col-span-2 relative rounded-lg overflow-hidden shadow-lg h-[30vh] sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                                    <Image
                                        src="/Rượu lá Sâm Ngọc Linh bình 500 ML_4.png"
                                        alt="Top right image"
                                        layout="fill"
                                        style={{ objectFit: "cover" }}
                                        className="rounded-lg"
                                    />
                                </div>

                                {/* Top Right Card (full width on mobile, 1/3 on tablet+) */}
                                <div className="w-full sm:col-span-1 bg-blue-700 p-3 sm:p-4 md:p-6 rounded-lg flex flex-col h-auto sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                                    {/* Title at the top */}
                                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-gray-200">Rượu Lá Sâm Ngọc Linh</h3>

                                    {/* Description in the middle */}
                                    <p className="text-zinc-300 text-xs sm:text-sm line-clamp-4 sm:line-clamp-4 md:line-clamp-none flex-grow">
                                        Chắt lọc tinh túy từ lá Sâm Ngọc Linh tươi, rượu có màu xanh vàng tự nhiên, vị đậm đà cùng công dụng hỗ trợ tăng cường miễn dịch, cải thiện tuần hoàn máu và nâng cao sức đề kháng.
                                    </p>

                                    {/* Link at the bottom left */}
                                    <div className="mt-2">
                                        <Link href="/san-pham/ruou-la-sam-ngoc-linh" className="text-zinc-100 hover:text-zinc-300 text-xs sm:text-sm transition duration-200">
                                            Xem Thêm
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="flex flex-col-reverse sm:grid sm:grid-cols-3 gap-3 sm:gap-4">
                                {/* Bottom Left Card (full width on mobile, 1/3 on tablet+) */}
                                <div className="w-full sm:col-span-1 bg-blue-700 p-3 sm:p-4 md:p-6 rounded-lg flex flex-col h-auto sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-gray-200">
                                        Sâm Yến Bảo Ly
                                    </h3>

                                    {/* Mô tả sản phẩm */}
                                    <p className="text-zinc-300 text-xs sm:text-sm line-clamp-4 sm:line-clamp-4 md:line-clamp-none flex-grow">
                                        Sự kết hợp giữa tổ yến thượng hạng và tinh chất sâm Ngọc Linh giúp bồi bổ cơ thể, tăng cường sức đề kháng, cải thiện trí nhớ và giảm căng thẳng.
                                    </p>

                                    {/* Link xem thêm */}
                                    <div className="mt-2">
                                        <Link href="/san-pham/che-bien" className="text-zinc-100 hover:text-zinc-300 text-xs sm:text-sm transition duration-200">
                                            Xem Thêm
                                        </Link>
                                    </div>
                                </div>

                                {/* Bottom Right Image (full width on mobile, 2/3 on tablet+) */}
                                <div className="w-full sm:col-span-2 relative rounded-lg overflow-hidden shadow-lg h-[30vh] sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                                    <Image
                                        src="/yen.png"
                                        alt="Bottom right image"
                                        layout="fill"
                                        style={{ objectFit: "cover" }}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}