import { useEffect } from 'react';

/**
 * Lerp-based smooth scroll (Linear Interpolation).
 * Gives the browsing experience a "buttery" fluid feel by
 * interpolating scroll position each frame.
 *
 * @param lerpFactor - Interpolation factor (0-1). Lower = smoother/heavier. Default: 0.08
 */
export function useSmoothScroll(lerpFactor: number = 0.08): void {
    useEffect(() => {
        // Skip on mobile/touch devices — native scroll is better for UX + perf
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        let currentScroll = window.scrollY;
        let targetScroll = window.scrollY;
        let rafId: number;
        let isRunning = true;

        const lerp = (start: number, end: number, factor: number): number => {
            return start + (end - start) * factor;
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll = Math.max(
                0,
                Math.min(
                    targetScroll + e.deltaY,
                    document.documentElement.scrollHeight - window.innerHeight
                )
            );
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const scrollAmount = 100;
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                targetScroll = Math.min(
                    targetScroll + (e.key === 'PageDown' ? window.innerHeight : scrollAmount),
                    document.documentElement.scrollHeight - window.innerHeight
                );
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                targetScroll = Math.max(
                    targetScroll - (e.key === 'PageUp' ? window.innerHeight : scrollAmount),
                    0
                );
            } else if (e.key === 'Home') {
                targetScroll = 0;
            } else if (e.key === 'End') {
                targetScroll = document.documentElement.scrollHeight - window.innerHeight;
            }
        };

        const animate = () => {
            if (!isRunning) return;

            currentScroll = lerp(currentScroll, targetScroll, lerpFactor);

            // Snap when difference is negligible to avoid infinite sub-pixel drifting
            if (Math.abs(currentScroll - targetScroll) < 0.5) {
                currentScroll = targetScroll;
            }

            window.scrollTo(0, currentScroll);
            rafId = requestAnimationFrame(animate);
        };

        // Sync target if user uses scrollbar dragging or programmatic scroll
        const onScroll = () => {
            // Only sync if native scroll differs significantly (user dragged scrollbar)
            if (Math.abs(window.scrollY - currentScroll) > 50) {
                currentScroll = window.scrollY;
                targetScroll = window.scrollY;
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('scroll', onScroll, { passive: true });
        rafId = requestAnimationFrame(animate);

        return () => {
            isRunning = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('scroll', onScroll);
        };
    }, [lerpFactor]);
}
