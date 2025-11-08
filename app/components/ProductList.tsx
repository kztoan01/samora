'use client'
import { Product } from './api';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProductListProps {
    products: Product[];
    isChebien: boolean;
}

export default function ProductList({ products, isChebien }: ProductListProps) {
    const [leaves, setLeaves] = useState<Array<{ id: number, x: number, y: number, rotation: number, scale: number }>>([]);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger once
        threshold: 0.1 // Trigger when 10% of the component is visible
    });

    // Get min price for each product
    const getMinPrice = (product: Product) => {
        if (!product.volumePrices || product.volumePrices.length === 0) {
            return 0;
        }

        const prices = product.volumePrices.map(vp =>
            vp.price.originalPrice
        );

        return Math.min(...prices);
    };

    // Sort products by price (non-zero first, then zero)
    const sortedProducts = [...products].sort((a, b) => {
        const aMinPrice = getMinPrice(a);
        const bMinPrice = getMinPrice(b);

        if (aMinPrice === 0 && bMinPrice !== 0) return 1;
        if (aMinPrice !== 0 && bMinPrice === 0) return -1;
        return 0;
    });

    // Format price with price range for multiple volumes
    const formatProductPrice = (product: Product) => {
        // For products with volume prices
        if (product.volumePrices && product.volumePrices.length > 0) {
            const firstPrice = product.volumePrices[0].price.originalPrice;

            return firstPrice === 0 ? "Liên Hệ" : new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(firstPrice);
        }

        // For products with single price
        if (product.price !== undefined) {
            return product.price === 0 ? "Liên Hệ" : new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(product.price);
        }

        // Fallback
        return "Liên Hệ";
    };

    // Product animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    useEffect(() => {
        // Leaf generation effect (same as before)
        const generateLeaves = () => {
            const numberOfLeaves = 30;
            const newLeaves = [];

            for (let i = 0; i < numberOfLeaves; i++) {
                newLeaves.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    rotation: Math.random() * 360,
                    scale: 0.5 + Math.random() * 0.5,
                });
            }

            setLeaves(newLeaves);
        };

        generateLeaves();

        // Leaf animation interval
        const interval = setInterval(() => {
            setLeaves(prevLeaves => prevLeaves.map(leaf => ({
                ...leaf,
                rotation: leaf.rotation + (Math.random() * 2 - 1),
                y: leaf.y + 0.05,
                x: leaf.x + (Math.random() * 0.4 - 0.2),
            })));
        }, 100);

        // Trigger animation when component comes into view
        if (inView) {
            controls.start("visible");
        }

        return () => clearInterval(interval);
    }, [inView, controls]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={containerVariants}
            className="max-w-8xl mx-auto mt-4 relative overflow-hidden"
        >


            {/* Cards container */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-0 relative z-20">
                {sortedProducts.map((product) => (
                    <motion.div
                        key={product._id}
                        variants={itemVariants}
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
                                            <span className="block px-2 sm:px-4 py-1 sm:py-2 text-[0.55rem] sm:text-xs md:text-sm font-semibold text-black transition-all truncate max-w-[100px] sm:max-w-[120px] md:max-w-none">
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

                                <motion.div className="w-full h-full overflow-hidden">
                                    <motion.img
                                        src={product.images[0]}
                                        alt={product.name}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="w-full h-[12rem] sm:h-[16rem] md:h-[22rem] lg:h-[26rem] xl:h-[30rem] object-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{ objectPosition: '60% center' }}
                                    />
                                </motion.div>

                                {/* Price badge - visible on mobile and on hover for larger screens */}
                                <div className="absolute bottom-2 left-2 bg-green-500 p-1.5 sm:p-2 rounded-lg shadow-md sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                                    <p className="text-[0.55rem] sm:text-xs md:text-sm font-semibold text-white">
                                        {formatProductPrice(product)}
                                    </p>
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
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}