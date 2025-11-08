"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './utils/useScrollAnimation';

interface CertificateItem {
    id: string;
    imageUrl: string;
}

interface CertificateCategory {
    id: string;
    title: string;
    description: string;
    items: CertificateItem[];
}

interface CertificateProps {
    categories: CertificateCategory[];
    title?: string;
    subtitle?: string;
    id?: string;
}

const CertificateGallery: React.FC<CertificateProps> = ({
    categories,
    title = "Chứng chỉ & Giấy tờ pháp lý",
    subtitle = "Các chứng nhận chất lượng và giấy tờ pháp lý của sản phẩm"
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { ref, isInView, containerVariants, itemVariants, fadeInVariants } = useScrollAnimation({
        threshold: 0.1,
        once: true
    });

    // Mở modal xem ảnh lớn
    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        document.body.style.overflow = 'hidden';
    };

    // Đóng modal
    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <motion.section 
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="w-full bg-green-50 py-12 mt-6"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    variants={fadeInVariants}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="relative">
                            {title}
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-green-500"></span>
                        </span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-800">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="space-y-12">
                    {categories.map((category, categoryIndex) => (
                        <motion.div 
                            key={category.id} 
                            variants={itemVariants}
                            custom={categoryIndex}
                            className="bg-amber-50 text-center rounded-lg shadow-md p-6"
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                            <p className="text-gray-600 text-sm md:text-base mb-6">{category.description}</p>
                            
                            {/* Certificate Gallery for this category */}
                            <div className={`${category.items.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
                                {category.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        custom={itemIndex}
                                        className={`relative group cursor-pointer ${category.items.length === 1 ? 'w-full max-w-2xl' : 'w-full'}`}
                                        onClick={() => openModal(item.imageUrl)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="aspect-[1/1.414] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group-hover:shadow-xl group-hover:border-green-300 transition-all duration-300">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={`${category.title} - Tài liệu`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                    <div className="p-4 w-full text-center">
                                                        <span className="text-white text-base flex items-center justify-center">
                                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                            </svg>
                                                            Xem chi tiết
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Modal xem ảnh lớn */}
            {selectedImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" 
                    onClick={closeModal}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        className="relative max-w-4xl mx-auto p-4 max-h-[90vh]" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-green-300"
                            onClick={closeModal}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden" style={{ width: '100%', maxHeight: '85vh' }}>
                            <Image
                                src={selectedImage}
                                alt="Certificate detail"
                                width={595}  // A4 width in pixels at 72dpi
                                height={842} // A4 height in pixels at 72dpi
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.section>
    );
};

export default CertificateGallery;