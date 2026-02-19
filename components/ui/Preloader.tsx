import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Auto-hide the preloader after a set cinematic duration
    useEffect(() => {
        // 2.5 seconds gives enough time for a beautiful text reveal before fading out
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Prevent scrolling while loading
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    // Exit animation fades the black screen up or out
                    exit={{
                        y: "-100%",
                        opacity: 0,
                        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[100] bg-brand-black flex items-center justify-center flex-col overflow-hidden"
                >
                    {/* Subtle grain/noise overlay for texture */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay"></div>

                    {/* Cinematic text reveal */}
                    <div className="relative overflow-hidden">
                        <motion.h1
                            initial={{ y: "150%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                            className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase font-light"
                        >
                            DC Taylor <span className="text-brand-gold italic">Co.</span>
                        </motion.h1>
                    </div>

                    <div className="relative overflow-hidden mt-4">
                        <motion.p
                            initial={{ y: "-150%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
                            className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]"
                        >
                            Preserving Legacy Assets
                        </motion.p>
                    </div>

                    {/* Progress Line */}
                    <motion.div
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/10"
                    >
                        <motion.div
                            initial={{ scaleX: 0, transformOrigin: 'left' }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-brand-gold"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
