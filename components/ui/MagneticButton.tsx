import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number; // How far it pulls towards the cursor
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    onClick,
    strength = 40 // Default pull strength
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Springs for buttery smooth return
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        // Calculate distance from center of button to mouse
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate normalized pull (-1 to 1) based on mouse position relative to center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set((distanceX / (rect.width / 2)) * strength);
        y.set((distanceY / (rect.height / 2)) * strength);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Snap back to center
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x, y }}
            className={`relative inline-flex items-center justify-center ${className}`}
        >
            {/* Optional: Add an inner wrapper if you want the text to move even further than the button background */}
            {children}
        </motion.button>
    );
};
