import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { ENTERPRISE_SERVICES, AccordionSection } from '../../data/enterpriseServices';

const AccordionItem: React.FC<{ section: AccordionSection; index: number }> = ({ section, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 group text-left"
            >
                <span className="text-sm uppercase tracking-[0.15em] font-bold text-white group-hover:text-brand-gold transition-colors duration-300">
                    {section.title}
                </span>
                <span className="text-brand-gold flex-shrink-0 ml-6">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 pr-12">
                            <p className="text-slate-400 text-sm font-light leading-[1.8]">
                                {section.content}
                            </p>

                            {section.bulletPoints && section.bulletPoints.length > 0 && (
                                <ul className="mt-6 space-y-3">
                                    {section.bulletPoints.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-1 h-1 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                                            <span className="text-slate-300 text-sm font-light">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const EnterpriseServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const service = ENTERPRISE_SERVICES.find(s => s.id === id);

    if (!service) {
        return (
            <div className="pt-32 min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 text-center">
                <Reveal width="100%">
                    <h1 className="text-4xl font-serif mb-8">Service Not Found</h1>
                    <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">
                        <ArrowLeft className="w-4 h-4" /> Return Home
                    </Link>
                </Reveal>
            </div>
        );
    }

    // Find adjacent services for navigation
    const currentIndex = ENTERPRISE_SERVICES.findIndex(s => s.id === id);
    const prevService = currentIndex > 0 ? ENTERPRISE_SERVICES[currentIndex - 1] : null;
    const nextService = currentIndex < ENTERPRISE_SERVICES.length - 1 ? ENTERPRISE_SERVICES[currentIndex + 1] : null;

    return (
        <div className="pt-32 min-h-screen bg-brand-black text-white pb-32">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-slate-500"
                >
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                    <Link to="/#services" className="hover:text-white transition-colors">Our Expertise</Link>
                    <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                    <span className="text-brand-gold">{service.title}</span>
                </motion.div>

                {/* Hero Content */}
                <div className="max-w-4xl">
                    <Reveal width="100%">
                        <div className="space-y-6 mb-16">
                            <span className="text-brand-gold text-xs uppercase tracking-[0.4em] font-bold">
                                Enterprise Solution
                            </span>
                            <h1 className="text-5xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
                                {service.title.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="text-brand-gold italic">
                                    {service.title.split(' ').slice(-1)[0]}.
                                </span>
                            </h1>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15} width="100%">
                        <div className="space-y-10 mb-20">
                            <h2 className="text-2xl lg:text-3xl font-serif text-slate-200 font-light leading-snug">
                                {service.subtitle}
                            </h2>
                            <div className="h-px w-32 bg-gradient-to-r from-brand-gold to-transparent" />
                            <p className="text-slate-400 text-lg lg:text-xl leading-relaxed font-light max-w-3xl">
                                {service.intro}
                            </p>
                        </div>
                    </Reveal>

                    {/* Accordion Sections */}
                    <Reveal delay={0.3} width="100%">
                        <div className="border-t border-white/10 mb-16">
                            {service.accordionSections.map((section, index) => (
                                <AccordionItem key={index} section={section} index={index} />
                            ))}
                        </div>
                    </Reveal>

                    {/* Closing Note */}
                    {service.closingNote && (
                        <Reveal delay={0.4} width="100%">
                            <div className="mb-20 p-8 lg:p-12 bg-white/[0.02] border border-white/5">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold block mb-4">
                                    Industry Standards
                                </span>
                                <p className="text-slate-400 text-sm font-light leading-[1.8]">
                                    {service.closingNote}
                                </p>
                            </div>
                        </Reveal>
                    )}

                    {/* CTA */}
                    <Reveal delay={0.5} width="100%">
                        <div className="flex flex-col sm:flex-row gap-6 mb-24">
                            <Link
                                to="/quote"
                                className="px-12 py-5 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-brand-gold transition-all text-center flex items-center justify-center gap-3"
                            >
                                Schedule Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-slate-500 hover:text-white transition-colors py-4 px-8"
                            >
                                <ArrowLeft className="w-4 h-4" /> Go Back
                            </button>
                        </div>
                    </Reveal>

                    {/* Adjacent Service Navigation */}
                    <Reveal delay={0.6} width="100%">
                        <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row justify-between gap-8">
                            {prevService ? (
                                <Link
                                    to={`/enterprise-services/${prevService.id}`}
                                    className="group flex flex-col gap-2"
                                >
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-medium">Previous</span>
                                    <span className="text-white font-serif text-lg group-hover:text-brand-gold transition-colors">
                                        ← {prevService.title}
                                    </span>
                                </Link>
                            ) : <div />}
                            {nextService && (
                                <Link
                                    to={`/enterprise-services/${nextService.id}`}
                                    className="group flex flex-col gap-2 text-right sm:items-end"
                                >
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-medium">Next</span>
                                    <span className="text-white font-serif text-lg group-hover:text-brand-gold transition-colors">
                                        {nextService.title} →
                                    </span>
                                </Link>
                            )}
                        </div>
                    </Reveal>
                </div>

            </div>
        </div>
    );
};
