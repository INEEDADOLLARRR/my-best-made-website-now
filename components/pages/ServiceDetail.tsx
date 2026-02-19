import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { OTHER_SERVICES } from '../../data/services';

export const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const service = OTHER_SERVICES.find(s => s.id === id);

    if (!service) {
        return (
            <div className="pt-32 min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 text-center">
                <Reveal width="100%">
                    <h1 className="text-4xl font-serif mb-8">Service Architecture Not Found</h1>
                    <Link to="/more-services" className="btn-primary inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Services
                    </Link>
                </Reveal>
            </div>
        );
    }

    return (
        <div className="pt-32 min-h-screen bg-brand-black text-white pb-32 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Navigation Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-slate-500"
                >
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                    <Link to="/more-services" className="hover:text-white transition-colors">Services</Link>
                    <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                    <span className="text-brand-gold">{service.title}</span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Content - Left Column (7/12) */}
                    <div className="lg:col-span-7 space-y-16">
                        <Reveal width="100%">
                            <div className="space-y-6">
                                <span className="text-brand-gold text-xs uppercase tracking-[0.4em] font-bold">Solution Profile</span>
                                <h1 className="text-6xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
                                    {service.title.split(' ').map((word, i) => (
                                        <span key={i} className={i === service.title.split(' ').length - 1 ? "text-brand-gold italic block mt-2" : "block"}>
                                            {word}
                                        </span>
                                    ))}
                                </h1>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2} width="100%">
                            <div className="space-y-10">
                                <p className="text-3xl text-slate-300 font-light leading-snug">
                                    {service.description}
                                </p>
                                <div className="h-px w-32 bg-gradient-to-r from-brand-gold to-transparent" />
                                <p className="text-slate-400 text-xl leading-relaxed font-light max-w-2xl">
                                    {service.details}
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                            <Reveal delay={0.4} width="100%">
                                <div className="space-y-6">
                                    <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white border-b border-white/10 pb-4">Key Capabilities</h3>
                                    <div className="space-y-4">
                                        {service.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="flex items-start gap-4"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                                                <span className="text-slate-400 text-sm font-light leading-relaxed">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.5} width="100%">
                                <div className="space-y-6 p-8 bg-white/[0.02] border border-white/5 rounded-sm">
                                    <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-brand-gold">Strategy Required?</h3>
                                    <p className="text-slate-500 text-xs font-light leading-relaxed">
                                        Every commercial facility has unique architectural requirements. Contact our engineering team for a bespoke assessment.
                                    </p>
                                    <Link
                                        to="/quote"
                                        className="group flex items-center gap-2 text-white text-xs uppercase tracking-widest font-bold pt-4 hover:text-brand-gold transition-colors"
                                    >
                                        Start Assessment
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={0.6} width="100%">
                            <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-8">
                                <Link to="/quote" className="btn-primary text-center px-16 group">
                                    Schedule Consultation
                                </Link>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-slate-500 hover:text-white transition-colors py-4 px-8"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Go Back
                                </button>
                            </div>
                        </Reveal>
                    </div>

                    {/* Sticky Visual - Right Column (5/12) */}
                    <div className="lg:col-span-5 sticky top-40">
                        <Reveal delay={0.4} width="100%">
                            <div className="relative group">
                                {/* Decorative Frame */}
                                <div className="absolute -inset-4 border border-white/5 z-0" />

                                {/* Image Component */}
                                <div className="relative z-10 overflow-hidden aspect-[3/4] rounded-sm shadow-2xl">
                                    <motion.img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 1.5 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />

                                    {/* Image Badge */}
                                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                        <div className="w-8 h-px bg-brand-gold" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white shadow-xl">Architectural Detail</span>
                                    </div>
                                </div>

                                {/* Floating Element */}
                                <motion.div
                                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/10 blur-3xl rounded-full z-0"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>
                        </Reveal>
                    </div>

                </div>

            </div>
        </div>
    );
};
