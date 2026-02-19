import React from 'react';
import { motion } from 'framer-motion';

interface KenBurnsImageProps {
    src: string;
    alt: string;
    className?: string;
    /** Duration of the zoom transition in seconds */
    zoomDuration?: number;
}

/**
 * Ken Burns zoom effect: image scales from 1.0 → 1.05
 * triggered only when the image is 50% visible in the viewport.
 */
export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
    src,
    alt,
    className = '',
    zoomDuration = 8,
}) => {
    return (
        <div className="overflow-hidden w-full h-full">
            <motion.img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${className}`}
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.05 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                    duration: zoomDuration,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ willChange: 'transform' }}
            />
        </div>
    );
};
