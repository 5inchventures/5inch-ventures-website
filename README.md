# 5INCH Ventures — website

Website for **5INCH VENTURES PRIVATE LIMITED**, a product studio in Surat.
It shows what we can build and the apps/websites we have shipped — never the internals of any project.

## Stack

- **Astro 7** — every page is pre-rendered static HTML (≈4 KB of JS in total)
- Plain CSS design tokens in `src/styles/global.css` (no CSS framework)
- Self-hosted variable fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels)
- `@astrojs/sitemap` for `sitemap-index.xml`; JSON-LD `Organization` data in the layout

Lighthouse (local production build): Performance 99–100, Accessibility 100, Best Practices 100, SEO 100 on mobile and desktop.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro files
```

## Where things live

| What | File |
|---|---|
| **All copy: apps, websites, services, capabilities, stats, contact details** | `src/data/site.ts` |
| Design tokens, buttons, cards, grids | `src/styles/global.css` |
| Layout, SEO meta, Open Graph, JSON-LD | `src/layouts/Base.astro` |
| Hero visual (phone app + dashboard + app tiles) | `src/components/HeroShowcase.astro` |
| Portfolio cards | `src/components/AppCard.astro`, `src/components/SiteCard.astro` |
| Logo (five-bar growth graph, animated on hover) | `src/components/Logo.astro`, `public/favicon.svg` |
| Logo files for print / social (outlined SVG) | `public/brand/` — rebuild with `scripts/build-logo.py` |
| Internal links / asset paths (base-path aware) | `src/lib/url.ts` — always link with `u('/path')` |
| Scroll reveal, card spotlight, count-up | `src/scripts/motion.ts` |
| Social share image | `public/og.png` (1200×630) |

Pages: `/`, `/work`, `/services`, `/about`, `/careers`, `/contact`, `/404`. Old `/products` and `/engineering` redirect to `/work` and `/services`.

## Before going live — please confirm

- **Email**: `5inchventures@gmail.com`, phone `+91 63570 17016` — both in `src/data/site.ts`.
- **Contact form** has no backend: it opens the visitor's email app or WhatsApp with the enquiry pre-filled.
- **Portfolio facts** (app names, platforms, install counts) are from the public Play Store / App Store
  listings of developer *5INCH VENTURES PVT. LTD.* — update counts as they grow.

## Deploy — GitHub Pages (free)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a GitHub repo and push this folder to its `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push (or run the workflow from the **Actions** tab). The site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

The workflow passes the right address to the build (`SITE_URL`, `BASE_PATH`), so links, images,
the sitemap and `robots.txt` all work under the `/<repo-name>/` path — nothing to edit by hand.
If you later add a custom domain (Settings → Pages → Custom domain), the next deploy switches to it automatically.

To try the GitHub Pages build locally:

```bash
SITE_URL=https://example.github.io BASE_PATH=/5inch-ventures-website npm run build && npm run preview
```

Any other static host works too (Netlify, Vercel, Cloudflare Pages): run `npm run build` and upload `dist/`.
