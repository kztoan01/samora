'use client'
import { Product } from './api';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProductListProps {
    products: Product[];
    isChebien: boolean;
}

export default function ProductList({ products, isChebien }: ProductListProps) {
    const [leaves, setLeaves] = useState<Array<{id: number, x: number, y: number, rotation: number, scale: number}>>([]);
    // Sort products by price (non-zero first, then zero)
    const sortedProducts = [...products].sort((a, b) => {
        if (a.price === 0 && b.price !== 0) return 1;
        if (a.price !== 0 && b.price === 0) return -1;
        return 0;
    });

    useEffect(() => {
        // Tạo các lá cây ngẫu nhiên khi component mount
        const generateLeaves = () => {
            const numberOfLeaves = 30; // Số lượng lá cây
            const newLeaves = [];
            
            for (let i = 0; i < numberOfLeaves; i++) {
                newLeaves.push({
                    id: i,
                    x: Math.random() * 100, // Vị trí ngẫu nhiên theo chiều ngang (%)
                    y: Math.random() * 100, // Vị trí ngẫu nhiên theo chiều dọc (%)
                    rotation: Math.random() * 360, // Góc xoay ngẫu nhiên
                    scale: 0.5 + Math.random() * 0.5, // Kích thước ngẫu nhiên từ 0.5 đến 1
                });
            }
            
            setLeaves(newLeaves);
        };
        
        generateLeaves();
        
        // Tạo hiệu ứng animation cho lá cây
        const interval = setInterval(() => {
            setLeaves(prevLeaves => prevLeaves.map(leaf => ({
                ...leaf,
                rotation: leaf.rotation + (Math.random() * 2 - 1), // Xoay nhẹ
                y: leaf.y + 0.05, // Rơi nhẹ xuống
                x: leaf.x + (Math.random() * 0.4 - 0.2), // Di chuyển nhẹ theo chiều ngang
            })));
        }, 100);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-8xl mx-auto mt-4 relative overflow-hidden">
            {/* Lá cây trang trí */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {leaves.map((leaf) => (
                    <div
                        key={leaf.id}
                        className="absolute w-16 h-16 md:w-24 md:h-24 transition-all duration-1000 ease-in-out"
                        style={{
                            left: `${leaf.x}%`,
                            top: `${leaf.y}%`,
                            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
                            opacity: 0.5,
                            zIndex: Math.floor(leaf.y) % 2 === 0 ? 10 : 0, // Một số lá phía trên, một số lá phía dưới
                            overflow: 'visible',
                        }}
                    >
                        <img 
                            src={`/leaf-${(leaf.id % 3) + 1}.png`} 
                            alt="Lá cây" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Background hiệu ứng rừng cây */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-green-100/20 pointer-events-none"></div>

            {/* Cards container */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-0 relative z-20">
                {sortedProducts.map(product => (
                    <div
                        key={product._id}
                        className="flex-shrink-0 transition-opacity duration-300 md:p-2 p-1 relative"
                    >
                        <Link href={`/san-pham/chi-tiet/${product.slug}`}>
                            <div className="absolute z-10">
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
                                    <ul className="flex">
                                        <li key={product._id}>
                                            <span className="block px-4 py-2 text-[0.60rem] md:text-sm font-semibold text-black transition-all">
                                                {isChebien ? product.name : product.category}
                                            </span>
                                        </li>
                                    </ul>
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
                            <div className="bg-white rounded-xl overflow-hidden transition-opacity duration-300 relative group ">
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute bottom-2 left-2 bg-blue-500 p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <p className="text-[0.60rem] md:text-sm font-semibold text-white">{product.price !== 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) : "Liên Hệ"}</p>
                                </div>

                                {/* New white box in bottom right */}
                                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-tl-3xl">
                                    <div className="absolute -left-4 bottom-0">
                                        <div className="w-4 h-4 relative bg-white/0">
                                            <div
                                                className="absolute top-0 left-0 w-4 h-4 bg-white"
                                                style={{
                                                    clipPath: 'path("M0 16C8.83656 16 16 7.16344 16 0L16 16L0 16Z")'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[0.60rem] md:text-sm font-semibold text-black">{isChebien ? product.category : product.name}</p>
                                    <div className="absolute md:bottom-9 bottom-7 right-0">
                                        <div className="w-4 h-4 relative bg-white/0">
                                            <div
                                                className="absolute bottom-0 left-0 w-4 h-4 bg-white"
                                                style={{
                                                    clipPath: 'path("M0 16C8.83656 16 16 7.16344 16 0L16 16L0 16Z")'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}