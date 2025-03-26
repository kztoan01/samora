import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion'; // Fixed import

interface ProductDetailProps {
    content: ReactNode;
    text: string;
}

const BenefitsAccordion = ({ content, text }: ProductDetailProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-hidden mt-4 bg-zinc-100 items-center justify-center text-black p-4 rounded-xl ">
            {/* Clickable header */}
            <motion.div
                className="flex justify-between items-center p-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-normal text-base">{text}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown className="font-light" />
                </motion.div>
            </motion.div>

            {/* Animated content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, maxHeight: 0 }}
                        animate={{ opacity: 1, y: 0, maxHeight: 500 }}
                        exit={{ opacity: 0, y: -10, maxHeight: 0 }}
                        transition={{
                            duration: 0.4, // Smooth transition
                            ease: [0.4, 0, 0.2, 1], // Cubic bezier for better feel
                        }}
                        className="p-2 text-zinc-600 overflow-hidden"
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BenefitsAccordion;