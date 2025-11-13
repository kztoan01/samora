"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, FacebookIcon, Headphones, InstagramIcon, Leaf, Menu, Search, Settings, Shield, ShoppingCart, Twitter, Wine, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContext';
import Cart from './Cart';
import { useScrollAnimation } from './utils/useScrollAnimation';

export default function Nav() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerMessage, setBannerMessage] = useState(0);


  const navItems = [
    { title: 'Cửa Hàng', href: '/san-pham' },
    {
      title: 'Sản Phẩm', href: '/san-pham', dropdown: [
        { title: 'Rượu Sâm Ngọc Linh 700ml', href: '/san-pham/ruou-sam-ngoc-linh', image: '/Thiết kế chưa có tên (2).png' },
        { title: 'Rượu Sâm Ngọc Linh 500ml', href: '/san-pham/ruou-sam-ngoc-linh', image: '/Thiết kế chưa có tên (3).png' },
        { title: 'Rượu Sâm Ngọc Linh 3000ml', href: '/san-pham/ruou-sam-ngoc-linh', image: '/3l.jpg' },
        { title: 'Rượu Sâm Ngọc Linh 2000ml', href: '/san-pham/ruou-sam-ngoc-linh', image: '/2l.jpg' },
        { title: 'Rượu Sâm Ngọc Linh 1800ml', href: '/san-pham/ruou-sam-ngoc-linh', image: '/1l8.jpg' },
        // { title: 'Rượu Lá Sâm Ngọc Linh', href: '/san-pham/ruou-la-sam-ngoc-linh', image: '/la3l.png' },
        // { title: 'Rượu Hoa Sâm Ngọc Linh', href: '/san-pham/ruou-hoa-sam-ngoc-linh', image: '/hoa1l.png' },
        // { title: 'Rượu Sâm Ngọc Linh Cây Và Củ', href: '/san-pham/ruou-sam-ngoc-linh-cay-cu', image: '/caycu.png' },
        // { title: 'Rượu Hồng Đào Sâm Ngọc Linh', href: '/san-pham/ruou-hong-dao-sam-ngoc-linh', image: '/hongdao.png' },
        // { title: 'Các Sản Phẩm Chế Biến', href: '/san-pham/che-bien', image: '/matong.png' },
        // { title: 'Sâm Ngọc Linh Củ Tươi', href: '/san-pham/sam-ngoc-linh-cu-tuoi', image: '/cutuoi.jpg' },
        // { title: 'Cây Giống Và Hạt Sâm Ngọc Linh', href: '/san-pham/cay-giong-hat', image: '/hatsam.jpg' },
      ]
    },
    { title: 'Sâm Ngọc Linh', href: '/ve-sam-ngoc-linh' },
    { title: 'Giới Thiệu', href: '/gioi-thieu' },
    { title: 'Liên Hệ', href: '/lien-he' },

  ];
  const topRightNavItems = [
    { title: 'Đăng Nhập', href: '/login' },
    { title: 'Đăng Ký', href: '/register' },
    { title: 'Giỏ Hàng', href: '/cart' },
  ];
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { ref, isInView, containerVariants, itemVariants } = useScrollAnimation();
  const bannerMessages = [
      "🌺 Ưu đãi đặc biệt ngày 8/3 - Giảm 20% cho tất cả sản phẩm Rượu Sâm 🌺",
      "🎁 Tặng kèm Trà Sâm cao cấp cho đơn hàng từ 2 triệu đồng 🎁",
      "🚚 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1 triệu đồng 🚚",
      "💝 Quà tặng sang trọng - Rượu Sâm Ngọc Linh thượng hạng 💝",
      "✨ Nhập mã 'SAMTET' giảm thêm 10% cho đơn hàng đầu tiên ✨"
  ];
  return (

<>

      {/* Main Navigation Container */}
      <div className="absolute z-20 ">
        {/* Top right square box */}
        <div className="absolute -right-4">
          <div className="w-4 h-4 relative bg-white/0">
            <div
              className="absolute top-0 right-0 w-4 h-4 bg-white"
              style={{
                clipPath: 'path("M16 0C7.16344 0 0 8.83656 0 16L0 0L16 0Z")'
              }}
            />
          </div>
        </div>

        <nav className="bg-white rounded-br-3xl">
          <motion.div 
            className="container mx-auto flex items-center justify-between pb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo and Company Name */}
            <div className="flex items-center ml-2">
              <Link href="/" className="items-center space-x-2 md:flex hidden">
                <span className="text-black text-base font-semibold">
                  Samora
                </span>
              </Link>
              <Link href="/" className="items-center space-x-2 md:hidden">
                <span className="text-base font-bold text-black">
                  Samora
                </span>
              </Link>
             
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex ml-2 mr-4">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  <a
                    href={item.href}
                    className="flex items-center text-sm px-2 py-2 font-medium text-black relative group"
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault();
                        handleDropdownToggle(index);
                      }
                    }}
                  >
                    {/* Text */}
                    <span className="relative">
                      {item.title}
                      {/* Underline */}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </span>

                    {/* Dropdown Icon with rotation animation */}
                    {item.dropdown && (
                      <motion.div
                        animate={{ rotate: openDropdown === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="absolute bg-white shadow-lg rounded-xl mt-2 w-[45rem] overflow-hidden"
                      >
                        <ul className="grid grid-cols-2 gap-2 p-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <motion.li
                              key={subIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.05 * subIndex,
                              }}
                              className="bg-zinc-100 rounded-xl"
                            >
                              <Link
                                href={subItem.href}
                                className="flex items-center text-sm p-2 text-black rounded-xl font-semibold hover:bg-green-100"
                              >
                                <Image
                                  src={subItem.image}
                                  alt={subItem.title}
                                  width={112}
                                  height={112}
                                  loading="lazy"
                                  className="h-28 w-28 mr-4 rounded-xl object-cover"
                                />
                                <span>{subItem.title}</span>
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Hamburger Menu Button - Only visible on mobile */}
            <button 
              className="md:hidden mr-4 p-1 focus:outline-none" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-black ml-2" />
              ) : (
                <Menu className="h-5 w-5 text-black ml-2" />
              )}
            </button>
          </motion.div>
        </nav>
        
        {/* Bottom square box */}
        <div className="w-4 h-4 relative bg-white/0">
          <div
            className="absolute top-0 right-0 w-4 h-4 bg-white"
            style={{
              clipPath: 'path("M16 0C7.16344 0 0 8.83656 0 16L0 0L16 0Z")'
            }}
          />
        </div>
      </div>

      {/* Top Right Nav (Cart & Search) */}
      <div className="absolute top-0 right-0 z-20">
        <div className="absolute -left-4">
          <div className="w-4 h-4 relative bg-white/0">
            <div
              className="absolute top-0 left-0 w-4 h-4 bg-white"
              style={{
                clipPath: 'path("M0 0C8.83656 0 16 8.83656 16 16L16 0L0 0Z")'
              }}
            />
          </div>
        </div>

        <nav className="bg-white rounded-bl-3xl">
          <motion.ul 
            className="flex items-center py-2 px-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <li>
              <Link href="/">
                <Search className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4" />{" "}
                  {isMounted ? (
                    <span className="text-sm items-center">
                      ({cart.length > 0 ? cart.length : 0})
                    </span>
                  ) : (
                    <span className="text-sm items-center">0</span>
                  )}
                </button>
              </div>
           
            </li>
          </motion.ul>
        </nav>
       
        <div className="absolute right-0">
          <div className="w-4 h-4 relative bg-white/0">
            <div
              className="absolute top-0 left-0 w-4 h-4 bg-white"
              style={{
                clipPath: 'path("M0 0C8.83656 0 16 8.83656 16 16L16 0L0 0Z")'
              }}
            />
          </div>
        </div>
      </div>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full w-4/5 bg-white overflow-y-auto z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <span className="text-xl font-bold">Samora</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="p-4">
                {navItems.map((item, index) => (
                  <div key={index} className="mb-4">
                    {/* Main Category */}
                    <div 
                      className="flex justify-between items-center py-2 border-b"
                      onClick={() => {
                        if (item.dropdown) {
                          handleDropdownToggle(index);
                        }
                      }}
                    >
                      <a 
                        href={item.dropdown ? "#" : item.href}
                        className="text-base font-medium"
                        onClick={(e) => {
                          if (item.dropdown) {
                            e.preventDefault();
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                      >
                        {item.title}
                      </a>
                      
                      {item.dropdown && (
                        <motion.div
                          animate={{ rotate: openDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      )}
                    </div>

                    {/* Show all dropdown items directly in mobile view */}
                    {item.dropdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: openDropdown === index ? "auto" : 0,
                          opacity: openDropdown === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-2 ml-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <div key={subIndex} className="flex items-center p-2 bg-gray-100 rounded-lg">
                              <img
                                src={subItem.image}
                                alt={subItem.title}
                                className="h-16 w-16 rounded-md mr-2"
                              />
                              <a
                                href={subItem.href}
                                className="text-sm font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </a>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}