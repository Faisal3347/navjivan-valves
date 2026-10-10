# Navjivan Valves — Rebuilt Website

A clean, dependency-free static website (HTML5 + CSS3 + vanilla JavaScript)
rebuilt from the original WordPress export, using its visual identity,
branding and product content as the reference.

## What's in this zip

```
site/                      ← the actual website — deploy this folder's contents
  index.html
  about.html, contact.html, products.html, brands.html, clientele.html, gallery.html
  products/                ← 13 product pages (10 valve types + flanges/pipes/fittings)
  industries/               ← 5 industry landing pages
  locations/                ← 3 location landing pages
  assets/
    css/style.css          ← single stylesheet, no framework
    js/main.js              ← vanilla JS (mobile nav, FAQ accordions, enquiry form)
    images/                  ← 72 optimized, descriptively-named images
  sitemap.xml
  robots.txt

SEO-AUDIT-REPORT.md        ← full audit: page inventory, keyword map, schema, performance notes
REDIRECTS.md               ← old-URL → new-URL 301 redirect mapping
```

## Deploying

This is a fully static site — upload the contents of `site/` to any static
host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, or a normal Apache/
Nginx web server). No build step, database, or server-side code is required.

Before going live:

1. **Set up the 301 redirects** listed in `REDIRECTS.md` on your web server,
   so old indexed URLs (e.g. `/Ballvalve.html`) forward to their new
   equivalents (`/products/ball-valves.html`) instead of 404ing.
2. **Confirm the domain** — all canonical tags, `sitemap.xml`, and schema
   assume `https://www.navjivanvalves.com`. Update if the live domain differs.
3. **Submit `/sitemap.xml`** to Google Search Console once live.
4. Optionally wire up the contact form to a backend/email service if you'd
   rather not rely on the built-in `mailto:` fallback.

## Design & content notes

- Colors, logo and overall visual language are taken directly from the
  existing Navjivan Valves brand (red `#ED1C24` / navy `#101828`).
- All product specifications, standards, materials and company details are
  sourced from the original site's real content — nothing was invented.
- Pricing is shown as "Price on Request" throughout, since reliable public
  pricing for these industrial products could not be verified (see the audit
  report, section H, for the reasoning).

See `SEO-AUDIT-REPORT.md` for the complete rebuild rationale.
