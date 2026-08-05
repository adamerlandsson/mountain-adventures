# Mountain Adventures — Adam Erlandsson

A photography-first site for logging mountain trips.

**Everything you edit lives in one file: [`content.js`](content.js).**
Your name, your links, your trip reports, your gallery. Nothing else needs
touching. Change it, save, refresh — done.

---

## The 30-second version

| I want to…                | Do this                                                        |
| ------------------------- | -------------------------------------------------------------- |
| Add a trip report         | Copy a block in `TRIPS` in `content.js`, change the words       |
| Add a gallery photo       | Drop the file in `images/`, add one line to `GALLERY`           |
| Change a photo            | Put the new file in `images/`, write its name in `content.js`   |
| Change my name / links    | Edit `SITE` at the top of `content.js`                          |
| Change the big top photos | Edit `HEROES` in `content.js`                                   |
| Change colours or fonts   | Edit the `:root` block at the top of `style.css`                |

---

## Adding a trip report

Open `content.js`, find the `TRIPS` list, and copy one whole block —
everything from `{` to `},` — then paste it at the top and change the words.
Newest goes first.

```js
{
  slug:  "stetind-south-pillar",          // the web address, no spaces
  title: "Stetind, South Pillar",
  date:  "12 August 2026",
  stats: "18 pitches · +1,392 m",
  cover: "my-photo.jpg",                  // a file inside images/
  focus: "center",                        // which part to keep when cropped
  summary: "One sentence shown on the cards.",
  story: [
    "First paragraph.",
    "Second paragraph.",
  ],
  photos: [
    { image: "another-photo.jpg", caption: "What's happening here" },
  ],
},
```

That's the whole job. The homepage, the trip reports page, and the report's
own page all build themselves from it — including the next/previous links.

**No `photos`?** Leave it as `photos: []`.

---

## Adding a gallery photo

1. Put the photo in the `images/` folder.
2. Add one line to `GALLERY` in `content.js`:

```js
{ image: "sunset-ridge.jpg", caption: "Last light on the ridge" },
```

For a wide (landscape) photo, let it span the full width:

```js
{ image: "wide-valley.jpg", caption: "The whole valley", wide: true },
```

---

## Photos: two things worth knowing

**Keep them small.** Photos straight off a phone are 3–7 MB each and make the
site slow. Double-click **`shrink-photos.command`** and it shrinks everything
in `images/` down to web size (about 300–700 KB) with no visible difference.
It skips files that are already fine, so it's safe to run any time.

**Control the crop with `focus`.** Photos get cropped to fit their box. If the
crop cuts off the good part, set `focus`:

```js
focus: "center"        // the default
focus: "top"           // keep the top (good for peaks and sky)
focus: "bottom"        // keep the bottom
focus: "center 30%"    // fine-tune: 0% is the very top, 100% the very bottom
```

---

## The files

```
content.js            ← everything you edit lives here
images/               ← your photos

index.html            Home
trip-reports.html     All reports
gallery.html          Photo grid
report.html           Shows any one report (report.html?trip=the-slug)
404.html              Shown for a bad web address

style.css             Colours, fonts, spacing — the look
site.js               Builds the pages from content.js — you can ignore this
shrink-photos.command Double-click to shrink oversized photos
```

There is no build step and nothing to install. It's plain HTML, CSS and
JavaScript — GitHub Pages serves the files exactly as they are.

---

## Previewing before you publish

Double-clicking `index.html` works for a quick look. To see it exactly as
visitors will, run this in Terminal from inside the project folder:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Press `Ctrl+C` to stop.

---

## Publishing

Commit and push to the `main` branch. GitHub Pages redeploys within a minute
or two. If a change doesn't show up, hard-refresh: **Cmd+Shift+R**.

---

## If something looks wrong

The most likely cause is a small typo in `content.js`. Check that:

- every line ends with a comma `,`
- text is wrapped in `"quotes"`
- each block still has its opening `{` and closing `},`
- the photo file name matches the file in `images/` **exactly**, including
  capitals and the `.jpg` ending

If a photo is missing you'll see a broken-image icon rather than a silent
blank space — that's deliberate, so mistakes are easy to spot.
