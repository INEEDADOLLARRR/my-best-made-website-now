import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");

    // Use framer-motion springs for buttery smooth trailing
    const cursorX = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.5 });
    const cursorY = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.5 });
    // Add a slightly delayed trailing dot
    const dotX = useSpring(-100, { stiffness: 800, damping: 35, mass: 0.2 });
    const dotY = useSpring(-100, { stiffness: 800, damping: 35, mass: 0.2 });

    useEffect(() => {
        // Check if device is touch capable to hide cursor on mobile
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX - 20); // Center the 40px ring
            cursorY.set(e.clientY - 20);
            dotX.set(e.clientX - 4);     // Center the 8px dot
            dotY.set(e.clientY - 4);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for explicit dataset text (e.g., data-cursor-text="PLAY")
            let hasText = false;
            let currentTarget: HTMLElement | null = target;

            while (currentTarget && currentTarget !== document.body) {
                if (currentTarget.dataset.cursorText) {
                    setCursorText(currentTarget.dataset.cursorText);
                    hasText = true;
                    setIsHovering(true);
                    break;
                }
                currentTarget = currentTarget.parentElement;
            }

            if (!hasText) {
                setCursorText("");
                if (
                    target.tagName.toLowerCase() === 'a' ||
                    target.tagName.toLowerCase() === 'button' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    target.classList.contains('magnetic-link')
                ) {
                    setIsHovering(true);
                } else {
                    setIsHovering(false);
                }
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        // Auto hide cursor globally
        document.documentElement.classList.add('hide-cursor-custom');

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.classList.remove('hide-cursor-custom');
        };
    }, [cursorX, cursorY, dotX, dotY]);

    // Hide entirely on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            <style>{`
        .hide-cursor-custom * {
          cursor: none !important;
        }
      `}</style>

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white pointer-events-none z-[9999] hidden md:block mix-blend-difference"
                style={{ x: cursorX, y: cursorY }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Inner Dot & Text */}
            <motion.div
                className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9999] hidden md:flex mix-blend-difference overflow-hidden"
                style={{
                    x: dotX,
                    y: dotY,
                    width: cursorText ? 64 : 8,
                    height: cursorText ? 64 : 8,
                    left: cursorText ? -28 : 0, // Offset expansion
                    top: cursorText ? -28 : 0,
                    borderRadius: "50%",
                    backgroundColor: 'rgba(255,255,255,1)',
                }}
                animate={{
                    scale: (!cursorText && isHovering) ? 6 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-black text-[10px] font-bold tracking-widest uppercase font-mono"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>
        </>
    );
};
