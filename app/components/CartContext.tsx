"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './api';

// Extended product type with selected volume and price
interface CartProduct extends Product {
  selectedVolume?: string;
  selectedPrice?: number;
  selectedDiscountPrice?: number;
}

interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartProduct, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void; // New method
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hàm để lấy giỏ hàng từ localStorage
const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(getCartFromLocalStorage());

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartProduct, quantity: number) => {
    setCart((prevCart) => {
      // For products with volume prices, check if same product with same volume exists
      const existingItemIndex = prevCart.findIndex((item) => {
        if (product.selectedVolume) {
          return item.product._id === product._id && 
                 item.product.selectedVolume === product.selectedVolume;
        }
        return item.product._id === product._id;
      });

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      }
      
      // Add new item
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};