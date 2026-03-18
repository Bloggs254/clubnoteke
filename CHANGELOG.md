# Changelog

All notable changes to CLUBnoteKE are documented here.

---

## v1.0.0 — 2026-03-13

### New
- **`garage.html`** — Added personal Digital Garage page per member, including:
  - Car Profile Card (Member name, car nickname, reg plate, VIN, generation, engine, year, colour)
  - Service Timeline with "Add Entry" button
  - Next Service Countdown with a circular progress ring (green / amber / red)
- **PWA Support** — Added `manifest.json` and `sw.js` for installable, offline-capable app; linked to all pages
- **`community.html`** — Added "Member of the Month" spotlight section and "Live Feed" section

### Changed
- **`dashboard.html`** — Added "My Digital Garage" quick-link card
- **`css/shared.css`** — Added premium custom scrollbar, strengthened glassmorphism navbar blur, `.glass-card` utility, and `.relative` / `.z-10` / `.text-center` / `.hidden` utility classes
- **`js/main.js`** — Centralised magnetic button interaction, parallax hero effect, and PWA Service Worker registration; removed all redundant inline scripts from individual pages
- **`index.html`** — Removed reveal-animation delay from hero section for immediate content visibility; removed inline script block (now handled by `main.js`)
- **`membership.html`** — Fixed duplicate JSON-LD block; page-header title now renders immediately
- **`login.html`** — Restored missing `<style>` tag and removed duplicate `<meta>` / `<title>` entries; re-added full login CSS (container, logo, form controls, back-home link)

### Fixed
- **`js/main.js`** — Fixed unclosed `forEach` loop in the magnetic-button block that was silently breaking all scroll-reveal animations and interactive JS across every page
- **`about.html`, `events.html`, `blog.html`, `charity.html`, `gallery.html`, `privacy.html`, `contact.html`** — Removed redundant inline magnetic-button scripts; all pages now rely on the centralised `main.js` logic

---

## v1.1.0 — 2026-03-14 (Pre-launch Audit)

### Security
- **`admin.html`** — Added warning comment above hardcoded password; flagged for server-side auth replacement before production
- **`login.html`, `garage.html`, `admin.html`** — Added Content-Security-Policy meta tag (was missing on these pages)

### Fixed
- **`robots.txt`** — Added `login.html` and `garage.html` to Disallow list; previously inconsistent with sitemap
- **`sitemap.xml`** — Added `garage.html`; removed `dashboard.html` and `login.html` (these should not be Google-indexed)
- **`js/main.js`** — Removed `console.log('Form submitted')` debug statement
- **`assets/`** — Renamed three files with spaces in filenames: `charity drive Mombasa.jpeg` → `charity_drive_mombasa.jpeg`, `kisumu  Charity Drive.jpeg` → `kisumu_charity_drive.jpeg`, `soila girls 2.jpeg` → `soila_girls_2_alt.jpeg`

### Improved
- **All public pages** — `og:image` now uses absolute URLs (required for social share previews on WhatsApp, Twitter, Facebook)
- **All public pages** — Added missing `og:url` meta tag
- **All pages** — Fixed 22 dead social links (`href="#"`) for Facebook and YouTube, replaced with correct handles

### Added
- **`README.md`** — GitHub repository documentation with deployment instructions and auth notes
- **`.gitignore`** — Excludes `.DS_Store`, editor dirs, `purge_social.py`, and logs
- **`CNAME`** — Pre-configured for `clubnoteke.com` GitHub Pages deployment

---

## v1.2.0 — 2026-03-18 (Full Audit + Gradient Implementation)

### Visual / Design
- **`css/style.css`** — Applied full Automotive Gradient system from brief:
  - `.feature-card` now uses `--gradient-metallic` (brushed silver in light, carbon in dark)
  - `.feature-icon` has gradient red tint + red border ring at rest; fills solid red on hover with glow
  - `.stat-card::before` — red gradient racing stripe appears on hover only
  - `.stats` — dark vertical showroom gradient instead of flat colour
  - `.features` — subtle dual radial red glow from left/right edges (4% light, 7% dark)
  - `.cta` — crimson centre warmth overlay (25% opacity) lets hero photo breathe through
  - `.text-gradient` — applied to all `section-subtitle` spans and hero title key word
- **`login.html`** — Card entrance animation (spring wave, `cubic-bezier(0.34, 1.56, 0.64, 1)`) + password eye toggle

### New Features
- **`dashboard.html`** — Built missing Toolbox panel HTML (JS existed but elements were absent):
  - **Fuel Cost Calculator** — distance + fuel price inputs, live KES cost output, 14km/L Note avg
  - **Maintenance Logger** — oil change + insurance date inputs, DUE/EXPIRED alert badges, date checking logic
- **`dashboard.html`** — Added My Digital Garage quick-link panel (dark carbon card linking to garage.html)
- **`dashboard.html`** — Member ID now unique per member (hash of name → 4-digit suffix, e.g. CNK-2026-4821)
- **`dashboard.html`** — News feed pauses rotation on hover so users can read without it switching
- **`dashboard.html`** — Discount codes have one-click copy-to-clipboard with visual confirmation

### Bug Fixes
- **`blog.html`, `membership.html`** — Raw `**markdown**` bold replaced with `<strong>` HTML tags
- **`contact.html`** — Form now has `action="https://formspree.io/f/xwpbgnqo"` — submissions actually send
- **`dashboard.html`** — Maintenance save no longer uses `alert()` — replaced with non-blocking toast
- **`dashboard.html`** — Stale news item (March 31 deadline) replaced with May road trip event
- **`dashboard.html`** — WhatsApp group button wired to real `wa.me` URL
- **`events.html`** — All 6 RSVP buttons wired to WhatsApp with pre-filled message
- **`about.html`** — Team email icon links to `mailto:info@clubnoteke.com`
- **`community.html`** — "Read Interview" links to `blog.html`
- **`login.html`** — "Forgot Password?" links to `contact.html`
- **`js/main.js`** — Mobile hamburger menu now correctly shows "My Dashboard" when logged in (was stuck on "Member Login")
- **`index.html`** — Full H2 text-gradient removed from heading; applied only to accent word "Family"

### Performance
- **17 photo PNGs → JPEG** — 17MB assets → 7MB (59% reduction). hero-wide-lineup: 896KB → 95KB
- **`sw.js`** — Bumped to `clubnoteke-v2`, added `skipWaiting()`, `clients.claim()`, and activate handler to purge old caches

### SEO / Meta
- **All 16 pages** — Anti-dark-mode-flash (FOUC) script added to `<head>`
- **All 12 public pages** — Mobile nav login button added (hamburger item + desktop btn)
- **`css/shared.css`** — Mobile nav responsive rules (`nav-login-btn` hides ≤1024px, `mobile-login-item` shows)
- **`sitemap.xml`** — Updated all lastmod dates to 2026-03-18, fixed index canonical from `/index.html` to `/`
- **`privacy.html`** — Added missing `og:url` meta tag

---

## v1.2.1 — 2026-03-18 (UI Bug Fixes)

### Fixed
- **Nav — Double "Member Login" button** — The desktop `.nav-login-btn` and mobile `.mobile-login-item` were both occasionally visible at the same time due to CSS specificity conflicts. Added `!important` to both hide rules in `shared.css` to guarantee only one shows at any viewport width
- **Logo — No space between logo image and "CLUBnoteKE" text** — The `<img>` and `<div class="logo-text">` were on the same HTML line with no whitespace between them. Fixed on all 13 affected pages by adding a proper line break. Also added `margin-right: 0.1rem` to `.logo img` in `shared.css` as a safety net
- **Dashboard News Feed — Blank on first load** — The `showNextNews()` function started by fading opacity to 0 before setting content, causing a 500ms blank state on every page load. Refactored into a `renderNews(item)` helper: the first item now renders immediately at full opacity, and the fade transition only applies to subsequent rotations

---

## v1.3.0 — 2026-03-18 (Feature Expansion)

### New Pages
- **`thankyou.html`** — Post-membership application thank-you page with 4-step guide (check email → M-Pesa payment → WhatsApp code → receive group link). Animated card entrance, WhatsApp deep link pre-filled for payment confirmation.
- **`builds.html`** — Member car builds showcase. 3 featured builds (Kevin's NISMO, James's Red Devil, Barbra's E11 wrap) with modification tags, member quotes, and a "Submit Your Build" CTA. Linked in footer Resources across all pages.
- **`blog-rainy-season.html`** — First full individual blog article: "Preparing Your Note for the Long Rains". Full content (5-point checklist, bonus tips), BlogPosting JSON-LD schema for Google indexing, article hero image, meta tags. Linked from blog.html card.

### New Features
- **`events.html`** — Live countdown timer to Grand Tour (May 1–3, 2026) showing days/hours/minutes. Updates every 60 seconds. Full dark carbon banner with RSVP button.
- **`events.html`** — Convoy Routes section with embedded Google Map of Kenya + 4 route cards (Naivasha 2022, Mombasa 2022, Samburu 2022, Kisumu 2023) + upcoming May 2026 slot.
- **`index.html`** — Member testimonials slider (4 real quotes) before the CTA section. Auto-advances every 6 seconds. Uses the existing testimonial CSS already in style.css.
- **`index.html`** — Dismissible announcement banner at top of page for Grand Tour. Links to events.html RSVP. Closes on X click.
- **`community.html`** — Parts Marketplace section with 4 sample listings (For Sale, Wanted, Swap categories), filterable by type, each with WhatsApp contact button. "Submit a Listing" CTA at bottom.
- **`gallery.html`** — "Submit Your Car" section. Formspree form for name, car model, photo link (Google Drive/Instagram), caption. Reviewed before adding to gallery.
- **`membership.html`** — "Refer a Friend" section with WhatsApp invite button (pre-filled message), copy-link button, and Instagram link.
- **`login.html`** — Testing mode notice below form explaining any email/password works and real auth comes in production.

### Wiring
- **`membership.html`** — Form now redirects to `thankyou.html` after Formspree submission via `_next` hidden field. Also adds `_subject` field for cleaner email notifications.
- **`blog.html`** — Rainy season card now links to `blog-rainy-season.html` with "Read Article" button.
- **`sitemap.xml`** — Added `builds.html` (priority 0.8) and `blog-rainy-season.html` (priority 0.7).
- **`events.html`** — CSP updated to allow `frame-src https://www.google.com` for the convoy map embed.
