import React from 'react';
import { SITE_URL, SITE_NAME } from '../../hooks/useDocumentHead';
import { Article } from '../../types/articleTypes';

interface JsonLdProps {
    children?: React.ReactNode;
}

// Organization Schema — for homepage
export const OrganizationJsonLd: React.FC = () => {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        legalName: 'D. C. Taylor Co.',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description:
            'Industrial roofing experts with 75 years of experience. Safety, integrity, and performance.',
        foundingDate: '1950',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Cedar Rapids',
            addressLocality: 'Cedar Rapids',
            addressRegion: 'IA',
            addressCountry: 'US',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-319-363-2073',
            contactType: 'customer service',
            email: 'info@dctaylorco.com',
        },
        sameAs: [],
        areaServed: {
            '@type': 'Country',
            name: 'United States',
        },
        knowsAbout: [
            'Commercial Roofing',
            'Roof Maintenance',
            'Fall Protection',
            'Roof Inspections',
            'Emergency Roof Repair',
        ],
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

// WebSite Schema — for homepage
export const WebSiteJsonLd: React.FC = () => {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description:
            'D. C. Taylor Co. — Commercial roofing experts with 75 years of experience in industrial roofing, maintenance, and fall protection.',
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

// Article Schema — for individual article pages
export const ArticleJsonLd: React.FC<{ article: Article }> = ({ article }) => {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.image,
        datePublished: article.date,
        dateModified: article.date,
        author: {
            '@type': 'Person',
            name: article.author.name,
            jobTitle: article.author.role,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${article.slug}`,
        },
        wordCount: article.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
        articleSection: article.category,
        keywords: article.tags.join(', '),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

// Breadcrumb Schema — for navigation context
export const BreadcrumbJsonLd: React.FC<{
    items: { name: string; url: string }[];
}> = ({ items }) => {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

// FAQ Schema — template ready for FAQ content
export const FAQJsonLd: React.FC<{
    questions: { question: string; answer: string }[];
}> = ({ questions }) => {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};
