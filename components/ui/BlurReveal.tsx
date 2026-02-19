import React from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurRevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    /** Animation duration — heavier text should use longer values */
    duration?: number;
    className?: string;
}

/**
 * Scroll-triggered Blur Reveal: text transitions from
 * blur(10px) + opacity 0 → blur(0px) + opacity 1
 * with a slow, sweeping motion.
 */
export const BlurReveal: React.FC<BlurRevealProps> = ({
    children,
    width = 'fit-content',
    delay = 0.15,
    duration = 0.9,
    className = '',
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <div ref={ref} style={{ position: 'relative', width }} className={className}>
            <motion.div
                initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
                animate={
                    isInView
                        ? { filter: 'blur(0px)', opacity: 1, y: 0 }
                        : { filter: 'blur(10px)', opacity: 0, y: 20 }
                }
                transition={{
                    duration,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ willChange: 'filter, opacity, transform' }}
            >
                {children}
            </motion.div>
        </div>
    );
};
