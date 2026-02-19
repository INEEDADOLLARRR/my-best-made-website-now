export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML content
    author: {
        name: string;
        role: string;
    };
    date: string; // ISO date string
    category: ArticleCategory;
    tags: string[];
    image: string;
    readTime: number; // minutes
}

export type ArticleCategory =
    | 'Maintenance'
    | 'Safety'
    | 'Technology'
    | 'Industry News'
    | 'Case Studies'
    | 'Best Practices';
