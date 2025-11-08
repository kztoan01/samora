"use client";

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Home, Building, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './utils/useScrollAnimation';

export default function HeaderSection() {

  const { ref, isInView, containerVariants, itemVariants } = useScrollAnimation();
  const bannerMessages = [
      "🌺 Ưu đãi đặc biệt ngày 8/3 - Giảm 20% cho tất cả sản phẩm Rượu Sâm 🌺",
      "🎁 Tặng kèm Trà Sâm cao cấp cho đơn hàng từ 2 triệu đồng 🎁",
      "🚚 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1 triệu đồng 🚚",
      "💝 Quà tặng sang trọng - Rượu Sâm Ngọc Linh thượng hạng 💝",
      "✨ Nhập mã 'SAMTET' giảm thêm 10% cho đơn hàng đầu tiên ✨"
  ];
  return (
    <div className=' sticky top-0 z-30'>
    <motion.div 
    variants={itemVariants}
    className="bg-green-800 text-white py-2 px-4"
  >
    <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-2 md:mb-0">
        <div className="flex items-center">
          <Phone size={14} className="mr-1" />
          <span className="text-xs">Hotline: 0903 924 405</span>
        </div>
        <span className="mx-2 text-green-300 hidden sm:inline">|</span>
        <div className="flex items-center mt-1 sm:mt-0">
          <Mail size={14} className="mr-1" />
          <span className="text-xs">Email: maiphuccl@gmail.com</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link href="/gioi-thieu" className="text-xs hover:text-amber-300">Giới thiệu</Link>
        <span className="text-green-300">|</span>
        <Link href="/lien-he" className="text-xs hover:text-amber-300">Liên hệ</Link>
      </div>
    </div>
  </motion.div>

  {/* Main Header with Logo and Navigation */}
  <motion.div 
    variants={itemVariants}
    className="bg-white py-3 px-4 top-0"
  >
    <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center mb-3 md:mb-0">
        <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="Logo Samora"
          width={60}
          height={60}
          className="rounded-full mr-2 md:mr-3 w-[60px] md:w-[60px]"
        />
        </Link>
        <div className="text-center md:text-left">
          <h1 className="text-md md:text-xl font-bold text-green-800">Samora - QUẢNG NAM</h1>
          <p className="text-xs text-gray-600 hidden sm:block">Thương hiệu Sâm Ngọc Linh uy tín hàng đầu Việt Nam</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="bg-amber-100 text-amber-800 rounded-full py-1 px-3 text-xs whitespace-nowrap">Chứng nhận bởi Bộ Y Tế</span>
        <span className="bg-green-100 text-green-700 rounded-full py-1 px-3 text-xs whitespace-nowrap">Sản phẩm OCOP 4 Sao</span>
        <span className="bg-green-100 text-green-700 rounded-full py-1 px-3 text-xs whitespace-nowrap">Đạt tiêu chuẩn FDA</span>
        <span className="bg-purple-100 text-purple-700 rounded-full py-1 px-3 text-xs whitespace-nowrap">Chứng nhận ISO 9001</span>
      </div>
    </div>
  </motion.div>
  
  {/* Moving promotional banner */}
  <motion.div
    variants={itemVariants}
    className="bg-green-700 text-white p-2 overflow-hidden relative"
  >
    {/* Container with gradient */}
    <div className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, rgba(0, 128, 0, 1) 0%, rgba(0, 128, 0, 0) 15%, rgba(0, 128, 0, 0) 85%, rgba(0, 128, 0, 1) 100%)"
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
  </div>
  );
}