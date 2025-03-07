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

  // Auto rotate banner messages
  // useEffect(() => {
  // const interval = setInterval(() => {
  //     setBannerMessage((prev) => (prev + 1) % bannerMessages.length);
  // }, 4000);
  // return () => clearInterval(interval);
  // }, [bannerMessages.length]);



  // Auto rotate carousel
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 100000);
  //   return () => clearInterval(interval);
  // }, []);
  const navItems = [
    { title: 'Cửa Hàng', href: '/san-pham' },
    {
      title: 'Sản Phẩm', href: '/san-pham', dropdown: [
        { title: 'Rượu Sâm Ngọc Linh', href: '/san-pham/ruou-sam-ngoc-linh', image: '/hero.jpg' },
        { title: 'Rượu Lá Sâm Ngọc Linh', href: '/san-pham/ruou-la-sam-ngoc-linh', image: '/hero.jpg' },
        { title: 'Rượu Hoa Sâm Ngọc Linh', href: '/san-pham/ruou-hoa-sam-ngoc-linh', image: '/hero.jpg' },
        { title: 'Rượu Sâm Ngọc Linh Cây Và Củ', href: '/san-pham/ruou-sam-ngoc-linh-cay-cu', image: '/hero.jpg' },
        { title: 'Rượu Hồng Đào Sâm Ngọc Linh', href: '/san-pham/ruou-hong-dao-sam-ngoc-linh', image: '/hero.jpg' },
        { title: 'Các Sản Phẩm Chế Biến', href: '/san-pham/che-bien', image: '/hero.jpg' },
        { title: 'Sâm Ngọc Linh Củ Tươi', href: '/san-pham/sam-ngoc-linh-cu-tuoi', image: '/hero.jpg' },
        { title: 'Cây Giống Và Hạt Sâm Ngọc Linh', href: '/san-pham/cay-giong-hat', image: '/hero.jpg' },
      ]
    },
    { title: 'Giới Thiệu', href: '/about' },
    { title: 'Liên Hệ', href: '/contact' },
  ];
  const topRightNavItems = [
    { title: 'Đăng Nhập', href: '/login' },
    { title: 'Đăng Ký', href: '/register' },
    { title: 'Giỏ Hàng', href: '/cart' },
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
  
  // Autoplay functionality
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (autoplayEnabled) {
  //     interval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  //     }, 5000); // Change slide every 5 seconds
  //   }
  //   return () => clearInterval(interval);
  // }, [carouselImages.length, autoplayEnabled]);
  
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
    <div className="md:h-screen h-[35rem] w-full max-w-8xl mx-auto p-4 space-y-3 bg-white">
      {/* Moving banner */}
      <motion.div
        className="bg-blue-700 text-white p-2 rounded-xl overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Container cố định với gradient */}
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
      className="relative w-full h-[calc(100vh-23rem)] md:h-[calc(100vh-5rem)] rounded-xl overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Menu */}
      <Nav />
      
      {/* Carousel */}
      <div className="w-full md:h-full h-[30rem] relative">
        {carouselImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full md:h-full h-[30rem]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full md:h-full h-[30rem] bg-[#D1D1CE]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover ${image.src == "/sam.png" ? "object-[50%_25%]" : "object-[50%_55%]" }`}
                priority={index === 0} // Prioritize loading the first image
              />
              
              {/* Content overlay - responsive positioning and sizing */}
              <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-16 left-4 sm:left-8 md:left-12 lg:left-16 z-20 w-[90%] sm:w-[80%] md:w-[60%] lg:max-w-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0, 
                    y: currentSlide === index ? 0 : 20 
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="backdrop-blur-md bg-blue-700/70 p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl text-white"
                >
                  <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 md:mb-2">{image.title}</h2>
                  <p className="text-gray-200 mb-1 md:mb-2 text-xs sm:text-sm">{image.subtitle}</p>
                  <Link 
                    href={image.link} 
                    className="text-zinc-100 hover:text-zinc-300 text-xs sm:text-sm transition duration-200"
                  >
                    Xem Thêm
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation buttons - hide on smaller screens, show on medium and up */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm text-white p-1 sm:p-2 rounded-full hover:bg-white/40 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm text-white p-1 sm:p-2 rounded-full hover:bg-white/40 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Dots navigation - adjusted positioning for all screen sizes */}
        <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1 sm:space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-white scale-125" : "bg-white/50"
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