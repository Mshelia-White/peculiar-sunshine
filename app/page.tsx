"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const navItems = [
  ["01", "home", "Intro"],
  ["02", "brands", "Brands"],
  ["03", "services", "Services"],
  ["04", "work", "Work"],
  ["05", "process", "Process"],
  ["06", "contact", "Contact"],
] as const;

const heroResults = [
  { value: "586K+", label: "Subscriber ecosystem" },
  { value: "1.8M", label: "Standout long-form views" },
  { value: "196K+", label: "Short-form views" },
  { value: "3 years", label: "Strategy & execution" },
];

const trustedBrands = [
  { name: "Winnie’s School of Excellence", logo: "/brands/winnie school excellent.svg" },
  { name: "OPK MagicalPad", logo: "/brands/opk.png" },
  { name: "Nova Tribe × Nova Missions", logo: "/brands/nova-missions.PNG" },
  { name: "Coach AMARAK", logo: "/brands/amarak.PNG" },
  { name: "KRD Autos", logo: "/brands/krd.png" },
  { name: "Agape Haven", logo: "/brands/agape-heaven.png" },
  { name: "Genowax", logo: "/brands/genowax.png" },
];

const marqueeSkills = [
  "SOCIAL STRATEGY",
  "AI VIDEO ADS",
  "UGC CONTENT",
  "GRAPHIC DESIGN",
  "BRAND STRATEGY",
  "CONTENT MARKETING",
  "PRODUCT VISUALS",
  "PAID ADS",
  "COMMUNITY GROWTH",
  "ANALYTICS",
];

const brands = [
  {
    number: "01",
    name: "Winnie’s School of Excellence",
    label: "Education · Content systems",
    logo: "/brands/winnie school excellent.svg",
    copy: "A high-volume content system that kept a large learning community engaged across platforms.",
    metrics: [["586K+", "Subscribers"], ["1.8M", "Long-form"], ["196K+", "Short-form"]],
  },
  {
    number: "02",
    name: "OPK MagicalPad",
    label: "Health · Brand building",
    logo: "/brands/opk.png",
    copy: "Built the Instagram brand from zero—education, product storytelling and design that drove sales.",
    metrics: [["9K+", "Community"], ["₦50M+", "Product sales"], ["≈250K", "Reach"]],
  },
  {
    number: "03",
    name: "Nova Tribe × Nova Missions",
    label: "Faith · Paid growth",
    logo: "/brands/nova-missions.PNG",
    copy: "Audience-led content and paid campaigns that widened reach and moved new people to act.",
    metrics: [["≈1.2M", "Audience reach"], ["66.4K", "30-day views"], ["Paid", "Conversion"]],
  },
  {
    number: "04",
    name: "Coach AMARAK",
    label: "Personal brand · Authority",
    logo: "/brands/amarak.PNG",
    copy: "Turned a coach and author’s expertise into clear, relatable content that built real authority.",
    metrics: [["3.4K+", "Community"], ["Daily", "Presence"], ["Clear", "Messaging"]],
  },
  {
    number: "05",
    name: "KRD Autos & Merchandise",
    label: "Retail · Positioning",
    logo: "/brands/krd.png",
    copy: "Positioning and campaign direction that gave an emerging brand credibility and enquiries.",
    metrics: [["1.7K+", "30-day views"], ["16", "Piece rollout"], ["Direct", "Enquiries"]],
  },
  {
    number: "06",
    name: "Agape Haven",
    label: "Community · Content direction",
    logo: "/brands/agape-heaven.png",
    copy: "Turned services and community moments into consistent stories, with organic and paid growth.",
    metrics: [["1.5K+", "Organic views"], ["381+", "Top post"], ["Growth", "Organic + paid"]],
  },
];

const disciplines = [
  {
    number: "01",
    tag: "Strategy",
    title: "Social & content marketing",
    text: "The plan behind the feed: what to say, where to say it, and how to turn attention into enquiries and sales.",
    items: [
      "Social media strategy & management",
      "Content strategy & direction",
      "Paid social & Meta ads",
      "Community, automation & reporting",
    ],
  },
  {
    number: "02",
    tag: "Video",
    title: "AI video ads & UGC",
    text: "Story-led video that stops the scroll and sells—produced with AI, without the cost of a full film crew.",
    items: [
      "AI video advertisements",
      "UGC-style creator content",
      "Product & brand films",
      "Scripts, hooks & captions",
    ],
  },
  {
    number: "03",
    tag: "Design",
    title: "Graphic design & visuals",
    text: "Premium visuals that make the offer impossible to miss—on every post, page, flyer and ad.",
    items: [
      "Product flyers & promotions",
      "Campaign graphics & carousels",
      "Product visuals",
      "Brand-consistent templates",
    ],
  },
];

const film = {
  title: "“Some days feel heavier.”",
  copy: "A cinematic, story-led advert that meets people in an ordinary, heavy moment and turns it into a craving—every scene, caption and cut produced with AI.",
  poster: "/work/videos/subway-ad-poster.jpg",
  // Drop the exported MP4 here (e.g. "/work/videos/subway-ad.mp4") to play the film on the page.
  video: "",
  link: "https://docs.google.com/videos/d/17ta8mYe4Md-Z_ZfZ84XEBKFw_vx6jc9RJeGZDi-k6lQ/play?usp=sharing",
  meta: [
    ["Brand", "Subway"],
    ["Format", "AI video advert"],
    ["Runtime", "1:18"],
    ["Recognition", "★ Award-winning"],
  ],
};

const designs = [
  { src: "/work/graphics/lushgreen-diffusers.webp", brand: "Lushgreen", tag: "Brand campaign" },
  { src: "/work/graphics/everyday-handbag.webp", brand: "Pee Sunshine", tag: "Product flyer" },
  { src: "/work/graphics/sami-casual.webp", brand: "Sami Casual", tag: "Fashion" },
  { src: "/work/graphics/iced-coffee-concept.webp", brand: "Iced coffee", tag: "Concept ad" },
  { src: "/work/graphics/ai-flyers-carousel.webp", brand: "Peculiar Sunshine", tag: "Carousel" },
];

const steps = [
  ["Outcome", "What does the business need to achieve?"],
  ["Audience", "Who needs to care—and what matters to them?"],
  ["Direction", "What should we say, show and prioritise?"],
  ["Creative", "Which video, design or post carries it best?"],
  ["Action", "What should happen next?"],
  ["Learning", "What did the performance teach us?"],
];

const tools = [
  "Meta Ads Manager",
  "Meta Business Suite",
  "Canva",
  "Google Vids",
  "AI video & image tools",
  "ManyChat",
  "WhatsApp Business",
  "Google Sheets",
];

function SectionHead({ index, label, title, intro }: { index: string; label: string; title: ReactNode; intro?: string }) {
  return (
    <div className="sec-head" data-reveal>
      <div className="sec-label">
        <span>{index}</span>
        <i />
        <span>{label}</span>
      </div>
      <div className="sec-title">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const filmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    // The section crossing the middle of the screen is the active one.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 },
    );
    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

    const root = document.documentElement;
    const stackCards = Array.from(document.querySelectorAll<HTMLElement>("[data-stack]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--scroll-progress", String(max > 0 ? window.scrollY / max : 0));

      // Stacking cards: each card eases back slightly as the next one slides over it.
      stackCards.forEach((card, index) => {
        const next = stackCards[index + 1];
        if (!next) return;
        const overlap = 1 - Math.min(Math.max((next.getBoundingClientRect().top - card.getBoundingClientRect().top) / card.offsetHeight, 0), 1);
        card.style.setProperty("--stack", overlap.toFixed(3));
      });

      // Featured film grows gently into place as it enters the screen.
      const film = filmRef.current;
      if (film) {
        const top = film.getBoundingClientRect().top;
        const progress = Math.min(Math.max((vh - top) / (vh * 0.7), 0), 1);
        film.style.setProperty("--enter", progress.toFixed(3));
      }

      setScrollY(window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const updateCursor = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.("[data-cursor]");
      setCursorLabel(target ? target.getAttribute("data-cursor") : null);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("pointerover", updateCursor);
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("pointerover", updateCursor);
    };
  }, []);

  useEffect(() => {
    if (lightbox === null && !filmOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
        setFilmOpen(false);
      }
      if (lightbox === null) return;
      if (event.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % designs.length));
      if (event.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + designs.length) % designs.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, filmOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openDesign = lightbox === null ? null : designs[lightbox];

  const filmFrameInner = (
    <>
      <img src={film.poster} alt="Still from the Subway AI video advert: a woman standing on a busy bus" />
      <span className="film-badge">★ Award-winning</span>
      <span className="film-play" aria-hidden="true">
        <i>▶</i>
      </span>
    </>
  );

  return (
    <>
      <div className="pointer-light" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <div className={cursorLabel ? "cursor-label is-on" : "cursor-label"} aria-hidden="true">
        {cursorLabel}
      </div>

      {/* HEADER */}
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Peculiar Sunshine home">
          <span className="wordmark-mark">PS</span>
          <span>Peculiar Sunshine</span>
        </a>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          {navItems.slice(0, -1).map(([, id, label]) => (
            <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">Start a project <span>↗</span></a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* SIDE NAVIGATION RAIL */}
      <aside className="section-rail" aria-label="Page progress">
        {navItems.map(([number, id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-label={`Go to ${label}`}>
            <span>{number}</span>
            <i />
          </a>
        ))}
      </aside>

      <main>
        {/* HERO */}
        <section className="hero-wrapper snap-section" id="home">
          <div className="hero-editorial-frame">
            <div
              className="hero-backdrop-word"
              aria-hidden="true"
              style={{ transform: `translateX(-50%) translateY(${Math.min(scrollY * 0.12, 50)}px)` }}
            >
              <span>GROWTH</span>
            </div>

            <div className="hero-portrait-stage">
              <div className="hero-portrait-container" style={{ transform: `translateY(${Math.min(scrollY * 0.2, 80)}px)` }}>
                <img
                  src="/header-portrait.webp"
                  alt="Peculiar Sunshine — Social Media & Brand Strategist, AI Video & UGC Creator and Graphic Designer"
                />
              </div>
            </div>

            <div className="hero-mid-grid">
              <div className="hero-left-content">
                <div className="hero-title-card" aria-label="What I do">
                  <span className="hero-title-badge">WHAT I DO</span>
                  <div className="hero-title-lines">
                    <span className="hero-title-line line-1">SOCIAL MEDIA &amp; BRAND STRATEGIST</span>
                    <span className="hero-title-line line-2">AI VIDEO ADS &amp; UGC CREATOR</span>
                    <span className="hero-title-line line-3">GRAPHIC DESIGNER</span>
                  </div>
                </div>

                <p className="hero-support-copy">
                  Your audience is already online. I help brands reach them with clear strategy, scroll-stopping design and AI-powered video ads that turn attention into action.
                </p>
                <div className="hero-cta-row">
                  <a className="hero-cta-btn" href="#brands">
                    SEE THE RESULTS <span>↗</span>
                  </a>
                  <a className="hero-award-chip" href="#featured-film">
                    <i aria-hidden="true">▶</i> Watch the award-winning ad
                  </a>
                </div>
              </div>

              <div className="hero-center-spacer" aria-hidden="true" />

              <div className="hero-right-trust">
                <span className="hero-trust-label">TRUSTED ACROSS</span>
                <div className="hero-trust-logos">
                  {trustedBrands.map((brand) => (
                    <div className="hero-trust-chip" key={brand.name} title={brand.name}>
                      <img src={brand.logo} alt={brand.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-glass-results" aria-label="Verified Performance Metrics">
              <div className="hero-results-grid">
                {heroResults.map((result) => (
                  <div className="hero-result-item" key={result.label}>
                    <span className="hero-result-num">{result.value}</span>
                    <span className="hero-result-label">{result.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="post-hero-marquee" aria-label="Core capabilities">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((repeatIndex) => (
              <div className="marquee-chunk" key={repeatIndex} aria-hidden={repeatIndex > 0 || undefined}>
                {marqueeSkills.map((skill) => (
                  <span key={`${repeatIndex}-${skill}`}>
                    {skill} <b>◆</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* 01 — BRANDS */}
        <section className="section light" id="brands">
          <div className="container">
            <SectionHead
              index="01"
              label="Brands I’ve managed"
              title={<>Brands I’ve<br /><em>helped grow.</em></>}
              intro="Six partnerships across education, health, faith, retail and personal brands—measured in reach, community and sales."
            />
            <div className="brand-grid">
              {brands.map((brand, index) => (
                <article
                  className="brand-card"
                  key={brand.name}
                  data-reveal
                  style={{ "--delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
                >
                  <div className="brand-top">
                    <span className="brand-logo">
                      <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
                    </span>
                    <span className="brand-number">{brand.number}</span>
                  </div>
                  <p className="brand-label">{brand.label}</p>
                  <h3>{brand.name}</h3>
                  <p className="brand-copy">{brand.copy}</p>
                  <div className="brand-metrics">
                    {brand.metrics.map(([value, label]) => (
                      <div key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="integrity-note">
              Public channel-level figures are shown as scale context. Individual attribution is limited to work connected to Peculiar’s documented management and execution periods.
            </p>
          </div>
        </section>

        {/* 02 — SERVICES (scroll-and-stack) */}
        <section className="section green" id="services">
          <div className="container">
            <SectionHead
              index="02"
              label="What I do"
              title={<>Strategy, design<br /><em>and video.</em></>}
              intro="One partner for the plan, the visuals and the ads—so every piece works together and every post has a job to do."
            />
            <div className="stack">
              {disciplines.map((discipline, index) => (
                <article
                  className={`stack-card tone-${index + 1}`}
                  key={discipline.number}
                  data-stack
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <div className="stack-main">
                    <div className="stack-top">
                      <span>{discipline.number}</span>
                      <span>{discipline.tag}</span>
                    </div>
                    <h3>{discipline.title}</h3>
                    <p>{discipline.text}</p>
                  </div>
                  <ul>
                    {discipline.items.map((item) => (
                      <li key={item}>
                        <span>{item}</span>
                        <i aria-hidden="true">↗</i>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — WORK */}
        <section className="section dark" id="work">
          <div className="container">
            <SectionHead
              index="03"
              label="Selected work"
              title={<>Made to stop<br /><em>the scroll.</em></>}
              intro="A featured AI film and a curated set of campaign designs, each built around one clear action."
            />

            <div className="film" id="featured-film" ref={filmRef}>
              {film.video ? (
                <button type="button" className="film-frame" data-cursor="Play" onClick={() => setFilmOpen(true)} aria-label="Play the Subway AI video advert">
                  {filmFrameInner}
                </button>
              ) : (
                <a className="film-frame" data-cursor="Play" href={film.link} target="_blank" rel="noopener noreferrer" aria-label="Watch the Subway AI video advert">
                  {filmFrameInner}
                </a>
              )}

              <div className="film-info" data-reveal>
                <p className="film-kicker">Featured film</p>
                <h3>{film.title}</h3>
                <p className="film-text">{film.copy}</p>
                <dl className="film-meta">
                  {film.meta.map(([term, value]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd className={term === "Recognition" ? "accent" : undefined}>{value}</dd>
                    </div>
                  ))}
                </dl>
                {film.video ? (
                  <button type="button" className="film-link" onClick={() => setFilmOpen(true)}>Play the film <span>▶</span></button>
                ) : (
                  <a className="film-link" href={film.link} target="_blank" rel="noopener noreferrer">Watch the full film <span>↗</span></a>
                )}
              </div>
            </div>

            <div className="design-head" data-reveal>
              <h3>Campaign design</h3>
              <span>Select to enlarge</span>
            </div>
            <div className="design-row">
              {designs.map((design, index) => (
                <button
                  type="button"
                  key={design.src}
                  className="design-item"
                  data-cursor="View"
                  onClick={() => setLightbox(index)}
                  data-reveal
                  style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <span className="mat">
                    <img src={design.src} alt={`${design.brand} — ${design.tag}`} loading="lazy" />
                  </span>
                  <span className="design-cap">
                    <b>{design.brand}</b>
                    <i>{design.tag}</i>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — PROCESS */}
        <section className="section light" id="process">
          <div className="container">
            <SectionHead
              index="04"
              label="How I work"
              title={<>Before the post,<br /><em>there’s a question.</em></>}
              intro="A simple, repeatable way of working—so every post, video and design has a clear reason to exist."
            />
            <div className="steps">
              {steps.map(([name, question], index) => (
                <article className="step" key={name} data-reveal style={{ "--delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
                  <span>0{index + 1}</span>
                  <h3>{name}</h3>
                  <p>{question}</p>
                </article>
              ))}
            </div>
            <div className="toolkit" data-reveal>
              <span>Toolkit</span>
              <ul>
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 05 — CONTACT */}
        <section className="section dark contact" id="contact">
          <div className="container">
            <div className="sec-label" data-reveal>
              <span>05</span>
              <i />
              <span>Let’s talk · Available worldwide</span>
            </div>
            <div className="contact-grid">
              <h2 data-reveal>Your brand has<br /><em>somewhere to go.</em></h2>
              <div className="contact-side" data-reveal>
                <p>Need a clear social strategy, an AI video ad, UGC content, standout graphics or campaigns that convert? Let’s talk about the next move.</p>
                <a className="contact-email" href="mailto:Peculiarsunshine12@gmail.com">
                  Peculiarsunshine12@gmail.com <span>↗</span>
                </a>
                <a className="contact-phone" href="tel:+2347066337370">070 6633 7370</a>
              </div>
            </div>
            <footer className="site-footer">
              <div className="footer-mark">
                <span>PS</span>
                <p>
                  Peculiar Sunshine
                  <br />
                  <small>Social Media &amp; Brand Strategist · AI Video &amp; UGC Creator · Graphic Designer</small>
                </p>
              </div>
              <div className="footer-status"><i /> Open to projects, retainers, contract &amp; full-time work</div>
              <a href="#home">Back to top ↑</a>
            </footer>
          </div>
        </section>
      </main>

      {/* DESIGN LIGHTBOX */}
      {openDesign && lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={openDesign.brand} onClick={() => setLightbox(null)}>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={openDesign.src} alt={`${openDesign.brand} — ${openDesign.tag}`} />
            <figcaption>
              <i>{openDesign.tag}</i>
              <b>{openDesign.brand}</b>
              <span>{lightbox + 1} / {designs.length}</span>
            </figcaption>
          </figure>
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setLightbox(null)}>×</button>
          <button
            type="button"
            className="lightbox-nav prev"
            aria-label="Previous design"
            onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + designs.length) % designs.length); }}
          >
            ←
          </button>
          <button
            type="button"
            className="lightbox-nav next"
            aria-label="Next design"
            onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % designs.length); }}
          >
            →
          </button>
        </div>
      )}

      {/* FILM PLAYER (used once the MP4 is added) */}
      {filmOpen && film.video && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Subway AI video advert" onClick={() => setFilmOpen(false)}>
          <video className="film-player" src={film.video} poster={film.poster} controls autoPlay playsInline onClick={(event) => event.stopPropagation()} />
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setFilmOpen(false)}>×</button>
        </div>
      )}
    </>
  );
}
