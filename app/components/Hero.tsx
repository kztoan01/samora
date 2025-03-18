"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Search, ShoppingCart, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

// Sample image data - replace with your actual image URLs
const carouselImages = [
  {
    src: "/gold3.png",
    alt: "Rượu Sâm Ngọc Linh",
    title: "Rượu Sâm Ngọc Linh",
    subtitle: "Chắt lọc từ củ sâm Ngọc Linh lâu năm, hương vị đắng nhẹ nhưng hậu ngọt tinh tế. Giúp tăng cường sức khỏe, nâng cao sức đề kháng và hỗ trợ tuần hoàn máu.",
    link: "/san-pham/ruou-sam-ngoc-linh"
  },
  {
    src: "/sam.png",
    alt: "Rượu Hoa Sâm Ngọc Linh",
    title: "Rượu Hoa Sâm Ngọc Linh",
    subtitle: "Được ủ từ hoa sâm Ngọc Linh quý hiếm, mang đến hương thơm dịu nhẹ, vị ngọt thanh đặc trưng. Hỗ trợ tăng cường sinh lực, cải thiện giấc ngủ và giảm căng thẳng.",
    link: "/san-pham/ruou-hoa-sam-ngoc-linh"
  },
  {
    src: "/SAM20-scaled.png",
    alt: "Rượu Lá Sâm Ngọc Linh",
    title: "Rượu Lá Sâm Ngọc Linh",
    subtitle: "Chiết xuất từ những lá sâm tươi nguyên chất, giàu dưỡng chất giúp thanh lọc cơ thể, tăng cường hệ miễn dịch và mang lại nguồn sinh khí mới.",
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplayEnabled) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplayEnabled]);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerMessage((prev) => (prev === bannerMessages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(bannerInterval);
  }, []);

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
    <div className="h-screen w-full max-w-8xl mx-auto space-y-3 bg-amber-100  ">
      {/* Header Bar - Logo, Search, Cart */}
      {/* Top Header với thông tin liên hệ */}
      <div className="bg-blue-800 text-white py-2 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center mb-2 md:mb-0">
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span className="text-xs">Hotline: 0903 924 405</span>
            </div>
            <span className="mx-2 text-blue-300 hidden sm:inline">|</span>
            <div className="flex items-center mt-1 sm:mt-0">
              <Mail size={14} className="mr-1" />
              <span className="text-xs">Email: maiphuccl@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/gioi-thieu" className="text-xs hover:text-amber-300">Giới thiệu</Link>
            <span className="text-blue-300">|</span>
            <Link href="/lien-he" className="text-xs hover:text-amber-300">Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Navigation */}
      <div className="bg-amber-100 py-3 px-4 top-0">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center mb-3 md:mb-0">
            <Image
              src="/logo.png"
              alt="Logo Sâm Ngọc Linh Bảo Ly"
              width={60}
              height={60}
              className="mr-2 md:mr-3 w-[60px] md:w-[60px]"
            />
            <div className="text-center md:text-left">
              <h1 className="text-md md:text-xl font-bold text-blue-800">SÂM NGỌC LINH BẢO LY - QUẢNG NAM</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Thương hiệu Sâm Ngọc Linh uy tín hàng đầu Việt Nam</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-amber-50 text-amber-700 rounded-full py-1 px-3 text-xs whitespace-nowrap">Chứng nhận bởi Bộ Y Tế</span>
            <span className="bg-green-50 text-green-600 rounded-full py-1 px-3 text-xs whitespace-nowrap">Sản phẩm OCOP 4 Sao</span>
            <span className="bg-blue-50 text-blue-600 rounded-full py-1 px-3 text-xs whitespace-nowrap">Đạt tiêu chuẩn FDA</span>
            <span className="bg-purple-50 text-purple-600 rounded-full py-1 px-3 text-xs whitespace-nowrap">Chứng nhận ISO 9001</span>
          </div>
        </div>
      </div>
      {/* Moving promotional banner */}
      <motion.div
        className="bg-blue-700 text-white p-2 overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Container with gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(0, 102, 255, 1) 0%, rgba(0, 102, 255, 0) 15%, rgba(0, 102, 255, 0) 85%, rgba(0, 102, 255, 1) 100%)"
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
          {bannerMessages.map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Carousel container */}
      <div
        className="relative w-full flex-1 h-[calc(100vh-12rem)] min-h-[18rem] rounded-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Navigation Menu */}
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
        <div className="flex flex-col md:relative w-full h-[80vh] md:h-full bg-[#F5F5F0]">
          {/* Image container with fixed height on mobile */}
          <div className="relative w-full h-[80vh] md:h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover ${image.src == "/sam.png" ? "object-[50%_25%]" : "object-[50%_55%]"}`}
              priority={index === 0}
            />
          </div>
          
          {/* Content overlay - positioned below on mobile, overlaid on desktop */}
          <div className="w-full md:absolute md:bottom-8 md:left-8 md:z-20 md:w-[80%] md:max-w-md p-4">
            <div className="backdrop-blur-md bg-white/90 border-l-4 border-blue-800 p-4 sm:p-5 rounded-r-xl text-black shadow-lg">
                    {/* Product featured heading */}
                    <div className="bg-blue-800 text-white inline-block px-2 py-1 text-xs mb-3">SẢN PHẨM NỔI BẬT</div>

                    {/* Product title */}
                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-blue-800">{image.title}</h2>

                    {/* Product description */}
                    <p className="text-gray-700 mb-3 text-sm leading-tight border-l-2 border-amber-500 pl-2 italic">
                      {image.subtitle}
                    </p>

                    {/* Company endorsement */}
                    <div className="flex items-center mb-3 bg-amber-50 p-2 rounded-lg">
                      <img
                        src="/logo.png"
                        alt="Logo Sâm Ngọc Linh Bảo Ly"
                        className="h-10 mr-2"
                      />
                      <div>
                        <p className="text-xs text-gray-500">Phân phối chính thức bởi</p>
                        <p className="font-bold text-blue-800 text-sm">CÔNG TY TNHH SẢM NGỌC LINH BẢO LY</p>
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={image.link}
                        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300 text-center flex-1"
                      >
                        Xem Chi Tiết
                      </Link>

                      <Link
                       href={image.link}
                        className="border border-amber-500 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300 text-center flex-1 flex items-center justify-center"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" /> Mua Ngay
                      </Link>
                    </div>

                    {/* Certification tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      <span className="bg-gray-100 text-blue-800 text-xs px-2 py-1 rounded">✓ Chính Hãng</span>
                      <span className="bg-gray-100 text-blue-800 text-xs px-2 py-1 rounded">✓ Kiểm Định Chất Lượng</span>
                      <span className="bg-gray-100 text-blue-800 text-xs px-2 py-1 rounded">✓ OCOP 4 Sao</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm bg-blue-800/70 text-white p-1 sm:p-2 rounded-full hover:bg-blue-700 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm bg-blue-800/70 text-white p-1 sm:p-2 rounded-full hover:bg-blue-700 transition-all"
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
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentSlide === index ? "bg-amber-500 scale-125" : "bg-white/70"
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