"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './utils/useScrollAnimation';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { ref, isInView, containerVariants, itemVariants, fadeInVariants } = useScrollAnimation({
    threshold: 0.1,
    once: true
  });

  // Reset zoom and position when selected image changes
  useEffect(() => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  }, [selectedImage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        navigateToImage(1);
      } else if (e.key === 'ArrowLeft') {
        navigateToImage(-1);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
      } else if (e.key === '-') {
        setZoomLevel(prev => Math.max(prev - 0.25, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const navigateToImage = (direction: number) => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex === -1) return;
    
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - dragPosition.x, y: e.clientY - dragPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (increment: number) => {
    setZoomLevel(prev => {
      const newZoom = prev + increment;
      return Math.max(1, Math.min(3, newZoom));
    });
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`${className}`}
    >
      {/* Gallery Grid */}
      <motion.div 
        variants={fadeInVariants}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-8xl mx-auto"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            custom={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(image)}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for selected image */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="relative max-w-full max-h-full overflow-hidden p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div 
              className="relative overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                transform: `scale(${zoomLevel})`,
                cursor: zoomLevel > 1 ? 'grab' : 'default'
              }}
            >
              <div
                style={{
                  transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s'
                }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
            </div>

            {/* Controls */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black bg-opacity-50 p-2 rounded-lg"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToImage(-1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(-0.25);
                }}
                disabled={zoomLevel <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </motion.button>
              
              <span className="text-white">{Math.round(zoomLevel * 100)}%</span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(0.25);
                }}
                disabled={zoomLevel >= 3}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToImage(1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageGallery;