import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.2, once = true } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once 
  });

  // Animation variants for children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100
      }
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6
      }
    },
  };

  const slideInVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100
      }
    },
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
    fadeInVariants,
    slideInVariants
  };
} 