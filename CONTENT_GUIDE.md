# Content Management Guide — D. C. Taylor Co.

## Adding New Articles

### Step 1: Add Article Data

Open `data/articles.ts` and add a new entry to the `ARTICLES` array:

```typescript
{
  slug: 'your-url-friendly-slug',
  title: 'Your Article Title',
  excerpt: 'A compelling 1-2 sentence summary for previews and meta descriptions.',
  content: `
    <h2 id="section-one">Section One Heading</h2>
    <p>Your paragraph content here...</p>

    <h3 id="subsection">Subsection Heading</h3>
    <p>More content...</p>

    <h2 id="section-two">Section Two Heading</h2>
    <p>Content continues...</p>
  `,
  author: {
    name: 'Author Name',
    role: 'Job Title',
  },
  date: '2025-03-15', // ISO format: YYYY-MM-DD
  category: 'Maintenance', // Options: Maintenance, Safety, Technology, Industry News, Case Studies, Best Practices
  tags: ['tag1', 'tag2', 'tag3'],
  image: 'https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&q=80&w=1200',
  readTime: 7, // estimated minutes
}
```

### Step 2: Content Guidelines

- **Headings**: Use `<h2>` and `<h3>` with `id` attributes for Table of Contents
- **IDs**: Use kebab-case (e.g., `id="section-heading"`)
- **Images**: Use high-quality Unsplash images or hosted images (1200px+ width)
- **Slug**: URL-friendly, lowercase, hyphens only

### Step 3: Update Sitemap

Run `npx tsx scripts/generate-seo.ts` to regenerate `sitemap.xml`, or add the new slug to the `ARTICLE_SLUGS` array in `scripts/generate-seo.ts`.

---

## SEO Checklist (per article)

- [ ] Title under 60 characters
- [ ] Excerpt/meta description 120-160 characters
- [ ] At least 2 H2 headings with descriptive IDs
- [ ] Featured image with descriptive alt text
- [ ] 3-5 relevant tags
- [ ] Internal links where appropriate
- [ ] Category assigned

---

## Headless CMS Integration (Optional)

To connect a headless CMS instead of using the TypeScript data file:

### Sanity.io

1. Install: `npm install @sanity/client`
2. Create article schema matching the `Article` interface
3. Replace `getArticles()` calls with Sanity GROQ queries
4. Use `@sanity/image-url` for responsive images

### Contentful

1. Install: `npm install contentful`
2. Create "Article" content type with matching fields
3. Replace data functions with Contentful API calls
4. Map Contentful rich text to HTML

### Strapi

1. Set up a Strapi instance with an "Article" collection type
2. Install: `npm install axios`
3. Replace data functions with Strapi REST API calls
