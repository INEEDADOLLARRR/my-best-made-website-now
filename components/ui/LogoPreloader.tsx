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

                    {/* Centralized Logo with layoutId */}
                    <motion.div
                        layoutId="brand-logo"
                        initial={{ rotate: -720, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="z-10"
                        style={{ originX: 0.5, originY: 0.5 }} // Ensure scaling from center during layout transition
                    >
                        <img
                            src="/logo.png"
                            alt="D. C. Taylor Co."
                            className="w-32 h-32 md:w-48 md:h-48 object-contain hue-rotate-30 saturate-150 brightness-110 contrast-125 hover:opacity-80 transition-opacity"
                        />
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
