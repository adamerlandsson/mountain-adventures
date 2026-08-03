# Mountain Adventures — Adam Erlandsson

A clean, photography-first personal site for logging mountain trips: full-bleed hero, trip reports with big photos, and a standalone gallery for one-off shots.

## How to use

1. Open `index.html` in your browser to view the site
2. **Nav**: your name and the three section links live in `<nav class="nav">` at the top — edit the name text or link labels there
3. **Trip reports**: to log a new adventure, duplicate one `<article class="report">` block under `id="trip-reports"` and fill in:
   - The photo `src` and `alt`
   - The title (`<h3>`)
   - The meta line (`.report-meta`): date · distance · elevation gain
   - Your story paragraph(s)
4. **Gallery**: to add a standalone photo, duplicate one `<a><img></a>` pair inside `.gallery` under `id="gallery"` — the first image in the grid always spans full width, the rest tile two-up
5. To use your own photos, drop them in the `images/` folder and point `src` at e.g. `images/my-photo.jpg` instead of the placeholder URL

## Features

- Clean, light, photography-first layout inspired by editorial adventure blogs — one accent color, generous whitespace, big images
- Sticky nav with your name and Home / Trip reports / Gallery links
- Full-bleed hero photo with overlaid title
- Subtle zoom-on-hover on photos, no heavy effects
- Fully responsive, no build tools, no dependencies beyond Google Fonts

Enjoy logging your adventures! 🏔️
