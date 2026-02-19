import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../ui/Reveal';
import { OTHER_SERVICES } from '../../data/services';

export const MoreServices: React.FC = () => {
    return (
        <div className="pt-32 min-h-screen bg-brand-black text-white pb-24">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
                    <Reveal width="100%">
                        <div className="space-y-4">
                            <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">Expertise & Innovation</span>
                            <h1 className="text-6xl lg:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                                Extended <br />
                                <span className="italic text-brand-gold">Capabilities.</span>
                            </h1>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-slate-400 max-w-sm text-lg font-light leading-relaxed mt-8 md:mt-0">
                            Beyond standard roofing, we provide specialized solutions engineered for the most demanding commercial environments.
                        </p>
                    </Reveal>
                </div>

                {/* Premium Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {OTHER_SERVICES.map((service, index) => (
                        <Reveal key={service.id} delay={index * 0.1} width="100%">
                            <Link
                                to={`/services/${service.id}`}
                                className="group relative block aspect-[4/5] overflow-hidden bg-brand-gray rounded-sm border border-white/5"
                            >
                                {/* Background Image with Zoom */}
                                <motion.div
                                    className="absolute inset-0 z-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000"
                                    />
                                </motion.div>

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent z-10 opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                                <div className="absolute inset-0 border border-brand-gold/0 group-hover:border-brand-gold/20 transition-colors duration-700 z-30" />

                                {/* Content */}
                                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                    <div className="overflow-hidden mb-4">
                                        <motion.span
                                            className="block text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2"
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            Capability 0{index + 1}
                                        </motion.span>
                                        <h3 className="text-3xl font-serif text-white group-hover:text-brand-gold transition-colors duration-500">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <p className="text-slate-300 text-sm font-light leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-[90%]">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/10 group-hover:border-brand-gold/30 transition-colors duration-700">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Explore Solution</span>
                                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-gold transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-32 flex flex-col md:flex-row justify-between items-center py-12 border-t border-white/5">
                    <Link to="/" className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs uppercase tracking-[0.2em] font-medium">Return to Home</span>
                    </Link>

                    <div className="flex gap-8 mt-8 md:mt-0">
                        <Link to="/quote" className="text-xs uppercase tracking-[0.2em] font-medium text-brand-gold hover:text-white transition-colors">
                            Get an Estimate
                        </Link>
                        <Link to="/#projects" className="text-xs uppercase tracking-[0.2em] font-medium text-slate-500 hover:text-white transition-colors">
                            View Projects
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};
