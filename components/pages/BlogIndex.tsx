import React, { useState, useMemo } from 'react';
import { useDocumentHead, SITE_URL } from '../../hooks/useDocumentHead';
import { Breadcrumbs } from '../seo/Breadcrumbs';
import { BlogCard } from '../blog/BlogCard';
import { getArticles, getAllCategories } from '../../data/articles';
import { motion } from 'framer-motion';

const ARTICLES_PER_PAGE = 6;

export const BlogIndex: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useDocumentHead({
        title: 'Insights & Articles',
        description:
            'Expert insights on commercial roofing, maintenance best practices, safety compliance, and industry innovations from D. C. Taylor Co.',
        canonicalUrl: `${SITE_URL}/blog`,
        ogType: 'website',
        ogImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
    });

    const allCategories = getAllCategories();

    const filteredArticles = useMemo(() => {
        return getArticles(selectedCategory ? { category: selectedCategory } : undefined);
    }, [selectedCategory]);

    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * ARTICLES_PER_PAGE,
        currentPage * ARTICLES_PER_PAGE
    );

    const featuredArticle = filteredArticles[0];
    const gridArticles = paginatedArticles.slice(currentPage === 1 ? 1 : 0);

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-brand-black pt-32 pb-24">
            <div className="container mx-auto px-6 lg:px-12">
                <Breadcrumbs items={[{ label: 'Insights', href: '/blog' }]} />

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 space-y-6"
                >
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                        Knowledge & Expertise
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tight">
                        Insights
                    </h1>
                    <p className="text-xl text-slate-400 font-light max-w-2xl">
                        Expert analysis, technical guides, and industry perspectives from our team of commercial roofing professionals.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-16 border-b border-white/5 pb-8">
                    <button
                        onClick={() => handleCategoryChange(null)}
                        className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${selectedCategory === null
                                ? 'bg-brand-gold text-brand-black'
                                : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                            }`}
                    >
                        All
                    </button>
                    {allCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-brand-gold text-brand-black'
                                    : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Article (first page only) */}
                {currentPage === 1 && featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-20 pb-20 border-b border-white/5"
                    >
                        <BlogCard article={featuredArticle} featured />
                    </motion.div>
                )}

                {/* Article Grid */}
                {gridArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {gridArticles.map((article, index) => (
                            <motion.div
                                key={article.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <BlogCard article={article} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 font-light text-lg">
                            No articles found in this category.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-20">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${currentPage === page
                                        ? 'bg-brand-gold text-brand-black'
                                        : 'text-slate-400 border border-white/10 hover:border-brand-gold/50 hover:text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
