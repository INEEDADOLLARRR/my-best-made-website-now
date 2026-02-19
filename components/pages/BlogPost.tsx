import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDocumentHead, SITE_URL } from '../../hooks/useDocumentHead';
import { ArticleJsonLd } from '../seo/JsonLd';
import { Breadcrumbs } from '../seo/Breadcrumbs';
import { TableOfContents } from '../blog/TableOfContents';
import { BlogCard } from '../blog/BlogCard';
import { getArticleBySlug, getRelatedArticles } from '../../data/articles';

export const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const article = slug ? getArticleBySlug(slug) : undefined;

    useDocumentHead(
        article
            ? {
                title: article.title,
                description: article.excerpt,
                canonicalUrl: `${SITE_URL}/blog/${article.slug}`,
                ogType: 'article',
                ogImage: article.image,
                article: {
                    author: article.author.name,
                    publishedTime: article.date,
                    section: article.category,
                    tags: article.tags,
                },
            }
            : {
                title: 'Article Not Found',
                description: 'The requested article could not be found.',
            }
    );

    // 404 handling
    if (!article) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center pt-20">
                <div className="text-center space-y-8">
                    <h1 className="text-8xl font-serif text-brand-gold">404</h1>
                    <p className="text-2xl font-serif text-white">Article Not Found</p>
                    <p className="text-slate-400 font-light max-w-md mx-auto">
                        The article you're looking for doesn't exist or may have been moved.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-4 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-brand-gold/50 transition-all"
                        >
                            Go Back
                        </button>
                        <Link
                            to="/blog"
                            className="px-8 py-4 bg-brand-blue text-white text-xs uppercase tracking-widest hover:bg-blue-900 transition-all"
                        >
                            All Articles
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const relatedArticles = getRelatedArticles(article.slug, 3);
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <ArticleJsonLd article={article} />

            <article className="min-h-screen bg-brand-black pt-32 pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <Breadcrumbs
                        items={[
                            { label: 'Insights', href: '/blog' },
                            { label: article.title, href: `/blog/${article.slug}` },
                        ]}
                    />

                    {/* Article Header */}
                    <header className="max-w-4xl mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            {/* Back link */}
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-gold text-sm transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Insights
                            </Link>

                            {/* Category */}
                            <span className="block text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                                {article.category}
                            </span>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                                {article.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-400 font-light border-t border-b border-white/5 py-6">
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-brand-gold" />
                                    <span>
                                        <span className="text-white">{article.author.name}</span>
                                        <span className="text-slate-600 mx-2">·</span>
                                        {article.author.role}
                                    </span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={article.date}>{formattedDate}</time>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {article.readTime} min read
                                </span>
                            </div>
                        </motion.div>
                    </header>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative overflow-hidden aspect-[21/9] mb-16 max-w-6xl"
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 via-transparent to-transparent" />
                    </motion.div>

                    {/* Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 max-w-6xl">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="article-content prose prose-invert prose-lg max-w-none"
                        >
                            <div
                                className="
                  [&>h2]:text-3xl [&>h2]:font-serif [&>h2]:text-white [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:tracking-tight
                  [&>h3]:text-xl [&>h3]:font-serif [&>h3]:text-brand-gold/90 [&>h3]:mt-10 [&>h3]:mb-4
                  [&>p]:text-slate-300 [&>p]:font-light [&>p]:leading-[1.9] [&>p]:mb-6
                  [&>ul]:text-slate-300 [&>ul]:font-light [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6
                  [&>ol]:text-slate-300 [&>ol]:font-light [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6
                  [&>blockquote]:border-l-2 [&>blockquote]:border-brand-gold [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-400
                "
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </motion.div>

                        {/* Sidebar */}
                        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
                            <TableOfContents contentHtml={article.content} />

                            {/* Tags */}
                            <div className="border border-white/5 bg-white/[0.02] p-6 space-y-4">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                                    Tags
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-[10px] uppercase tracking-widest text-slate-400 border border-white/10 hover:border-brand-gold/30 hover:text-brand-gold transition-colors cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section className="mt-32 pt-20 border-t border-white/5">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">
                                        Continue Reading
                                    </span>
                                    <h2 className="text-3xl font-serif text-white">
                                        Related Articles
                                    </h2>
                                </div>
                                <Link
                                    to="/blog"
                                    className="hidden md:flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold hover:gap-4 transition-all"
                                >
                                    All Articles <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {relatedArticles.map((related) => (
                                    <BlogCard key={related.slug} article={related} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        </>
    );
};
