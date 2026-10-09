import type { APIRoute } from 'astro';
import { u } from '../lib/url';

// Generated so the sitemap URL is right on any host (custom domain or GitHub Pages path).
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(u('/sitemap-index.xml'), site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
