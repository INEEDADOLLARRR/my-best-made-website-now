import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../../types/articleTypes';

interface BlogCardProps {
    article: Article;
    featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, featured = false }) => {
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    if (featured) {
        return (
            <Link to={`/blog/${article.slug}`} className="group block">
                <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-brand-gold/90 text-brand-black text-[10px] font-bold uppercase tracking-widest">
                            Featured
                        </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                            {article.category}
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-serif text-white leading-tight group-hover:text-brand-gold transition-colors duration-300">
                            {article.title}
                        </h2>
                        <p className="text-slate-400 font-light leading-relaxed line-clamp-3">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                {article.readTime} min read
                            </span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold group-hover:gap-4 transition-all">
                            Read Article <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </article>
            </Link>
        );
    }

    return (
        <Link to={`/blog/${article.slug}`} className="group block">
            <article className="h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] mb-6">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em]">
                            {article.category}
                        </span>
                        <span className="text-slate-600 text-[10px]">•</span>
                        <span className="text-slate-500 text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime} min
                        </span>
                    </div>

                    <h3 className="text-xl font-serif text-white leading-snug group-hover:text-brand-gold transition-colors duration-300">
                        {article.title}
                    </h3>

                    <p className="text-slate-400 font-light text-sm leading-relaxed line-clamp-2 flex-1">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-slate-500 text-xs flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </span>
                        <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
                            Read <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
};
