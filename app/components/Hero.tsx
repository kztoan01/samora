"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

// Sample image data - replace with your actual image URLs
const carouselImages = [
  {
    src: "/gold3.png",
    alt: "Rượu Sâm Ngọc Linh",
    title: "Rượu Sâm Ngọc Linh",
    subtitle: "Tinh hoa từ củ sâm lâu năm, vị đắng nhẹ hậu ngọt, bồi bổ cơ thể",
    link: "/san-pham/ruou-sam-ngoc-linh"
  },
  {
    src: "/sam.png",
    alt: "Rượu Hoa Sâm Ngọc Linh",
    title: "Rượu Hoa Sâm Ngọc Linh",
    subtitle: "Tinh túy từ hoa sâm quý hiếm, mang đến hương thơm dịu nhẹ và vị ngọt thanh đặc trưng",
    link: "/san-pham/ruou-hoa-sam-ngoc-linh"
  },
  {
    src: "/SAM20-scaled.png",
    alt: "Rượu Lá Sâm Ngọc Linh",
    title: "Rượu Lá Sâm Ngọc Linh",
    subtitle: "Chắt lọc từ lá sâm tươi, mang đến sức khỏe và sinh khí mới",
    link: "/san-pham/ruou-la-sam-ngoc-linh"
  }
];

export default function HeroSection() {

  const [bannerMessage, setBannerMessage] = useState(0);

  const bannerMessages = [
    "🌺 Ưu đãi đặc biệt ngày 8/3 - Giảm 20% cho tất cả sản phẩm Rượu Sâm 🌺",
    "🎁 Tặng kèm Trà Sâm cao cấp cho đơn hàng từ 2 triệu đồng 🎁",
    "🚚 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1 triệu đồng 🚚",
    "💝 Quà tặng sang trọng - Rượu Sâm Ngọc Linh thượng hạng 💝",
    "✨ Nhập mã 'SAMTET' giảm thêm 10% cho đơn hàng đầu tiên ✨"
  ];

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState<boolean>(true);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    setAutoplayEnabled(false); // Pause autoplay when user interacts
    setTimeout(() => setAutoplayEnabled(true), 10000); // Resume after 10 seconds
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };


  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (touchStart - touchEnd > 50) {
      nextSlide(); // Swipe left
    }
    if (touchStart - touchEnd < -50) {
      prevSlide(); // Swipe right
    }
  };
  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <div className="h-screen w-full max-w-8xl mx-auto p-4 space-y-3 bg-white">
      {/* Moving banner */}
      <motion.div
        className="bg-blue-700 text-white p-2 rounded-xl overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Container with gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(37, 99, 235, 1) 0%, rgba(37, 99, 235, 0) 15%, rgba(37, 99, 235, 0) 85%, rgba(37, 99, 235, 1) 100%)"
          }}
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="text-center text-sm font-normal whitespace-nowrap flex gap-20"
        >
          {[...bannerMessages, ...bannerMessages].map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Carousel container */}
      <div
        className="relative w-full flex-1 h-[calc(100vh-5rem)] min-h-[18rem] rounded-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Menu */}
        <Nav />

        {/* Carousel */}
        <div className="w-full h-full relative">
          {carouselImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                zIndex: currentSlide === index ? 10 : 0
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full h-full bg-[#D1D1CE]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover ${image.src == "/sam.png" ? "object-[50%_25%]" : "object-[50%_55%]"}`}
                  priority={index === 0} // Prioritize loading the first image
                />

                {/* Content overlay */}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 w-[90%] sm:w-[80%] md:w-[60%] lg:max-w-sm">
                  <div className="backdrop-blur-md md:w-[30rem] bg-blue-800/80 p-4 sm:p-5 rounded-xl text-white shadow-lg">
                    {/* Logo */}
                    <div className="flex items-center mb-3">
                      <img
                        src="/logo.png"
                        alt="Logo Sâm Ngọc Linh Bảo Ly"
                        className="h-10 sm:h-24 mr-3"
                      />
                      <h1 className="text-lg sm:text-xl font-bold text-amber-400">Sâm Ngọc Linh Bảo Ly</h1>
                    </div>

                    {/* Tagline */}
                    <h2 className="text-base sm:text-lg font-bold mb-2">Tinh Hoa Sâm Ngọc Linh</h2>

                    {/* Description */}
                    <p className="text-gray-100 mb-3 text-sm sm:text-base">
                      Sản phẩm sâm ngọc linh tự nhiên 100% từ Quảng Nam,
                      được kiểm định chất lượng và nguồn gốc rõ ràng.
                    </p>

                    {/* Call to action */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Link
                        href="/san-pham"
                        className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300 text-center"
                      >
                        Xem Sản Phẩm
                      </Link>

                      <Link
                        href="/lien-he"
                        className="border border-white hover:bg-white hover:text-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300 text-center"
                      >
                        Liên Hệ Ngay
                      </Link>
                    </div>

                    {/* Contact info */}
                    <div className="mt-3 text-xs sm:text-sm text-gray-200">
                      <p>Hotline: 0987 654 321</p>
                      <p>Email: info@samngoclinhbaoly.vn</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm text-white p-1 sm:p-2 rounded-full hover:bg-white/40 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm text-white p-1 sm:p-2 rounded-full hover:bg-white/40 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots navigation */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1 sm:space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentSlide === index ? "bg-white scale-125" : "bg-white/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}