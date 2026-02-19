import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KenBurnsImage } from '../ui/KenBurnsImage';

const PROJECTS = [
    {
        id: 1,
        title: "Industrial Complex",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600"
    },
    {
        id: 2,
        title: "Corporate Headquarters",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
    },
    {
        id: 3,
        title: "Logistics Center",
        location: "San Jose, CA",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
    },
    {
        id: 4,
        title: "Technology Park",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600"
    }
];

export const Gallery: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-brand-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                <div className="absolute top-12 left-12 z-10 mix-blend-difference">
                    <h2 className="text-6xl font-serif text-white opacity-80">Our Work</h2>
                    <p className="text-white/60 mt-2 font-light tracking-wide uppercase text-sm">Selected Projects 2024</p>
                </div>

                <motion.div style={{ x }} className="flex gap-12 pl-[20vw]">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="group relative h-[70vh] w-[50vw] flex-shrink-0 overflow-hidden bg-brand-gray/30">
                            <KenBurnsImage
                                src={project.image}
                                alt={project.title}
                                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                zoomDuration={10}
                            />
                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-3xl font-serif text-white mb-1">{project.title}</h3>
                                <p className="text-brand-gold font-mono text-xs uppercase tracking-widest">{project.location}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
