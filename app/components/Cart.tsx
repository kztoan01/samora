"use client";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useState } from "react";

interface CartProps {
    onClose: () => void; // Function to close the cart
}

const Cart = ({ onClose }: CartProps) => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    
    const handleCheckout = () => {
       router.push('/thanh-toan')
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    // Calculate price based on selected price if available, otherwise use first volume price
    const getItemPrice = (item: any) => {
        // If item has selected price (from volume prices)
        if (item.product.selectedPrice) {
            return item.product.selectedPrice;
        }
        
        // If item has volume prices
        if (item.product.volumePrices && item.product.volumePrices.length > 0) {
            const firstVolumePrice = item.product.volumePrices[0];
            return firstVolumePrice.price.discountPrice || firstVolumePrice.price.originalPrice;
        }
        
        // If item has single price
        if (item.product.price) {
            return item.product.price;
        }
        
        return 0;
    };

    const subtotal = cart.reduce((total, item) => total + getItemPrice(item) * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-[1000]">
            <div className="bg-white w-96 h-full p-3 overflow-y-auto shadow-xl z-[1100] relative">
                <div className="flex justify-between items-center mb-6 bg-green-100 rounded-xl px-4 py-2">
                    <h2 className="text-base font-semibold">Giỏ hàng ({cart.length} sản phẩm)</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-3xl bg-green-200 rounded-xl px-2">
                        &times;
                    </button>
                </div>
                {cart.length === 0 ? (
                    <p>Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={`${item.product._id}-${item.product.selectedVolume || ''}`} className="flex justify-between items-center border-b py-4 px-2">
                                <div className="flex items-center">
                                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 mr-4 rounded-xl" />
                                    <div>
                                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                                        {item.product.selectedVolume && (
                                            <p className="text-xs text-gray-600 mt-1">
                                                Dung tích: {item.product.selectedVolume}
                                            </p>
                                        )}
                                        <p className="text-xs font-semibold mt-2">
                                            Giá: {new Intl.NumberFormat('vi-VN', { 
                                                style: 'currency', 
                                                currency: 'VND' 
                                            }).format(getItemPrice(item))}
                                        </p>
                                        <div className="flex items-center mt-4">
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                className="px-2 py-1 border rounded-l"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                className="px-2 py-1 border rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Xoá
                                </button>
                            </div>
                        ))}
                        <div className="mt-6">
                            <div className="flex justify-between font-bold text-xl">
                                <span>Tổng cộng:</span>
                                <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 mt-4"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;