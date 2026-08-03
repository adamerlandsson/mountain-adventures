# Field Log — My Mountain Adventures

A personal expedition journal for logging summits, trails, and everything in between. Designed around a topographic/elevation-profile aesthetic — the wavy line in the header is both decoration and a nod to a real elevation chart.

## How to use

1. Open `index.html` in your browser to view the blog
2. To log a new adventure, duplicate one `<article class="entry">` block (plus the `<div class="mini-divider">` above it) and fill in:
   - The `Entry NN` number badge
   - The title (`<h2>`)
   - The four stats in `.stat-strip`: date, elevation gain, distance, rating
   - The image `src`, `alt` text, and `figcaption`
   - Your story paragraph(s)
   - Add `class="flip"` to the `<article>` to alternate the photo to the right on wide screens
3. To use your own photos, drop them in the `images/` folder and point `src` at e.g. `images/my-photo.jpg` instead of the placeholder URL

## Features

- Distinctive "field log" design — dark alpine hero, animated elevation-profile signature line, mono data readouts styled like trail-sign stats
- Photos framed like taped-in field-journal prints, with a gentle tilt that straightens on hover
- Fully responsive, alternating image/text layout on desktop, stacked on mobile
- No build tools, no dependencies beyond Google Fonts — just edit the HTML

Enjoy logging your adventures! 🏔️
