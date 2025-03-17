"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface CertificateProps {
    certificates: {
        id: string;
        title: string;
        imageUrl: string;
    }[];
    title?: string;
    subtitle?: string;
}

const CertificateGallery: React.FC<CertificateProps> = ({
    certificates,
    title = "Chứng chỉ & Giấy tờ pháp lý",
    subtitle = "Các chứng nhận chất lượng và giấy tờ pháp lý của sản phẩm"
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        <section className="w-full bg-amber-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="relative">
                            {title}
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"></span>
                        </span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-800">
                        {subtitle}
                    </p>
                </div>

                {/* Certificate Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((certificate) => (
                        <div
                            key={certificate.id}
                            className="relative group cursor-pointer"
                            onClick={() => openModal(certificate.imageUrl)}
                        >
                            <div className="aspect-[1/1.414] bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 group-hover:shadow-xl group-hover:border-blue-300 transition-all duration-300">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={certificate.imageUrl}
                                        alt={certificate.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <div className="p-4 w-full">
                                            <h3 className="text-white font-medium text-lg truncate">{certificate.title}</h3>
                                            <div className="flex items-center mt-2">
                                                <span className="text-white text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                    </svg>
                                                    Xem chi tiết
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal xem ảnh lớn */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={closeModal}>
                    <div className="relative max-w-4xl mx-auto p-4 max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-blue-300"
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
                    </div>
                </div>
            )}
        </section>
    );
};

export default CertificateGallery;