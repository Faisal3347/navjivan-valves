# Navjivan Valves — URL Redirect Map (Old → New)

Apply these as 301 redirects on the web server (Apache `.htaccess`, Nginx config,
or your hosting panel's redirect tool) when the new site goes live at the same
domain. All old page filenames below refer to the WordPress→HTML export you
supplied; the new URLs refer to this rebuilt static site.

| Old URL | New URL | Type |
|---|---|---|
| /index.html | / | 301 |
| /About.html | /about.html | 301 |
| /Contact.html | /contact.html | 301 |
| /OurServices.html | /about.html | 301 (merged — service info folded into About) |
| /Clientele.html | /clientele.html | 301 |
| /Gallery.html | /gallery.html | 301 |
| /Valve.html | /products.html | 301 |
| /Ballvalve.html | /products/ball-valves.html | 301 |
| /Gatevalve.html | /products/gate-valves.html | 301 |
| /Globevalve.html | /products/globe-valves.html | 301 |
| /Butterflyvalve.html | /products/butterfly-valves.html | 301 |
| /Checkvalve.html | /products/check-valves.html | 301 |
| /Plugvalve.html | /products/plug-valves.html | 301 |
| /Strainervalve.html | /products/strainer-valves.html | 301 |
| /Safetyvalve.html | /products/safety-valves.html | 301 |
| /Controlvalve.html | /products/control-valves.html | 301 |
| /PRDS.html | /products/prds-systems.html | 301 |
| /Flange.html | /products/flanges.html | 301 |
| /AlloySteelFlange.html | /products/flanges.html#alloy-steel | 301 |
| /CarbonSteelFlange.html | /products/flanges.html#carbon-steel | 301 |
| /StainlessSteelFlange.html | /products/flanges.html#stainless-steel | 301 |
| /ForgedFlange.html | /products/flanges.html#forged | 301 |
| /MildSteelFlange.html | /products/flanges.html#mild-steel | 301 |
| /PlateFlange.html | /products/flanges.html#plate | 301 |
| /WeldingFlange.html | /products/flanges.html#welding-neck | 301 |
| /SlipOnFlange.html | /products/flanges.html#slip-on | 301 |
| /Pipe.html | /products/pipes.html | 301 |
| /Fitting.html | /products/fittings.html | 301 |
| /Navjivanvalve.html | /brands.html | 301 (merged) |
| /AudcoValve.html | /brands.html | 301 (merged) |
| /LeaderValve.html | /brands.html | 301 (merged) |
| /KirloskarValve.html | /brands.html | 301 (merged) |
| /KSBValve.html | /brands.html | 301 (merged) |
| /SpiraxForbesMarshall.html | /brands.html | 301 (merged) |
| /Uniklinger.html | /brands.html | 301 (merged) |
| /Unitekvalve.html | /brands.html | 301 (merged) |

## Why the individual flange and brand pages were merged

The old flange pages (Alloy Steel, Carbon Steel, Stainless Steel, Forged, Mild
Steel, Plate, Welding, Slip-On) each carried only a few lines of unique text —
the rest was repeated boilerplate. Rather than keep eight thin, near-duplicate
pages, they were consolidated into one strong `/products/flanges.html` page
with a clearly separated section per flange type. This concentrates SEO
relevance instead of splitting it across near-identical pages, and every old
URL still lands the visitor on the exact right section via the anchor link
(add the `#anchor` ids in the HTML if you want the jump-link behaviour — see
the "Optional" note below).

Similarly, the eight individual brand pages (Audco, Leader, Kirloskar, KSB,
Spirax/Forbes Marshall, Uniklinger, Unitek, and "Navjivan Valves" as its own
brand page) contained short, largely repetitive brand blurbs. These are now
presented as clear sections on one `/brands.html` page, which is stronger for
both users and search engines than eight thin pages.

## Junk / non-indexable URLs — no redirect needed

The following URL patterns found in the original project are WordPress
system files, not real content pages. They should return 404 (or simply not
exist on the new static host) rather than being redirected:

- `/wp-content/`, `/wp-admin/`, `/wp-includes/`
- `/wp-json/*` (all REST API endpoints, oEmbed URLs, page-by-ID JSON dumps)
- Any `/wp-content/uploads/wpo/*` cache/plugin artifacts
- Elementor/Astra theme and plugin asset paths

## Optional: enabling the flange in-page anchors

If you'd like the redirected flange URLs to scroll straight to their section,
add `id="alloy-steel"`, `id="carbon-steel"`, `id="stainless-steel"`,
`id="forged"`, `id="mild-steel"`, `id="plate"`, `id="welding-neck"` and
`id="slip-on"` to the corresponding `<div class="card">` wrapper (or a
preceding heading) in `products/flanges.html`. This is a small manual step
left for you since it's a cosmetic enhancement, not a functional requirement.
