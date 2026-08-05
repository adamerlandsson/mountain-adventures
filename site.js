/* ==========================================================================
   site.js — builds the pages from content.js.

   You shouldn't need to open this file. All your content lives in
   content.js; all the styling lives in style.css.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- small helpers ---------------------------------------------- */

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const src = (file) => "images/" + String(file || "").replace(/^images\//, "");

  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* A photo inside a fixed-ratio frame. Fades in once it has loaded so the
     page never "pops" as images arrive. */
  function photo(file, alt, focus, ratioClass, eager) {
    return `
      <span class="frame ${ratioClass || ""}">
        <img src="${esc(src(file))}" alt="${esc(alt || "")}"
             style="object-position:${esc(focus || "center")}"
             ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>
      </span>`;
  }

  /* ---------- shared furniture ------------------------------------------- */

  const ICONS = {
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1"/></svg>',
    youtube:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 7.5v9l8-4.5-8-4.5z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg>',
  };

  function navHTML(active) {
    const link = (href, label, key) =>
      `<li><a href="${href}"${active === key ? ' class="is-active" aria-current="page"' : ""}>${label}</a></li>`;

    const social = [
      SITE.instagram && `<a href="${esc(SITE.instagram)}" aria-label="Instagram" target="_blank" rel="noopener">${ICONS.instagram}</a>`,
      SITE.youtube && `<a href="${esc(SITE.youtube)}" aria-label="YouTube" target="_blank" rel="noopener">${ICONS.youtube}</a>`,
      SITE.email && `<a href="mailto:${esc(SITE.email)}" aria-label="Email">${ICONS.email}</a>`,
    ]
      .filter(Boolean)
      .join("");

    return `
      <nav class="nav" id="top">
        <div class="nav-inner">
          <a class="nav-name" href="index.html">${esc(SITE.name)}</a>
          <ul class="nav-links">
            ${link("index.html", "Home", "home")}
            ${link("trip-reports.html", "Trip reports", "trips")}
            ${link("gallery.html", "Gallery", "gallery")}
          </ul>
          <div class="nav-social">${social}</div>
        </div>
      </nav>`;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
      <footer>
        <div class="foot-inner">
          <span>© ${year} ${esc(SITE.name)}</span>
          <a href="#top" class="to-top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>`;
  }

  /* A quiet elevation-profile rule used between sections. */
  const RULE = `
    <div class="rule" aria-hidden="true">
      <svg viewBox="0 0 130 18"><path d="M1 15 L22 8 L38 12 L58 3 L74 10 L92 6 L110 13 L129 9"/></svg>
    </div>`;

  function heroHTML(cfg, opts) {
    opts = opts || {};
    const caption = cfg.title
      ? `<div class="hero-text">
           ${cfg.eyebrow ? `<span class="eyebrow">${esc(cfg.eyebrow)}</span>` : ""}
           <h1 class="display">${esc(cfg.title)}</h1>
           ${cfg.blurb ? `<p>${esc(cfg.blurb)}</p>` : ""}
           ${cfg.stats ? `<p class="hero-stats">${esc(cfg.stats)}</p>` : ""}
         </div>`
      : "";

    return `
      <header class="hero ${opts.sub ? "hero--sub" : ""} ${caption ? "has-caption" : ""}">
        <img src="${esc(src(cfg.image))}" alt="${esc(cfg.alt || "")}"
             style="object-position:${esc(cfg.focus || "center")}" fetchpriority="high">
        ${caption}
        ${opts.cue ? '<a class="scroll-cue" href="#main" aria-label="Skip to content"><span></span></a>' : ""}
      </header>`;
  }

  function cardHTML(trip) {
    return `
      <a class="card" href="report.html?trip=${encodeURIComponent(trip.slug)}">
        ${photo(trip.cover, trip.title, trip.focus, "r-4x3")}
        <div class="card-body">
          <p class="card-meta">${esc(trip.date)}${trip.stats ? " · " + esc(trip.stats) : ""}</p>
          <h3>${esc(trip.title)}</h3>
          ${trip.summary ? `<p class="card-summary">${esc(trip.summary)}</p>` : ""}
          <span class="card-more">Read the report <span aria-hidden="true">→</span></span>
        </div>
      </a>`;
  }

  /* ---------- pages ------------------------------------------------------ */

  const PAGES = {
    home() {
      const latest = TRIPS.slice(0, 3).map(cardHTML).join("");
      return `
        ${navHTML("home")}
        ${heroHTML(HEROES.home, { cue: true })}
        <main id="main">
          <section class="section">
            <div class="intro">
              <p class="display">${esc(SITE.blurb)}</p>
            </div>
            ${RULE}
            <div class="section-head">
              <h2 class="display">Latest Trip Reports</h2>
              <p>Click a report to read the full story.</p>
            </div>
            <div class="card-grid">${latest}</div>
            ${
              TRIPS.length > 3
                ? `<div class="section-cta"><a href="trip-reports.html">View all trip reports <span aria-hidden="true">→</span></a></div>`
                : ""
            }
          </section>
        </main>
        ${footerHTML()}`;
    },

    trips() {
      return `
        ${navHTML("trips")}
        ${heroHTML(HEROES.trips, { sub: true })}
        <main id="main">
          <section class="section">
            <div class="card-grid">${TRIPS.map(cardHTML).join("")}</div>
          </section>
        </main>
        ${footerHTML()}`;
    },

    gallery() {
      const items = GALLERY.map(
        (g, i) => `
        <button class="tile ${g.wide ? "tile--wide" : ""}" data-lb="${i}"
                aria-label="View: ${esc(g.caption || "photo")}">
          ${photo(g.image, g.caption, g.focus, g.wide ? "r-3x2" : "r-4x5")}
          ${g.caption ? `<span class="tile-caption">${esc(g.caption)}</span>` : ""}
        </button>`
      ).join("");

      return `
        ${navHTML("gallery")}
        ${heroHTML(HEROES.gallery, { sub: true })}
        <main id="main">
          <section class="section">
            <div class="tiles">${items}</div>
          </section>
        </main>
        ${footerHTML()}`;
    },

    report() {
      const slug = new URLSearchParams(location.search).get("trip");
      const i = TRIPS.findIndex((t) => t.slug === slug);

      if (i === -1) {
        document.title = "Report not found — " + SITE.name;
        return `
          ${navHTML("trips")}
          <main id="main">
            <section class="section missing">
              <h1 class="display">That report doesn't exist</h1>
              <p>It may have been renamed or removed.</p>
              <div class="section-cta"><a href="trip-reports.html">See all trip reports <span aria-hidden="true">→</span></a></div>
            </section>
          </main>
          ${footerHTML()}`;
      }

      const t = TRIPS[i];
      const prev = TRIPS[i - 1]; // newer
      const next = TRIPS[i + 1]; // older

      document.title = t.title + " — " + SITE.name;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && t.summary) meta.setAttribute("content", t.summary);

      const story = (t.story || []).map((p) => `<p>${esc(p)}</p>`).join("");

      const gallery = (t.photos || []).length
        ? `<section class="section report-photos">
             ${RULE}
             <div class="tiles">
               ${t.photos
                 .map(
                   (p, n) => `
                 <button class="tile ${p.wide ? "tile--wide" : ""}" data-lb="${n}"
                         aria-label="View: ${esc(p.caption || "photo")}">
                   ${photo(p.image, p.caption, p.focus, p.wide ? "r-3x2" : "r-4x5")}
                   ${p.caption ? `<span class="tile-caption">${esc(p.caption)}</span>` : ""}
                 </button>`
                 )
                 .join("")}
             </div>
           </section>`
        : "";

      return `
        ${navHTML("trips")}
        ${heroHTML(
          {
            image: t.cover,
            focus: t.focus,
            alt: t.title,
            eyebrow: "Trip report",
            title: t.title,
            stats: t.date + (t.stats ? " · " + t.stats : ""),
          },
          { sub: true }
        )}
        <main id="main">
          <article class="prose">${story}</article>
          ${gallery}
          <nav class="pager">
            ${prev ? `<a href="report.html?trip=${encodeURIComponent(prev.slug)}"><span class="pager-dir">Newer</span><span class="pager-title">${esc(prev.title)}</span></a>` : "<span></span>"}
            ${next ? `<a class="is-right" href="report.html?trip=${encodeURIComponent(next.slug)}"><span class="pager-dir">Older</span><span class="pager-title">${esc(next.title)}</span></a>` : "<span></span>"}
          </nav>
          <div class="section-cta all-link"><a href="trip-reports.html">All trip reports <span aria-hidden="true">→</span></a></div>
        </main>
        ${footerHTML()}`;
    },
  };

  /* ---------- behaviour -------------------------------------------------- */

  /* Fade each photo in as it loads. */
  function wireImages(root) {
    root.querySelectorAll(".frame img, .hero img").forEach((img) => {
      const done = () => img.classList.add("is-loaded");
      if (img.complete && img.naturalWidth) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", () => img.closest(".frame, .hero")?.classList.add("is-broken"), { once: true });
      }
    });
  }

  /* Nav turns solid once you scroll past the header photo. */
  function wireNav(root) {
    const nav = root.querySelector(".nav");
    const hero = root.querySelector(".hero");
    if (!nav) return;
    if (!hero) {
      nav.classList.add("is-solid");
      return;
    }
    let ticking = false;
    const update = () => {
      const past = window.scrollY > hero.offsetHeight - 72;
      nav.classList.toggle("is-solid", past);
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* Gentle fade-up as sections come into view. */
  function wireReveal(root) {
    const targets = root.querySelectorAll(".card, .tile, .section-head, .intro, .prose > p, .rule");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }
    targets.forEach((t) => t.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const group = e.target.parentElement;
          const peers = group ? [].slice.call(group.children).filter((c) => c.classList.contains("reveal")) : [];
          const idx = Math.max(0, peers.indexOf(e.target));
          e.target.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* Click a photo to see it big. Arrow keys and Esc work. */
  function wireLightbox(root, items) {
    const tiles = [].slice.call(root.querySelectorAll("[data-lb]"));
    if (!tiles.length || !items.length) return;

    let idx = 0;
    let opener = null;

    const box = el(`
      <div class="lightbox" hidden>
        <button class="lb-close" aria-label="Close">&times;</button>
        <button class="lb-prev" aria-label="Previous photo">&#8249;</button>
        <button class="lb-next" aria-label="Next photo">&#8250;</button>
        <figure class="lb-stage">
          <img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
          <figcaption></figcaption>
        </figure>
      </div>`);
    document.body.appendChild(box);

    const imgEl = box.querySelector("img");
    const capEl = box.querySelector("figcaption");
    const counter = () => `${idx + 1} / ${items.length}`;

    function show(n) {
      idx = (n + items.length) % items.length;
      const it = items[idx];
      imgEl.src = src(it.image);
      imgEl.alt = it.caption || "";
      capEl.innerHTML = `<span>${esc(it.caption || "")}</span><span class="lb-count">${counter()}</span>`;
    }

    function open(n) {
      opener = document.activeElement;
      show(n);
      box.hidden = false;
      document.body.classList.add("no-scroll");
      box.querySelector(".lb-close").focus();
    }

    function close() {
      box.hidden = true;
      document.body.classList.remove("no-scroll");
      if (opener) opener.focus();
    }

    tiles.forEach((t) => t.addEventListener("click", () => open(Number(t.dataset.lb))));
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
    box.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.classList.contains("lb-stage")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- go --------------------------------------------------------- */

  function start() {
    const page = document.body.dataset.page || "home";
    const build = PAGES[page];
    if (!build) return;

    document.body.innerHTML = build();

    // which photo set does the lightbox use on this page?
    let lbItems = [];
    if (page === "gallery") lbItems = GALLERY;
    else if (page === "report") {
      const slug = new URLSearchParams(location.search).get("trip");
      const t = TRIPS.find((x) => x.slug === slug);
      lbItems = (t && t.photos) || [];
    }

    wireImages(document.body);
    wireNav(document.body);
    wireReveal(document.body);
    wireLightbox(document.body, lbItems);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
