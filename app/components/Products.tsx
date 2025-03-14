"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe, RefreshCcw, Shield, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Category, getAllCategories, getAllProducts, Product } from './api';
import ProductList from './ProductList';

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

export default function ProductsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bannerMessage, setBannerMessage] = useState(0);

    const shippingInfo = [
        { text: "Miễn Phí Vận Chuyển Cho Đơn Hàng Trên 2 Triệu Đồng", icon: <Truck className="w-4 h-4 mr-2" /> },
        { text: "Vận Chuyển Trên Cả Nước", icon: <Globe className="w-4 h-4 mr-2" /> },
        { text: "Miễn Phí Đổi Trả Sản Phẩm", icon: <RefreshCcw className="w-4 h-4 mr-2" /> },
        { text: "Cam Kết Bảo Hành 5 Năm", icon: <Shield className="w-4 h-4 mr-2" /> }
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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Example image array - replace with your actual images
    const images = [
        { src: "/hero.jpg", name: "Product 1", price: "$100" },
        { src: "/hero.jpg", name: "Product 2", price: "$120" },
        { src: "/hero.jpg", name: "Product 3", price: "$90" },
        { src: "/hero.jpg", name: "Product 4", price: "$150" },
        { src: "/hero.jpg", name: "Product 5", price: "$80" },
        { src: "/hero.jpg", name: "Product 6", price: "$110" },
        { src: "/hero.jpg", name: "Product 7", price: "$95" },
        { src: "/hero.jpg", name: "Product 8", price: "$130" }
    ];


    const [currentPosition, setCurrentPosition] = useState(0);
    const cardCount = 8;
    const visibleCards = 4;


    const handleNext = () => {
        setCurrentPosition(prev => Math.min(prev + 2, cardCount - visibleCards));
    };

    const handlePrevious = () => {
        setCurrentPosition(prev => Math.max(prev - 2, 0));
    };

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
        <div className="h-full w-full max-w-8xl mx-auto p-2 space-y-3 bg-white">
            {/* Moving banner */}
            <div className="bg-blue-700 text-white p-5 md:p-6 rounded-xl overflow-hidden relative">
                <motion.div
                    animate={{
                        x: [0, -1000]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear"
                        }
                    }}
                    className="text-center text-xs md:text-sm font-normal whitespace-nowrap flex gap-20"
                >
                    {/* Display each item twice to create continuous loop effect */}
                    {[...shippingInfo, ...shippingInfo].map((item, index) => (
                        <div key={index} className="flex items-center">
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Our Favorite banner with pulse animation */}
            <div
                className="bg-blue-50 flex items-center justify-center text-black p-4 md:p-6 rounded-xl overflow-hidden relative"
            >
                <div className="text-center text-sm md:text-base font-normal">
                    <span>Tất Cả Sản Phẩm Từ Sâm Ngọc Linh</span>
                </div>
            </div>
            {/* Carousel container */}
            <div className="relative rounded-xl overflow-hidden">
            <ProductList products={products} />
            </div>
            <div className="mt-12 text-center">
        <Link href="/san-pham" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Xem tất cả sản phẩm
          <svg className="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
        </div>
    );
}