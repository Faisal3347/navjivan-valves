# Navjivan Valves — Website Rebuild: SEO Audit & Handover Report

This report accompanies the rebuilt static website (HTML/CSS/vanilla JS).
It documents what was kept, merged, removed, and why, plus the technical
and SEO decisions made during the rebuild.

---

## A. Page Inventory — Old Page → New Page → Decision

| Old Page | New Page | Decision |
|---|---|---|
| index.html | / (index.html) | **Keep** — rebuilt |
| About.html | /about.html | **Keep** — rebuilt |
| OurServices.html | /about.html | **Merge** — thin standalone services content folded into About |
| Contact.html | /contact.html | **Keep** — rebuilt, form simplified |
| Clientele.html | /clientele.html | **Keep** — rebuilt |
| Gallery.html | /gallery.html | **Keep** — rebuilt |
| Valve.html | /products.html | **Keep** — rebuilt as the products hub |
| Ballvalve.html | /products/ball-valves.html | **Keep** — rebuilt, expanded content |
| Gatevalve.html | /products/gate-valves.html | **Keep** — rebuilt, expanded content |
| Globevalve.html | /products/globe-valves.html | **Keep** — rebuilt, expanded content |
| Butterflyvalve.html | /products/butterfly-valves.html | **Keep** — rebuilt, expanded content |
| Checkvalve.html | /products/check-valves.html | **Keep** — rebuilt, expanded content |
| Plugvalve.html | /products/plug-valves.html | **Keep** — rebuilt, expanded content |
| Strainervalve.html | /products/strainer-valves.html | **Keep** — rebuilt, expanded content |
| Safetyvalve.html | /products/safety-valves.html | **Keep** — rebuilt, expanded content |
| Controlvalve.html | /products/control-valves.html | **Keep** — rebuilt, expanded content |
| PRDS.html | /products/prds-systems.html | **Keep** — rebuilt, expanded content |
| Flange.html | /products/flanges.html | **Keep** — rebuilt as flange hub |
| AlloySteelFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| CarbonSteelFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| StainlessSteelFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| ForgedFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| MildSteelFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| PlateFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| WeldingFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| SlipOnFlange.html | /products/flanges.html | **Merge** — thin, near-duplicate content consolidated |
| Pipe.html | /products/pipes.html | **Keep** — rebuilt |
| Fitting.html | /products/fittings.html | **Keep** — rebuilt |
| Navjivanvalve.html | /brands.html | **Merge** — brand pages consolidated |
| AudcoValve.html | /brands.html | **Merge** — brand pages consolidated |
| LeaderValve.html | /brands.html | **Merge** — brand pages consolidated |
| KirloskarValve.html | /brands.html | **Merge** — brand pages consolidated |
| KSBValve.html | /brands.html | **Merge** — brand pages consolidated |
| SpiraxForbesMarshall.html | /brands.html | **Merge** — brand pages consolidated |
| Uniklinger.html | /brands.html | **Merge** — brand pages consolidated |
| Unitekvalve.html | /brands.html | **Merge** — brand pages consolidated |
| /wp-json/* (106 files) | — | **Remove** — WordPress REST API dumps, not real pages, never should have been crawlable |
| /wp-content/, /wp-admin/, /wp-includes/ | — | **Remove** — WordPress system/theme/plugin files, not content |

**New pages added** (no old equivalent, built to fill genuine search-intent gaps
identified in the requirements): 5 industry pages (Oil & Gas, Petrochemical &
Chemical, Power Generation, Water & Wastewater Treatment, Pharmaceutical &
Food Processing) and 3 location pages (Mumbai, Thane, Pune) — see the "New
Pages" rationale below.

### Why industries/ and locations/ pages were added
The original site listed industries served and implied multiple service
locations (Thane office, factory address) but had no dedicated landing pages
capturing that search intent (e.g. "industrial valve supplier in Mumbai",
"valves for oil and gas industry"). Five industries and three locations —
those directly supported by real content in the original site (industries
list, office/factory addresses) — were built out with genuinely useful,
non-doorway content, per the "no doorway pages" requirement.

---

## B. Sitemap Cleanup

**Removed entirely** (not carried into the new sitemap):
- All 106 `/wp-json/*` files — WordPress REST API/oEmbed endpoints that were
  being crawled as if they were pages
- `/wp-content/`, `/wp-admin/`, `/wp-includes/` directories and their assets
- Elementor/Astra page-builder generated markup fragments
- 8 thin flange sub-pages (merged into one strong flange page — see above)
- 8 thin brand sub-pages (merged into one strong brands page — see above)
- OurServices.html as a standalone URL (content merged into About)

**Result:** the old project had ~34 HTML pages plus 106 junk JSON/API URLs
(140+ crawlable paths). The new sitemap has **28 URLs**, every one a genuine,
substantial, indexable page — in line with "50 excellent pages beats 500 thin
ones."

---

## C. New Sitemap — Final Indexable URLs

```
/                                          (Home)
/about.html
/products.html
/products/ball-valves.html
/products/gate-valves.html
/products/globe-valves.html
/products/butterfly-valves.html
/products/check-valves.html
/products/plug-valves.html
/products/strainer-valves.html
/products/safety-valves.html
/products/control-valves.html
/products/prds-systems.html
/products/flanges.html
/products/pipes.html
/products/fittings.html
/industries/oil-gas.html
/industries/petrochemical.html
/industries/power-generation.html
/industries/water-treatment.html
/industries/pharmaceutical.html
/locations/mumbai.html
/locations/thane.html
/locations/pune.html
/brands.html
/clientele.html
/gallery.html
/contact.html
```
(Machine-readable version: `/sitemap.xml`, already generated.)

---

## D. Keyword Mapping

| Page | Primary Keyword | Secondary Keywords | Intent |
|---|---|---|---|
| Home | industrial valve supplier India | valve manufacturer, flanges pipes fittings supplier | Commercial / brand |
| Ball Valves | ball valve supplier | ball valve manufacturer, industrial ball valve, trunnion ball valve | Commercial |
| Gate Valves | gate valve supplier | gate valve manufacturer, forged steel gate valve | Commercial |
| Globe Valves | globe valve supplier | globe valve manufacturer, bellow sealed globe valve | Commercial |
| Butterfly Valves | butterfly valve supplier | butterfly valve manufacturer, triple offset butterfly valve | Commercial |
| Check Valves | check valve supplier | non return valve, dual plate check valve | Commercial |
| Plug Valves | plug valve supplier | lubricated plug valve, sleeved plug valve | Commercial |
| Strainers | industrial strainer supplier | y type strainer, basket strainer | Commercial |
| Safety Valves | safety relief valve supplier | pressure relief valve, FMSRV | Commercial |
| Control Valves | control valve supplier | pneumatic control valve | Commercial |
| PRDS Systems | PRDS system supplier | pressure reducing desuperheating system | Commercial |
| Flanges | industrial flange supplier | welding neck flange, slip on flange | Commercial |
| Pipes | industrial pipe supplier | seamless pipe, ERW pipe | Commercial |
| Fittings | pipe fittings supplier | elbow, tee, reducer supplier | Commercial |
| Oil & Gas | valve supplier for oil and gas | oil gas pipeline valves | Commercial / local |
| Petrochemical | valve supplier for chemical plants | petrochemical valves | Commercial |
| Power Generation | valve supplier for power plants | boiler valves, steam valves | Commercial |
| Water Treatment | valve supplier for water treatment | wastewater valves | Commercial |
| Pharmaceutical | valve supplier for pharma industry | food processing valves | Commercial |
| Mumbai | industrial valve supplier in Mumbai | valve dealer Mumbai | Local commercial |
| Thane | industrial valve supplier in Thane | valve manufacturer Thane | Local commercial |
| Pune | industrial valve supplier in Pune | valve dealer Pune | Local commercial |
| About | Navjivan Valves company | valve company India | Informational / brand |
| Contact | contact Navjivan Valves | request valve quote | Transactional |

No page targets more than one primary intent; secondary keywords appear
naturally in body copy, not stuffed into headings repeatedly.

---

## E. Metadata Summary

Every one of the 28 pages has a **unique** `<title>` and meta description —
verified programmatically (0 duplicates found). Titles follow the pattern
`[Product/Topic] Supplier & Manufacturer in India | Navjivan Valves` for
commercial pages, and a descriptive variant for informational pages
(About, Contact, Gallery, etc). Full list is embedded in each page's
`<head>` — see `sitemap.xml` for the URL list and open any page to inspect
its title/description directly.

---

## F. Schema (Structured Data) Implemented

| Page type | Schema types |
|---|---|
| Home | `Organization`, `WebSite` |
| All inner pages | `BreadcrumbList` |
| Product pages (10 valve types) | `Product` (with "Price on Request" price specification, no fake offers/ratings), `FAQPage` |
| Flanges / Pipes / Fittings | `BreadcrumbList` only (general category pages, not single-SKU products) |
| Industries / Locations | `BreadcrumbList` |

No fake ratings, reviews, aggregateRating, or stock/price claims were added
anywhere — only what's genuinely supportable from the page's visible content.
All JSON-LD was validated for syntax (0 parse errors across all 28 pages).

---

## G. Redirects (Old URL → New URL → 301)

See **`REDIRECTS.md`** for the complete mapping — every valuable old URL
maps to a real new page (mostly 1:1, with the flange and brand sub-pages
mapping many-to-one into their new consolidated hub pages). WordPress system
paths (`/wp-content/`, `/wp-json/*`, etc.) are intentionally **not**
redirected — they should 404, since they were never real content.

---

## H. Product Pricing

No product-specific pricing was invented or scraped from third-party sources
for this rebuild. Every product page displays:

> **Price on Request** — pricing depends on size, pressure class, material
> and order quantity.

This was a deliberate choice rather than an oversight: industrial B2B valve
pricing (across dozens of SKUs, sizes, materials and pressure classes) is not
reliably published anywhere public, and third-party listings that do exist
are frequently for different specifications, regions, or currencies than what
Navjivan Valves actually sells — presenting them as this business's pricing
would risk misleading buyers. This matches the brief's explicit fallback
instruction: *"If reliable pricing cannot be established, display 'Price on
Request.'"* The `Product` schema on each page reflects this honestly (no
fabricated `offers.price`).

| Product | Pricing source | Price type | Shown as |
|---|---|---|---|
| All 10 valve product pages | None reliable/verifiable found | — | "Price on Request" |
| Flanges / Pipes / Fittings | None reliable/verifiable found | — | "Price on Request" |

---

## I. Technical SEO

- **Canonical tags** — every page has a self-referencing absolute canonical URL.
- **Robots** — all real content pages are `index, follow`. `robots.txt` allows
  full crawling and points to `/sitemap.xml`.
- **Sitemap** — `sitemap.xml` lists all 28 canonical URLs with `lastmod` and
  priority hints; no redirects, 404s, or noindex pages included.
- **Structured data** — see section F above.
- **Indexing hygiene** — no query-string, pagination, tag, author, or
  attachment URLs exist in the new site at all (they simply weren't rebuilt),
  so there's nothing for search engines to encounter and flag as duplicate.
- **HTTPS / www** — the site assumes canonical domain
  `https://www.navjivanvalves.com` (matching the sitemap URL already declared
  in the original `robots.txt`). Configure your host so both the non-www and
  HTTP variants 301 to this canonical host.

---

## J. Performance

- **CSS**: one hand-written stylesheet (~14 KB uncompressed, no framework,
  no unused rules) replaces what was previously dozens of theme/plugin CSS
  files (Elementor, Astra, ElementsKit, animation libraries, Font Awesome,
  Swiper, etc.) totalling several hundred KB.
- **JavaScript**: one small vanilla file (~3 KB) handles the mobile menu,
  FAQ accordions and the enquiry form — replacing jQuery, Elementor's JS
  bundle, ElementsKit widgets JS, and other plugin scripts.
- **Fonts**: a single Google Font weight pair (Barlow Condensed 600/700) is
  loaded for headings only; body text uses the system font stack (no font
  request at all), versus four separate font families (Ubuntu, Mulish,
  League Spartan, Roboto Condensed) loaded in the original.
- **Images**: 72 images actually used across the site were resized (max
  1000px width), re-compressed as JPEG (quality 72) and renamed to
  descriptive, SEO-friendly filenames (e.g. `industrial-ball-valve-navjivan-
  valves.jpg` instead of `9-1.jpg`). Total image payload for the whole site
  is **~2.4 MB** across all 72 images (avg. ~33 KB each) — all marked
  `loading="lazy"` except the above-the-fold hero image. The original
  project's single uploads folder alone contained 400+ unoptimized image
  files.
- **DOM size**: hand-written semantic HTML with no page-builder wrapper divs
  — each page is a fraction of the DOM node count of the Elementor-generated
  originals (which nested many redundant `<div>` wrappers per visual element).
- **Expected Core Web Vitals impact**: significantly reduced render-blocking
  CSS/JS, far fewer requests per page, and compressed, appropriately-sized
  images should meaningfully improve LCP, INP and CLS versus the original
  WordPress export.

---

## Assumptions & notes for the client

1. **Domain**: all canonical URLs, sitemap entries and schema assume
   `https://www.navjivanvalves.com`. If the live domain differs, do a
   find-and-replace of `https://www.navjivanvalves.com` across the HTML
   files (or ask for a regenerated build with the correct domain).
2. **Contact form**: the enquiry form uses a `mailto:` fallback (no backend
   included, per the "no unnecessary dependencies" requirement). If you'd
   like server-side form handling (e.g. to a form endpoint service or your
   own backend), that's a small follow-up change to `assets/js/main.js`.
3. **Flange anchor IDs**: the flange type redirects point to
   `/products/flanges.html#section-id` — see the note at the bottom of
   `REDIRECTS.md` for the one small manual step to wire up those anchors.
4. **Testimonials** carried over from the original homepage are presented as
   supplied; no ratings/review schema was added since they weren't
   structured, attributable reviews.
5. Facts, specifications, and standards on every product page were sourced
   directly from the existing Navjivan Valves website content — nothing was
   invented. Where the original site repeated the same generic spec block
   across multiple valve types, that repetition is reflected here too
   (it appears to be genuinely accurate baseline data the business quotes
   across its range) rather than fabricated new numbers.
