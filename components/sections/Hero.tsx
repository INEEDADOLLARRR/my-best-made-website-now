import React, { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '../ui/SplitText';
import { BlurReveal } from '../ui/BlurReveal';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax slowly moving the background down
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Video scales down and clips to a cinematic ultrawide ratio as user scrolls
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 1], [
    "inset(0% 0% 0% 0%)",
    "inset(10% 5% 30% 5%)"
  ]);

  // Adjust container height to allow for smooth scroll transition
  return (
    <section ref={containerRef} className="relative h-[150vh] flex items-start justify-center overflow-hidden bg-brand-black">
      {/* Premium Video Background with Scroll-tied Parallax & Masking */}
      <motion.div
        className="fixed inset-0 z-0 origin-center"
        style={{ y, scale, clipPath }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          src="/hero-bg.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-black/40"></div>
      </motion.div>

      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10 pt-32 h-screen flex items-center"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12 pb-32">

          {/* Badge — blur reveal with quick, airy motion */}
          <BlurReveal duration={0.5} delay={0.1}>
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-brand-gold/30 text-brand-gold font-serif tracking-widest uppercase text-xs backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>America's Safest Companies 2024</span>
            </div>
          </BlurReveal>

          {/* H1 — Split-Text per-character stagger animation */}
          <div>
            <SplitText
              className="text-6xl lg:text-8xl font-serif font-medium tracking-tight text-brand-white leading-[1.1]"
              delay={0.3}
            >
              Preserve Your
            </SplitText>
            <SplitText
              className="text-6xl lg:text-8xl font-serif font-medium tracking-tight text-brand-gold/90 italic leading-[1.1]"
              delay={0.6}
            >
              Legacy Assets.
            </SplitText>
          </div>

          {/* Sub-text — Blur Reveal with slow, expensive motion for heavier feel */}
          <BlurReveal duration={1.2} delay={1.0}>
            <p className="text-xl text-brand-white/70 leading-relaxed max-w-2xl mx-auto font-light">
              75 years of roofing excellence combining data-driven insights with craftsmanship. We don't just fix roofs; we protect your future.
            </p>
          </BlurReveal>

          {/* CTA Buttons — Blur Reveal with medium timing */}
          <BlurReveal duration={0.8} delay={1.3}>
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
              <MagneticButton
                onClick={() => navigate('/quote')}
                className="magnetic-link px-12 py-5 bg-brand-blue text-white font-semibold rounded-sm hover:bg-blue-900 transition-all duration-500 tracking-widest uppercase text-xs hover:shadow-[0_0_30px_rgba(30,58,138,0.4)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-[30deg] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
                Get a Quote
              </MagneticButton>

              <MagneticButton
                onClick={() => document.getElementById('more-services')?.scrollIntoView({ behavior: 'smooth' })}
                className="magnetic-link px-12 py-5 bg-transparent text-white font-semibold rounded-sm hover:bg-white/5 transition-all duration-500 tracking-widest uppercase text-xs border border-white/20 hover:border-brand-gold/50"
              >
                View Services
              </MagneticButton>
            </div>
          </BlurReveal>
        </div>
      </motion.div>
    </section>
  );
};