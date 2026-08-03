# Mountain Adventures — Adam Erlandsson

A clean, photography-first personal site for logging mountain trips, split across real pages: a homepage with a teaser of recent trips, a full trip reports overview, individual pages per report, and a standalone gallery.

Every page has a full-bleed hero photo with a transparent nav floating on top of it (your name in serif, links, and social icons) — no solid nav bar, the photo carries it. This means the nav scrolls away once you scroll past a page's hero, by design, matching the reference look. If you'd rather it stay pinned while scrolling, that needs a small bit of JavaScript — just ask.

## Site structure

```
index.html              Home — hero + latest trip report cards
trip-reports.html        Overview — every trip report as a card
gallery.html              Standalone photo grid
reports/
  misty-peak.html         Individual trip report
  forest-trail.html        Individual trip report
  alpine-lake.html          Individual trip report
style.css                 Shared styles for every page
images/                    Drop your own photos here
```

## How to add a new trip report

1. Duplicate `reports/misty-peak.html` as `reports/your-trip-slug.html` and edit:
   - The hero image `src` + `alt`
   - The title (`<h1>`) and meta line (date · distance · elevation gain)
   - The story paragraph(s) in `<main class="report-detail">`
   - The `.report-nav` links at the bottom to point at your actual neighboring reports
2. Add a matching card (image, title, meta line, link) to the `.report-grid` in `trip-reports.html`
3. Optionally add the same card to the teaser on `index.html` if it's one of your latest trips

## How to add a gallery photo

Duplicate an `<a><img></a>` pair inside `.gallery` in `gallery.html`. The first image in the grid always spans full width; the rest tile two-up.

## Using your own photos

Drop files into `images/` and point any `src` at e.g. `images/my-photo.jpg` instead of the placeholder URL.

## Editing shared bits (nav, footer, colors)

All shared styling lives in `style.css` — change it once and it updates every page. The nav markup itself is repeated at the top of each HTML file (adjust `../` prefixes if you add pages inside `reports/`).

## Social icons

The three circular icons in the nav (Instagram, YouTube, email) currently point nowhere (`href="#"`) or to a placeholder email. Find them near the top of each HTML file inside `<div class="nav-social">` and swap in your real profile URLs / email address — there are 6 copies (one per page) to update.

Enjoy logging your adventures! 🏔️
