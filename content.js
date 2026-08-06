/* ==========================================================================
   content.js  —  THIS IS THE ONLY FILE YOU NEED TO EDIT.

   Everything on the website comes from this one file: your name, your
   links, your trip reports, and your gallery photos.

   Three rules, and you can't really break it:
     1. Text goes inside "quotes".
     2. Every line ends with a comma,
     3. Photos go in the images/ folder, then write the file name here.

   Save the file, refresh the page, and your change is live.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. YOUR DETAILS
   Shown in the top bar and the footer of every page.
   Leave a link as "" (empty) to hide that icon.
   -------------------------------------------------------------------------- */
const SITE = {
  name:      "Adam Erlandsson",
  subtitle:  "Mountain Adventures",
  blurb:     "",

  email:     "",
  instagram: "",        // e.g. "https://instagram.com/yourname"
  youtube:   "",        // e.g. "https://youtube.com/@yourname"
};


/* --------------------------------------------------------------------------
   2. PAGE HEADER PHOTOS
   The big photo at the top of each page. Wide (landscape) photos work best
   here. `focus` decides which part stays visible when the photo is cropped —
   "center", "top", "bottom", or something like "center 30%".
   -------------------------------------------------------------------------- */
const HEROES = {
  home: {
    image: "ski-touring.jpg",
    focus: "center",
    alt:   "Mont Blanc",
  },
  trips: {
    image:   "tarn-and-snowfield.jpg",
    focus:   "center",
    alt:     "A tarn and snowfield below the ridgeline",
    eyebrow: "The full log",
    title:   "Trip Reports",
    blurb:   "Every logged adventure, most recent first.",
  },
  gallery: {
    image:   "golden-hour-over-the-fjord.jpg",
    focus:   "center 45%",
    alt:     "Golden evening light over the fjord and distant peaks",
    eyebrow: "In between the stories",
    title:   "Gallery",
    blurb:   "Moments that didn't need a whole story.",
  },
};


/* --------------------------------------------------------------------------
   3. TRIP REPORTS
   To ADD a trip: copy one whole block from { to }, paste it at the top of
   the list, and change the words. Newest first. That's it — the homepage,
   the trip reports page and the report's own page all update themselves.

     slug     the web address for the report (letters and dashes, no spaces)
     title    the headline
     date     "3 August 2026" — written however you like
     stats    the small line under the title. Use " · " between the parts.
     cover    the photo used on the cards and at the top of the report
     focus    which part of the cover photo to keep when it's cropped
     summary  one sentence, shown under the title on the cards
     story    your write-up. Each "paragraph in quotes", separated by commas.
     photos   more photos shown at the bottom of the report (optional —
              leave it as an empty list [] if you don't want any)
   -------------------------------------------------------------------------- */
const TRIPS = [

  {
    slug:  "misty-peak",
    title: "Summit of the Misty Peak",
    date:  "3 August 2026",
    stats: "14.2 km · +1,240 m gain",
    cover: "on-top.jpg",
    focus: "center 35%",
    summary: "A 4 AM start, a long slab in the cold, and a sunrise that made all of it worth it.",
    story: [
      "Today was unforgettable. We woke up at 4 AM and started the climb while the stars were still out. The last 500 metres were the hardest — thin air, steep switchbacks, legs burning — but when we reached the summit just as the sun broke the horizon, all of it melted away. Endless ridgelines in every direction, and the valley below completely shrouded in mist.",
      "We stayed an hour at the top, ate cold energy bars, and said almost nothing. Worth every step.",
    ],
    photos: [
      { image: "orange-jacket-scramble.jpg", caption: "Scrambling up to the start of the route" },
      { image: "rope-and-granite.jpg",       caption: "Rope running out over clean granite" },
      { image: "pitch-after-pitch.jpg",      caption: "Pitch after pitch of perfect rock" },
      { image: "slab-above-the-lake.jpg",    caption: "High above the tarn, most of the way up" },
      { image: "summit-high-five.jpg",       caption: "On top, finally" },
      { image: "the-summit-register.jpg",    caption: "Signing the summit register" },
    ],
  },

  {
    slug:  "forest-trail",
    title: "Forest Trail Discovery",
    date:  "28 July 2026",
    stats: "9.6 km · +410 m gain",
    cover: "forest-approach.jpg",
    focus: "center",
    summary: "A hidden trail through old-growth pines, with no signage and almost no footprints.",
    story: [
      "Found a hidden trail today while poking around the backcountry near Eagle Lake — old-growth pines, and clearings that suddenly open onto the water. A family of deer was grazing at the shoreline; somewhere off in the trees, an eagle kept calling.",
      "Barely any foot traffic — fallen logs across the path, no signage at all — but absolutely worth the extra scrambling. Coming back here next month with better boots.",
    ],
    photos: [
      { image: "birch-forest.jpg",            caption: "Birch forest on the way in" },
      { image: "trail-through-the-trees.jpg", caption: "The trail, where it existed at all" },
      { image: "valley-opens-up.jpg",         caption: "The valley opening up above the treeline" },
    ],
  },

  {
    slug:  "alpine-lake",
    title: "Alpine Lake Camping",
    date:  "15 July 2026",
    stats: "3 days · +890 m gain",
    cover: "lake-from-the-scree.jpg",
    focus: "center",
    summary: "Three days camped on a ridge above water so clear you can see straight to the bottom.",
    story: [
      "Three days out to the alpine lake was exactly what I needed. The water is impossibly clear — you can see straight to the bottom, even in the deepest parts. We camped on a ridge above it and watched the light change for hours as the sun dropped behind the western peaks.",
      "Sunrise the next morning was even better — mist rising off the water, gold light on the granite. This is exactly why I keep coming back to the mountains.",
    ],
    photos: [
      { image: "scrambling-to-the-lake.jpg", caption: "Picking a way down to the water" },
      { image: "wall-above-the-tarn.jpg",    caption: "The wall above the tarn" },
      { image: "last-light.jpg",             caption: "Last light over the fjord" },
    ],
  },

];


/* --------------------------------------------------------------------------
   4. GALLERY
   Standalone photos that don't need a whole story.

   To ADD a photo: drop the file in the images/ folder, then add one line
   here. Order on the page = order in this list.

     image    the file name inside images/
     caption  shown under the photo and in the large view
     wide     add `wide: true` to let a landscape photo span the full width
     focus    optional, which part to keep when cropped
   -------------------------------------------------------------------------- */
const GALLERY = [
  // the walk in
  { image: "stetind-from-the-road.jpg",      caption: "First sight of the peak from the road" },
  { image: "peak-through-the-birches.jpg",   caption: "Through the birches on the walk in" },
  { image: "the-big-wall.jpg",               caption: "The face, seen from the approach" },

  { image: "summit-celebration.jpg",         caption: "The moment it was finally done", wide: true },

  // the top, and the long light afterwards
  { image: "fjord-from-the-ridge.jpg",       caption: "The fjord, a long way down" },
  { image: "the-peak-in-profile.jpg",        caption: "The peak in profile" },
  { image: "the-summit-register.jpg",        caption: "Everyone who came before" },
  { image: "golden-hour-over-the-fjord.jpg", caption: "Golden hour over the water" },
  { image: "looking-out.jpg",                caption: "Watching the light go" },
  { image: "last-light.jpg",                 caption: "The last of the light" },

  { image: "ski-touring.jpg",                caption: "A different season, same mountains", wide: true },
];
