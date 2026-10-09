// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosting: on GitHub Pages the deploy workflow sets SITE_URL (https://<user>.github.io) and
// BASE_PATH (/<repo>). Locally — or on a custom domain — the site lives at the root.
const site = process.env.SITE_URL || 'https://5inchventures.com';
const base = process.env.BASE_PATH || '/';
const to = (path) => `${base.replace(/\/$/, '')}${path}`;

// Static output: every page ships as pre-rendered HTML (fast first paint, great SEO).
export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  // Old URLs from the first version of the site.
  redirects: { '/products': to('/work'), '/engineering': to('/services') },
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
