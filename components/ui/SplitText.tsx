import React from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    delay?: number;
}

/**
 * Split-Text animation: each character emerges with rotation + Y-offset
 * using a stagger effect and high-tension spring physics.
 */
export const SplitText: React.FC<SplitTextProps> = ({
    children,
    className = '',
    as: Tag = 'h1',
    delay = 0,
}) => {
    const ref = React.useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    // Split by word first, then by character within each word
    const words = children.split(' ');

    let globalIndex = 0;

    return (
        <Tag ref={ref as any} className={className} aria-label={children}>
            {words.map((word, wordIdx) => (
                <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char) => {
                        const charIndex = globalIndex++;
                        return (
                            <motion.span
                                key={`${wordIdx}-${charIndex}`}
                                aria-hidden="true"
                                style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                                initial={{ y: 40, rotate: 5, opacity: 0 }}
                                animate={
                                    isInView
                                        ? { y: 0, rotate: 0, opacity: 1 }
                                        : { y: 40, rotate: 5, opacity: 0 }
                                }
                                transition={{
                                    type: 'spring',
                                    stiffness: 120,
                                    damping: 25,
                                    delay: delay + charIndex * 0.02,
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                    {/* Preserve spaces between words */}
                    {wordIdx < words.length - 1 && (
                        <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                    )}
                </span>
            ))}
        </Tag>
    );
};
