import React, { useRef } from 'react';
import { Search, Shield, FileText, BarChart3, Truck, Hammer, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  { id: "01", title: "Forensic Assessment", description: "We don't guess. We deploy comprehensive analysis to understand the exact condition of your roof system before proposing a solution.", icon: <Search className="w-6 h-6" /> },
  { id: "02", title: "Safety Engineering", description: "Before a single tool is lifted, we engineer a site-specific safety plan to protect your facility, your employees, and our crew.", icon: <Shield className="w-6 h-6" /> },
  { id: "03", title: "Custom Specification", description: "We design a solution aligned with your specific facility goals—avoiding generic 'one-size-fits-all' bids that fail to address root causes.", icon: <FileText className="w-6 h-6" /> },
  { id: "04", title: "Capital Forecasting", description: "We provide a clear 10-year budget outlook, proving the long-term ROI and eliminating financial surprises down the road.", icon: <BarChart3 className="w-6 h-6" /> },
  { id: "05", title: "Pre-Job Logistics", description: "We coordinate every detail with your facility managers to ensure our footprint is minimal and your operations continue uninterrupted.", icon: <Truck className="w-6 h-6" /> },
  { id: "06", title: "Seamless Execution", description: "Our master crews execute the work with military precision, adhering strictly to manufacturer specifications and our internal quality standards.", icon: <Hammer className="w-6 h-6" /> },
  { id: "07", title: "Zero-Defect Audit", description: "A rigorous final inspection ensures every seam, flashing, and termination meets our absolute standard for watertight integrity.", icon: <CheckCircle2 className="w-6 h-6" /> },
  { id: "08", title: "Asset Stewardship", description: "The job isn't done at closeout. We enter a proactive maintenance phase to extend the life of your investment for decades.", icon: <RefreshCw className="w-6 h-6" /> }
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Note: We are using a sticky layout instead of complex scrubbing to ensure cross-device smoothness.
  // The left panel fades text items in and out, while the right panel holds a cinematic looping video.

  return (
    <section id="process" ref={containerRef} className="relative bg-brand-black w-full border-t border-white/5">
      <div className="flex flex-col md:flex-row w-full relative max-w-[1600px] mx-auto">

        {/* Left Side: Scrollable Text Blocks */}
        <div className="w-full md:w-1/2 relative z-10 md:pt-[20vh] md:pb-[50vh]">
          <div className="px-6 md:px-16 lg:px-24 mb-32 md:mb-64 pt-32">
            <h2 className="text-4xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
              Turning asset management <br />
              <span className="text-white/30 italic font-light">from guessing into engineering.</span>
            </h2>
            <p className="text-brand-blue font-mono text-sm uppercase tracking-widest mt-8">The 8-Step Blueprint</p>
          </div>

          {STEPS.map((step, index) => (
            <StepItem key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Right Side: Sticky Video/Interactive Canvas */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky top-0 flex items-center justify-center bg-brand-black p-6 md:p-12 z-0">
          {/* Dark premium mask */}
          <div className="w-full h-full rounded-sm overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.03)] border border-white/5">
            <video
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-[2000ms]"
              autoPlay
              muted
              loop
              playsInline
              src="https://cdn.coverr.co/videos/coverr-industry-work-2521/1080p.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/20 pointer-events-none"></div>

            {/* Overlay dynamic text linked to scroll - nice touch */}
            <div className="absolute bottom-12 left-12 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
              <span className="font-mono text-brand-gold text-xs tracking-[0.2em] uppercase">System Active _</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const StepItem: React.FC<{ step: any; index: number }> = ({ step, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [40, 0, 0, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="px-6 md:px-16 lg:px-24 min-h-[60vh] flex flex-col justify-center border-l-2 border-white/5 md:ml-12"
    >
      <div className="group relative">
        {/* Connecting Dot */}
        <div className="absolute top-4 -left-[calc(25px+1rem)] md:-left-[calc(3rem+2px)] w-2 h-2 rounded-full bg-white/20 group-hover:bg-brand-blue group-hover:shadow-[0_0_10px_#1e3a8a] transition-all duration-500"></div>

        <div className="flex justify-between items-start mb-8">
          <span className="text-6xl md:text-8xl font-serif italic text-white/5 group-hover:text-brand-gold/20 transition-colors duration-1000 -ml-2">
            {step.id}
          </span>
          <div className="p-4 rounded-full border border-white/5 text-slate-400 bg-white/5 backdrop-blur-sm group-hover:text-white transition-colors duration-500">
            {step.icon}
          </div>
        </div>

        <h3 className="text-3xl font-serif text-white mb-6 group-hover:text-brand-blue transition-colors duration-500">
          {step.title}
        </h3>
        <p className="text-lg text-white/50 leading-relaxed font-light max-w-md group-hover:text-white/80 transition-colors duration-500">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};