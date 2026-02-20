import React, { useRef } from 'react';
import { ArrowUpRight, Hammer, Layers, ClipboardCheck, Anchor, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../ui/Reveal';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const SERVICES = [
  {
    id: "01",
    slug: "roof-system-repairs",
    title: "Roof System Repairs",
    description: "Fixing deteriorated materials, blisters, and voids using compatible materials to preserve your warranty.",
    icon: <Hammer className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "02",
    slug: "commercial-reroof",
    title: "Commercial Reroof",
    description: "Replacing roofs at the end of their lifespan with high-performance systems designed for your facility.",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "03",
    slug: "preventive-maintenance",
    title: "Preventive Maintenance",
    description: "Scheduled inspections, cleaning, and minor repairs to extend roof life and prevent costly failures.",
    icon: <ClipboardCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "04",
    slug: "fall-protection",
    title: "Fall Protection",
    description: "Installation of permanent guard rails and anchors to ensure the safety of everyone on your roof.",
    icon: <Anchor className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "05",
    slug: "roof-management",
    title: "Roof Management",
    description: "Long-term strategic planning, asset health scoring, and 10-year capital budget forecasting.",
    icon: <LineChart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-brand-black relative z-10">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 pb-8 border-b border-white/10">
          <Reveal width="100%">
            <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tight">
              Our Expertise.
            </h2>
          </Reveal>
          <Reveal delay={0.2} width="100%">
            <p className="text-slate-400 max-w-md lg:ml-auto text-lg font-light mt-6 lg:mt-0">
              Comprehensive roofing solutions tailored for longevity, safety, and performance.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1} width="100%">
              <HoverCard service={service} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

const HoverCard: React.FC<{ service: typeof SERVICES[0] }> = ({ service }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    mouseX.set(x * 20); // max 20deg tilt
    mouseY.set(y * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useMotionTemplate`calc(${springY} * -1deg)`;
  const rotateY = useMotionTemplate`calc(${springX} * 1deg)`;

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className="h-full w-full block"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full group relative"
      >
        <Link
          to={`/enterprise-services/${service.slug}`}
          className="absolute inset-0 z-50 block"
          style={{ transform: "translateZ(50px)" }}
          aria-label={service.title}
        />

        <div className="bg-white/5 border border-white/10 p-10 h-full flex flex-col justify-between overflow-hidden cursor-pointer hover:border-brand-gold/50 transition-colors duration-1000 h-[420px]">

          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-brand-black/80 group-hover:bg-brand-black/50 transition-colors duration-700"></div>
          </div>

          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="flex justify-between items-start mb-8">
              <span className="text-sm font-mono text-brand-gold opacity-60 group-hover:opacity-100 transition-opacity">/{service.id}</span>
              <div className="p-3 bg-brand-black/50 border border-white/5 backdrop-blur-md rounded-full text-white/80 group-hover:text-brand-gold group-hover:bg-brand-gold/20 transition-all duration-500">
                {service.icon}
              </div>
            </div>

            <h3 className="text-3xl font-serif text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
              {service.title}
            </h3>

            <p className="text-slate-400 font-light leading-relaxed text-sm group-hover:text-white/90 transition-colors duration-500 delay-100">
              {service.description}
            </p>
          </div>

          <div className="relative z-10 mt-auto pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors duration-500" style={{ transform: "translateZ(20px)" }}>
            <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Learn More</span>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-gold transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};