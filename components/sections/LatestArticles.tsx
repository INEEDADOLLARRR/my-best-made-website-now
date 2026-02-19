import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogCard } from '../blog/BlogCard';
import { getArticles } from '../../data/articles';

export const LatestArticles: React.FC = () => {
    const latestArticles = getArticles({ limit: 3 });

    if (latestArticles.length === 0) return null;

    return (
        <section className="py-32 bg-brand-black border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8"
                >
                    <div className="space-y-4">
                        <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                            Knowledge & Expertise
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-serif text-white tracking-tight">
                            Latest Insights
                        </h2>
                        <p className="text-slate-400 font-light max-w-xl">
                            Expert perspectives on commercial roofing, safety, and building technology.
                        </p>
                    </div>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-3 text-brand-gold text-xs uppercase tracking-widest font-semibold hover:gap-5 transition-all group shrink-0"
                    >
                        View All Articles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {latestArticles.map((article, index) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                            <BlogCard article={article} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
