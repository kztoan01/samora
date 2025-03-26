"use client";

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Home, Building, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './utils/useScrollAnimation';

export default function FooterSection() {
  const { ref, isInView, containerVariants, itemVariants, fadeInVariants } = useScrollAnimation({
    threshold: 0.1,
    once: true
  });

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gradient-to-b from-zinc-50 to-zinc-100 text-black py-12"
    >
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <div className="flex items-center mb-6">
              {/* Logo */}
              <div className="w-16 h-16 mr-3 relative">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  fill
                  className="rounded-full bg-blue-500 object-contain"
                />
              </div>
              {/* Company Name */}
              <h2 className="text-xl md:text-2xl font-bold">Sâm Ngọc Linh Bảo Ly</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Chúng tôi tự hào là đơn vị tiên phong trong việc sản xuất và phân phối 
              Rượu Sâm Ngọc Linh chất lượng cao, được chế biến từ những củ sâm Ngọc Linh 
              quý hiếm trên dãy Trường Sơn của Việt Nam.
            </p>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Thông Tin Liên Hệ</h3>
            
            <div className="space-y-4">
              {/* Main Office */}
              <motion.div 
                variants={fadeInVariants}
                className="flex items-start"
              >
                <Home className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Trụ sở chính:</p>
                  <p className="text-gray-600">15 Chế Lan Viên, Phường Tân Thạnh, Thành phố Tam Kỳ, Tỉnh Quảng Nam</p>
                </div>
              </motion.div>
              
              {/* Representative Office */}
              <motion.div 
                variants={fadeInVariants}
                className="flex items-start"
              >
                <Building className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Văn phòng đại diện:</p>
                  <p className="text-gray-600">32/5/10 Đường số 12, Phường 11, Quận Gò Vấp, TP.Hồ Chí Minh</p>
                </div>
              </motion.div>
              
              {/* Email */}
              <motion.div 
                variants={fadeInVariants}
                className="flex items-center"
              >
                <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <a href="mailto:maiphuccl@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  maiphuccl@gmail.com
                </a>
              </motion.div>
              
              {/* Phone */}
              <motion.div 
                variants={fadeInVariants}
                className="flex items-center"
              >
                <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <a href="tel:0903924405" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Hotline: 0903 924 405
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Links */}
          <motion.div variants={itemVariants}>
            <div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Liên Kết Nhanh</h3>
                <ul className="space-y-2">
                  <motion.li variants={fadeInVariants}>
                    <Link href="/gioi-thieu" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      <span>Giới Thiệu</span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInVariants}>
                    <Link href="/san-pham" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      <span>Sản Phẩm</span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInVariants}>
                    <Link href="#chung-chi" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      <span>Chứng Chỉ</span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInVariants}>
                    <Link href="/lien-he" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      <span>Liên Hệ</span>
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Banner */}
        <motion.div 
          variants={itemVariants}
          className="bg-blue-600 text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <p className="text-center md:text-left mb-4 md:mb-0">
            Liên hệ với chúng tôi để được tư vấn và báo giá tốt nhất!
          </p>
          <a 
            href="tel:0903924405" 
            className="bg-white text-blue-600 hover:bg-blue-50 transition-all font-bold py-2 px-6 rounded-md inline-flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            0903 924 405
          </a>
        </motion.div>
  
        {/* Bottom Copyright */}
        <motion.div 
          variants={fadeInVariants}
          className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm"
        >
          <p>© {new Date().getFullYear()} Sâm Ngọc Linh Bảo Ly. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}