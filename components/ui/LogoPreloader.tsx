import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoPreloaderProps {
    onComplete: () => void;
}

export const LogoPreloader: React.FC<LogoPreloaderProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1.5 seconds gives enough time to read the logo before it flies away
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Let the exit animation (black background fading out) play, then structurally complete
            setTimeout(onComplete, 800);
        }, 1500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    // Prevent scrolling while loading
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[100] bg-brand-black flex items-center justify-center flex-col overflow-hidden pointer-events-auto"
                >
                    {/* Subtle grain/noise overlay for texture */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay z-0"></div>

                    {/* Centralized Brand Name */}
                    <div
                        className="z-10 text-4xl md:text-6xl font-bold tracking-tighter text-white font-serif"
                    >
                        D. C. Taylor <span className="text-brand-blue">Co.</span>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
