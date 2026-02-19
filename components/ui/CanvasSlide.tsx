import React from 'react';
import { motion } from 'framer-motion';

interface CanvasSlideProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Canvas Slide: wraps a section so it subtly scales from 0.98 → 1.0
 * when entering the viewport, creating a "settling into place" effect.
 */
export const CanvasSlide: React.FC<CanvasSlideProps> = ({ children, className = '' }) => {
    return (
        <motion.div
            className={className}
            initial={{ scale: 0.98, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 1.0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ willChange: 'transform, opacity' }}
        >
            {children}
        </motion.div>
    );
};
