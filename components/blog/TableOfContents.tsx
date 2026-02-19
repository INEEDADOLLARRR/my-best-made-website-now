import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    contentHtml: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ contentHtml }) => {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(true);

    // Parse headings from HTML content
    const headings: TocItem[] = [];
    const regex = /<h([23])\s+id="([^"]+)"[^>]*>([^<]+)<\/h[23]>/gi;
    let match;
    while ((match = regex.exec(contentHtml)) !== null) {
        headings.push({
            level: parseInt(match[1]),
            id: match[2],
            text: match[3],
        });
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -80% 0px' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [contentHtml]);

    if (headings.length === 0) return null;

    return (
        <nav
            aria-label="Table of Contents"
            className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 w-full text-left mb-4"
            >
                <List className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Table of Contents
                </span>
            </button>

            {isOpen && (
                <ol className="space-y-1">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(heading.id)?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    });
                                }}
                                className={`block py-2 text-sm transition-all duration-200 border-l-2 ${heading.level === 3 ? 'pl-8' : 'pl-4'
                                    } ${activeId === heading.id
                                        ? 'border-brand-gold text-brand-gold'
                                        : 'border-transparent text-slate-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ol>
            )}
        </nav>
    );
};
