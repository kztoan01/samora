'use client'
import Link from 'next/link';
import { Category, getAllCategories, getAllProducts, Product } from './api';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Nav from './Nav';
import { motion } from 'motion/react';
import BenefitsAccordion from './Accordion';
import { useCart } from './CartContext';
import ProductList from './ProductList';
import IntroSection from './Introduction';
import Cart from './Cart';
import { ProductDetailSkeleton } from './Skeleton';


interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [selectedVolumePrice, setSelectedVolumePrice] = useState(product?.volumePrices?.length > 0 ? product.volumePrices[0] : null);

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const bannerMessages = [
        "🌺 Ưu đãi đặc biệt ngày 8/3 - Giảm 20% cho tất cả sản phẩm Rượu Sâm 🌺",
        "🎁 Tặng kèm Trà Sâm cao cấp cho đơn hàng từ 2 triệu đồng 🎁",
        "🚚 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1 triệu đồng 🚚",
        "💝 Quà tặng sang trọng - Rượu Sâm Ngọc Linh thượng hạng 💝",
        "✨ Nhập mã 'SAMTET' giảm thêm 10% cho đơn hàng đầu tiên ✨"
    ];
    const images = [
        { src: "/hero.jpg", name: "Product 1", price: "$100" },
        { src: "/hero.jpg", name: "Product 2", price: "$120" },
        { src: "/hero.jpg", name: "Product 3", price: "$90" },
        { src: "/hero.jpg", name: "Product 4", price: "$150" },
        { src: "/hero.jpg", name: "Product 5", price: "$80" },
        { src: "/hero.jpg", name: "Product 6", price: "$110" },
        { src: "/hero.jpg", name: "Product 7", price: "$95" },
        { src: "/hero.jpg", name: "Product 8", price: "$130" }
    ];
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        if (product?.volumePrices?.length > 0) {
            if (selectedVolumePrice) {
                addToCart({
                    ...product,
                    selectedVolume: selectedVolumePrice.volume,
                    selectedPrice: selectedVolumePrice.price.originalPrice,
                }, quantity);
            }
        } else if (product.price) {
            // For products with single price
            addToCart({
                ...product,
                selectedVolume: undefined,
                selectedPrice: product.price,
            }, quantity);
        }
    };
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get min and max prices across all volume options
    const getMinMaxPrices = () => {
        if (!product?.volumePrices || product.volumePrices.length === 0) {
            return { min: 0, max: 0 };
        }
        
        const prices = product.volumePrices.map(vp => 
            vp.price.originalPrice
        );
        
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    };

    const { min: minPrice, max: maxPrice } = getMinMaxPrices();
    const hasMultipleVolumes = product?.volumePrices?.length > 1;
    const formatPrice = (price: number) => 
        new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(price);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [fetchedProducts, fetchedCategories] = await Promise.all([
                    getAllProducts(),
                    getAllCategories(),
                ]);
                setProducts(fetchedProducts.slice(0, 4));
                setCategories(fetchedCategories);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    const [isCartOpen, setIsCartOpen] = useState(false);
    if (loading) {
        return <ProductDetailSkeleton showVolume={!!product?.volumePrices?.length} />;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    const getDisplayPrice = () => {
        if (product?.volumePrices?.length > 0) {
            if (selectedVolumePrice && selectedVolumePrice.price.originalPrice > 0) {
                return new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND'
                }).format(selectedVolumePrice.price.originalPrice);
            }
        } else if (product.price && product.price > 0) {
            return new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND'
            }).format(product.price);
        }
        return "Liên Hệ";
    };

    // Update the hasValidPrice function to return false when price is 0
    const hasValidPrice = () => {
        if (product?.volumePrices?.length > 0) {
            // Check if any volume price is greater than 0
            return product.volumePrices.some(vp => vp.price.originalPrice > 0);
        }
        // Check single price
        return product.price !== undefined && product.price > 0;
    };

    return (
        <>

            <div className="relative mb-1 px-1">
                <Nav />
            </div>
            <div className="flex flex-col md:flex-row h-screen">
                {/* Sticky Image Section (3/5 width) */}
                <div className="md:w-3/5 h-1/2 md:h-screen md:sticky md:top-0">
                    <div className="h-full flex items-center justify-center relative md:p-3 p-2 rounded-xl">
                        {selectedImage ? (
                            <div className="relative h-full w-full">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="object-cover h-full w-full rounded-xl"
                                    style={{ objectPosition: 'right center' }}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full w-full text-gray-400">
                                Không có hình ảnh
                            </div>
                        )}

                        {/* Thumbnail Navigation */}
                        {product.images.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`h-16 w-16 border-2 rounded-md overflow-hidden transition-all ${selectedImage === img ? 'border-green-600 shadow-md' : 'border-gray-200'
                                            }`}
                                    >
                                        <div className="relative h-full w-full">
                                            <img
                                                src={img}
                                                alt={`${product.name} - Thumbnail ${index + 1}`}
                                                className="object-cover h-full w-full"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Section (2/5 width) */}
                <div className="w-full md:w-2/5 md:py-3 px-2 md:px-3 md:pr-3 overflow-y-auto">
                    <div
                        className="bg-zinc-100 items-center justify-center text-black p-4 md:p-12 rounded-xl overflow-hidden relative"
                    >
                        <div className="mb-6 md:mb-12">
                            <Link
                                href="/san-pham"
                                className="text-zinc-600 text-sm hover:underline inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Quay lại tất cả sản phẩm
                            </Link>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-normal">{product.category} {product.name}</h1>

                        <div className="mt-4 md:mt-6 flex flex-wrap items-center">
                            <span className="text-xl md:text-3xl font-medium text-green-600">
                                {getDisplayPrice()}
                            </span>

                            <span className={` ml-2 md:ml-4 px-2 py-1 text-sm rounded ${product.stock > 0 || product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {product.stock > 0 || product.isAvailable ? 'Còn hàng' : 'Hết hàng'}
                            </span>
                        </div>

                        <div className="mt-4 md:mt-6 text-zinc-600 text-sm md:text-base">
                            {product.description}
                        </div>

                       {product?.volumePrices?.length > 0 ? (
                        <div className="mt-8 lg:mt-10 flex flex-col gap-4">
                            {/* Volume Selection */}
                            {product?.volumePrices?.length > 1 && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Chọn Dung Tích:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product?.volumePrices?.map((vp, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedVolumePrice(vp)}
                                                className={`px-4 py-2 border rounded-md ${
                                                    selectedVolumePrice === vp 
                                                    ? 'border-green-500 bg-green-50 text-green-700' 
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm font-medium">{vp.volume}</span>
                                                    <span className="text-xs mt-1">
                                                        {formatPrice(vp.price.originalPrice)}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Only show quantity and add to cart if price > 0 */}
                            {hasValidPrice() && (
                                <div className="mt-4 lg:mt-6 mb-4 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0">
                                    <div className="flex items-center">
                                        <span className="mr-3 font-medium">Số lượng:</span>
                                        <div className="flex items-center border border-gray-300 rounded-md space-x-2">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-r border-gray-300"
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-2 min-w-[40px] text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={increaseQuantity}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-l border-gray-300"
                                                disabled={quantity >= product.stock}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button onClick={() => {
                                        handleAddToCart()
                                        setIsCartOpen(true)
                                    }}
                                        className="w-full lg:w-auto px-6 lg:ml-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 flex-grow lg:flex-grow-0">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            )}
                        </div>
                       ) : (
                        <div className="mt-8 lg:mt-10 flex flex-col gap-4">
                            {/* Only show quantity and add to cart if price > 0 */}
                            {hasValidPrice() && (
                                <div className="mt-4 lg:mt-6 mb-4 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0">
                                    <div className="flex items-center">
                                        <span className="mr-3 font-medium">Số lượng:</span>
                                        <div className="flex items-center border border-gray-300 rounded-md space-x-2">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-r border-gray-300"
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-2 min-w-[40px] text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={increaseQuantity}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-l border-gray-300"
                                                disabled={quantity >= product.stock}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {
                                            handleAddToCart()
                                            setIsCartOpen(true)
                                        }}
                                        className="w-full lg:w-auto px-6 lg:ml-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 flex-grow lg:flex-grow-0"
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            )}
                        </div>
                       )}
                       

                    </div>
                
                    <motion.div
                        className="bg-green-600 text-white p-3 mt-4 rounded-xl overflow-hidden relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Container cố định với gradient */}
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
                                    duration: 20,
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

                    <div className="mt-4 space-y-2">
                        <BenefitsAccordion 
                            text="Công Dụng" 
                            content={
                                <ul className="list-disc pl-4">
                                    {product.benefits?.split('\n').map((item, index) => (
                                        <li key={index} className="mb-1">{item.trim()}</li>
                                    ))}
                                </ul>
                            }
                        />
                        <BenefitsAccordion 
                            text="Thành Phần" 
                            content={
                                <ul className="list-disc pl-4">
                                    {product.ingredients.split('\n').map((item, index) => (
                                        <li key={index} className="mb-1">{item.trim()}</li>
                                    ))}
                                </ul>
                            }
                        />
                        <BenefitsAccordion text="Hướng Dẫn Sử Dụng" content={
                                <ul className="list-disc pl-4">
                                    {product.usageInstructions.split('\n').map((item, index) => (
                                        <li key={index} className="mb-1">{item.trim()}</li>
                                    ))}
                                </ul>
                            } />
                        <BenefitsAccordion text="Cách Bảo Quản" content={
                                <ul className="list-disc pl-4">
                                    {product.storageInstructions.split('\n').map((item, index) => (
                                        <li key={index} className="mb-1">{item.trim()}</li>
                                    ))}
                                </ul>
                            } />
                    </div>
                </div>
            </div>
            <IntroSection />
            {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </>
    );
}