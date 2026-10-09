/**
 * Internal links and asset paths go through `u()` so the site works both at a domain root
 * (5inchventures.com/work) and under a GitHub Pages project path (user.github.io/repo/work).
 * The base comes from `base` in astro.config.mjs (set by the deploy workflow).
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const u = (path: string) => `${base}${path}`;
