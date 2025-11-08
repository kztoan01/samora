'use client'
import Link from 'next/link';
import { Category } from './api';
import { useEffect, useState } from 'react';


interface CategoryNavProps {
    categories: Category[];
    currentCategory?: string;
}

export default function CategoryNav({ categories, currentCategory }: CategoryNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    // Check screen size on mount and when window resizes
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth >= 768) {
          setIsMenuOpen(true); // Always show on larger screens
        } else {
          setIsMenuOpen(false); // Default closed on mobile
        }
      };
  
      // Initial check
      checkScreenSize();
  
      // Add resize listener
      window.addEventListener('resize', checkScreenSize);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    return (
<div className="w-full">
      {/* Hamburger button for mobile */}
      <div className="md:hidden flex justify-between items-center bg-white p-4 shadow-sm rounded-lg mb-2">
        <h2 className="font-bold text-gray-800">Loại Sản Phẩm</h2>
        <button 
          onClick={toggleMenu}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-expanded={isMenuOpen}
          aria-label="Toggle categories menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Categories grid that transforms to dropdown on mobile */}
      <div className={`transition-all duration-300 ${isMobile && !isMenuOpen ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-screen opacity-100'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map(category => (
            <Link href={`/san-pham/${category.slug}`} key={category.id}>
              <div 
                className={`
                  ${currentCategory === category.slug ? 'bg-green-100' : 'bg-zinc-50 hover:bg-green-50'} 
                  px-4 py-3 rounded-lg transition-all duration-200 group flex items-center justify-between
                `}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-800">{category.name}</h3>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    );
}