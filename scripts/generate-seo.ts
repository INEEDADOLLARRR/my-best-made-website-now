/**
 * Sitemap & robots.txt generator
 * Run: npx tsx scripts/generate-seo.ts
 * Or integrate into build step via vite.config.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://www.dctaylorco.com';

// Import article slugs — update this array when adding new articles
const ARTICLE_SLUGS = [
    'ultimate-guide-commercial-roof-maintenance',
    'fall-protection-compliance-osha-2025',
    'drone-infrared-roof-inspections-future',
];

const SERVICE_IDS = [
    'new-roof-construction',
    'leak-evaluation',
    'roof-restoration',
    'skylight-installation',
    'roof-survey',
];

interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

function generateSitemap(): string {
    const today = new Date().toISOString().split('T')[0];

    const entries: SitemapEntry[] = [
        // Static pages
        { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
        { loc: '/more-services', lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { loc: '/quote', lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: '/blog', lastmod: today, changefreq: 'weekly', priority: '0.8' },

        // Service pages
        ...SERVICE_IDS.map((id) => ({
            loc: `/services/${id}`,
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.7',
        })),

        // Article pages
        ...ARTICLE_SLUGS.map((slug) => ({
            loc: `/blog/${slug}`,
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.6',
        })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
            .map(
                (entry) => `  <url>
    <loc>${SITE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return xml;
}

function generateRobotsTxt(): string {
    return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

// Write files
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap(), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), generateRobotsTxt(), 'utf-8');

console.log('✓ Generated sitemap.xml');
console.log('✓ Generated robots.txt');
