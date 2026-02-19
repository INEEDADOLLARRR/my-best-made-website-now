import { useEffect } from 'react';

interface HeadProps {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogType?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterCard?: string;
    article?: {
        author: string;
        publishedTime: string;
        section?: string;
        tags?: string[];
    };
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'D. C. Taylor Co.';
const SITE_URL = 'https://www.dctaylorco.com';

function setMetaTag(property: string, content: string, isName = false) {
    const attr = isName ? 'name' : 'property';
    let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        document.head.appendChild(element);
    }
    element.content = content;
}

function setLinkTag(rel: string, href: string) {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
    }
    element.href = href;
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
    // Remove existing JSON-LD
    const existing = document.querySelectorAll('script[data-seo-jsonld]');
    existing.forEach((el) => el.remove());

    const items = Array.isArray(data) ? data : [data];
    items.forEach((item) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'true');
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
    });
}

export function useDocumentHead(props: HeadProps) {
    useEffect(() => {
        const prevTitle = document.title;

        // Title
        if (props.title) {
            document.title = `${props.title} | ${SITE_NAME}`;
        }

        // Description
        if (props.description) {
            setMetaTag('description', props.description, true);
        }

        // Canonical
        if (props.canonicalUrl) {
            setLinkTag('canonical', props.canonicalUrl);
        }

        // Open Graph
        setMetaTag('og:site_name', SITE_NAME);
        if (props.ogTitle || props.title) {
            setMetaTag('og:title', props.ogTitle || `${props.title} | ${SITE_NAME}`);
        }
        if (props.ogDescription || props.description) {
            setMetaTag('og:description', (props.ogDescription || props.description)!);
        }
        if (props.ogType) {
            setMetaTag('og:type', props.ogType);
        }
        if (props.ogImage) {
            setMetaTag('og:image', props.ogImage);
        }
        if (props.canonicalUrl) {
            setMetaTag('og:url', props.canonicalUrl);
        }

        // Twitter Card
        setMetaTag('twitter:card', props.twitterCard || 'summary_large_image', true);
        if (props.ogTitle || props.title) {
            setMetaTag('twitter:title', props.ogTitle || `${props.title} | ${SITE_NAME}`, true);
        }
        if (props.ogDescription || props.description) {
            setMetaTag('twitter:description', (props.ogDescription || props.description)!, true);
        }
        if (props.ogImage) {
            setMetaTag('twitter:image', props.ogImage, true);
        }

        // Article meta
        if (props.article) {
            setMetaTag('article:author', props.article.author);
            setMetaTag('article:published_time', props.article.publishedTime);
            if (props.article.section) {
                setMetaTag('article:section', props.article.section);
            }
            props.article.tags?.forEach((tag) => {
                setMetaTag('article:tag', tag);
            });
        }

        // JSON-LD
        if (props.jsonLd) {
            setJsonLd(props.jsonLd);
        }

        return () => {
            document.title = prevTitle;
        };
    }, [props.title, props.description, props.canonicalUrl, props.ogImage, props.ogType]);
}

export { SITE_NAME, SITE_URL };
