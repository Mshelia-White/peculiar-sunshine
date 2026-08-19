"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["01", "home", "Intro"],
  ["02", "overview", "Proof"],
  ["03", "expertise", "Expertise"],
  ["04", "work", "Work"],
  ["05", "method", "Method"],
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

const metrics = [
  { value: "586K+", label: "Subscriber ecosystem", note: "WSE public scale" },
  { value: "1.8M", label: "Standout long-form views", note: "Public content anchor" },
  { value: "1.1M", label: "Long-form performance", note: "Another standout upload" },
  { value: "196K+", label: "Short-form views", note: "10K+ likes" },
];

const services = [
  {
    number: "01",
    title: "Social strategy & management",
    text: "Clear channel plans, publishing systems and day-to-day management built around the business—not a posting quota.",
    tag: "Presence",
  },
  {
    number: "02",
    title: "Content strategy & direction",
    text: "Content pillars, campaign ideas, monthly plans, briefs and hooks that give creators a useful, consistent direction.",
    tag: "Direction",
  },
  {
    number: "03",
    title: "Paid social & conversion",
    text: "Meta campaigns planned for traffic, leads, enquiries and sales—with audience testing, budget control and performance optimisation.",
    tag: "Action",
  },
  {
    number: "04",
    title: "Community & automation",
    text: "Thoughtful audience care and automated chat journeys that answer questions, capture leads and keep conversations moving.",
    tag: "Relationship",
  },
  {
    number: "05",
    title: "Analytics & reporting",
    text: "Reach, engagement, clicks and cost-per-result translated into clear decisions for the next round of work.",
    tag: "Learning",
  },
];

const projects = [
  {
    number: "01",
    name: "Winnie’s School of Excellence",
    label: "Scale · Content Systems · Community",
    logo: "/brands/winnie school excellent.svg",
    copy: "Managed and coordinated a high-volume content ecosystem, turning strategy into a reliable publishing system that strengthened audience engagement, expanded content reach, and kept a large learning community connected across platforms.",
    metrics: [
      ["586K+", "connected subscriber ecosystem"],
      ["1.8M", "standout long-form views"],
      ["196K+", "high-performing short-form views"],
    ],
  },
  {
    number: "02",
    name: "OPK MagicalPad",
    label: "Brand Building · Product Education · Sales",
    logo: "/brands/opk.png",
    copy: "Built the Instagram presence from scratch, combining fertility education, product-focused storytelling, graphic design, and community management to earn customer trust, generate enquiries, and support sales within Nigeria and internationally.",
    metrics: [
      ["9K+", "Instagram brand community"],
      ["₦50M+", "generated in product sales"],
      ["≈250K", "estimated content reach"],
    ],
  },
  {
    number: "03",
    name: "Nova Tribe × Nova Missions",
    label: "Audience Intelligence · Paid Growth · Conversion",
    logo: "/brands/nova-missions.PNG",
    copy: "Developed audience-led content plans, community insights, and conversion-focused campaigns that expanded the brands’ visibility, reached new audiences, and moved people from discovery towards meaningful action.",
    metrics: [
      ["≈1.2M", "total audience reach"],
      ["66.4K", "combined 30-day views"],
      ["Paid", "conversion-led distribution"],
    ],
  },
  {
    number: "04",
    name: "Coach AMARAK",
    label: "Authority · Personal Brand · Audience Connection",
    logo: "/brands/amarak.PNG",
    copy: "Translated her expertise as a leadership coach, mentor, author, and speaker into clear, relatable content that strengthened her professional authority, communicated her sessions effectively, and kept her audience consistently connected.",
    metrics: [
      ["3.4K+", "established brand community"],
      ["Clear", "leadership sessions communicated"],
      ["Daily", "consistent authority-led presence"],
    ],
  },
  {
    number: "05",
    name: "KRD Autos & General Merchandise",
    label: "Foundation · Positioning · Market Visibility",
    logo: "/brands/krd.png",
    copy: "Created the strategic foundation for an emerging brand through clear positioning, social media strategy, content planning, and campaign direction designed to establish credibility and turn early audience attention into genuine enquiries.",
    metrics: [
      ["1.7K+", "content views in 30 days"],
      ["16", "strategic content rollout"],
      ["Direct", "enquiry-focused campaign direction"],
    ],
  },
  {
    number: "06",
    name: "Agape Haven",
    label: "Content Direction · Community · Visibility",
    logo: "/brands/agape-heaven.png",
    copy: "Developed Agape Haven’s content direction and transformed church services, programmes, and community moments into consistent digital stories. Coordinated the content team, strengthened community engagement, and supported organic and paid growth initiatives.",
    metrics: [
      ["1.5K+", "organic views in 30 days"],
      ["381+", "views on individual content"],
      ["Growth", "organic & paid growth system"],
    ],
  },
];

const tools = ["Meta Ads Manager", "Meta Business Suite", "Google Sheets", "Canva", "ManyChat", "WhatsApp Business", "Platform Insights"];

const process = [
  ["Outcome", "What does the business need to achieve?"],
  ["Audience", "Who needs to care—and what matters to them?"],
  ["Direction", "What should we say, show and prioritise?"],
  ["Distribution", "Where should the audience meet it?"],
  ["Action", "What should happen next?"],
  ["Learning", "What did the performance teach us?"],
];

const marqueeSkills = [
  "SOCIAL STRATEGY",
  "BRAND STRATEGY",
  "CONTENT MARKETING",
  "PAID ACQUISITION",
  "COMMUNITY GROWTH",
  "AUTOMATION",
  "ANALYTICS",
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) =>
      revealObserver.observe(element),
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7] },
    );

    document.querySelectorAll("main section[id]").forEach((section) =>
      sectionObserver.observe(section),
    );

    const updatePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="pointer-light" aria-hidden="true" />
      
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

        <a className="header-cta" href="#contact">Start a conversation <span>↗</span></a>
        
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
        {/* EDITORIAL HERO SECTION */}
        <section className="hero-wrapper snap-section" id="home">
          <div className="hero-editorial-frame">
            {/* Oversized Backdrop Word "GROWTH" */}
            <div 
              className="hero-backdrop-word" 
              aria-hidden="true"
              style={{ transform: `translateX(-50%) translateY(${Math.min(scrollY * 0.12, 50)}px)` }}
            >
              <span>GROWTH</span>
            </div>

            {/* Central Portrait Integration */}
            <div className="hero-portrait-stage">
              <div 
                className="hero-portrait-container"
                style={{ transform: `translateY(${Math.min(scrollY * 0.2, 80)}px)` }}
              >
                <img 
                  src="/header.png" 
                  alt="Peculiar Sunshine - Social Media & Brand Strategist | Content Marketing Specialist" 
                />
              </div>
            </div>

            {/* Middle Grid: Left Title Card & Copy | Center Spacer | Right Trust Area */}
            <div className="hero-mid-grid">
              <div className="hero-left-content">
                {/* High-Contrast Core Expertise Title Card */}
                <div className="hero-title-card" aria-label="Core Expertise">
                  <span className="hero-title-badge">CORE EXPERTISE</span>
                  <div className="hero-title-lines">
                    <span className="hero-title-line line-1">SOCIAL MEDIA &amp; BRAND STRATEGIST</span>
                    <span className="hero-title-line line-2">CONTENT MARKETING SPECIALIST</span>
                  </div>
                </div>

                <p className="hero-support-copy">
                  Your audience is already online. I help you reach them with clear strategy, stronger content, and campaigns built to turn attention into action.
                </p>
                <a className="hero-cta-btn" href="#work">
                  SEE THE RESULTS <span>↗</span>
                </a>
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

            {/* Translucent Glass Results Panel at the Bottom */}
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

        {/* CONTINUOUS HORIZONTAL POST-HERO MARQUEE */}
        <section className="post-hero-marquee" aria-label="Core Capabilities Marquee">
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

        {/* OVERVIEW / PROOF SECTION */}
        <section className="overview snap-section" id="overview">
          <div className="section-heading" data-reveal>
            <p className="eyebrow dark">A practical record of growth</p>
            <h2>Growing visibility<br /><em>and turning attention into action.</em></h2>
          </div>

          <div className="overview-copy" data-reveal>
            <p>
              For the past three years, I’ve helped businesses and personal brands strengthen their digital presence, connect with the right audiences, and turn online visibility into measurable business growth.
            </p>
            <p>
              I bring brand strategy, social media, content marketing, and paid campaigns together—so every move has purpose, every campaign reaches the right people, and every result drives the next stage of growth.
            </p>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <article className="metric" data-reveal key={metric.label} style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
                <span className="metric-index">0{index + 1}</span>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>

          <div className="overview-note" data-reveal>
            <span className="note-line" />
            <p>The goal is not simply to be seen. It is to help the right people take the next step.</p>
          </div>
        </section>

        {/* EXPERTISE SECTION */}
        <section className="expertise snap-section" id="expertise">
          <div className="expertise-intro">
            <div className="sticky-heading" data-reveal>
              <p className="eyebrow">Where I add value</p>
              <h2>Strategy<br />behind the <em>feed.</em></h2>
              <p className="expertise-lead">I create the direction, systems and campaigns that help better content do meaningful work.</p>
              <span className="expertise-count">05 disciplines</span>
            </div>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number} data-reveal>
                <div className="service-topline">
                  <span>{service.number}</span>
                  <span>{service.tag}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        {/* WORK SECTION */}
        <section className="work snap-section" id="work">
          <div className="work-heading" data-reveal>
            <div>
              <p className="eyebrow dark">Selected work</p>
              <h2>The work,<br /><em>in context.</em></h2>
            </div>
            <p>Different stages need different answers. These projects show scale, consistency, acquisition, sales, and community building.</p>
          </div>

          <div className="project-stack">
            {projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.name}>
                <div className="project-main">
                  <div className="project-number">{project.number}</div>
                  <div className="project-logo-wrap">
                    <img src={project.logo} alt={`${project.name} logo`} />
                  </div>
                  <div className="project-copy">
                    <p className="project-label">{project.label}</p>
                    <h3>{project.name}</h3>
                    <p>{project.copy}</p>
                  </div>
                </div>
                <div className="project-metrics">
                  {project.metrics.map(([value, label]) => (
                    <div key={label + value}><strong>{value}</strong><span>{label}</span></div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="integrity-note">Public channel-level figures are shown as scale context. Individual attribution is limited to work connected to Peculiar’s documented management and execution periods.</p>
        </section>

        {/* METHOD SECTION */}
        <section className="method snap-section" id="method">
          <div className="method-header" data-reveal>
            <p className="eyebrow">A practical way of working</p>
            <h2>Before the post,<br /><em>there’s a question.</em></h2>
          </div>

          <div className="process-list">
            {process.map(([name, question], index) => (
              <article key={name} data-reveal>
                <span>0{index + 1}</span>
                <h3>{name}</h3>
                <p>{question}</p>
              </article>
            ))}
          </div>

          <div className="tools-block" data-reveal>
            <div className="tools-copy">
              <p className="eyebrow">Working toolkit</p>
              <h3>Organised enough to run. Flexible enough to improve.</h3>
              <p>Planning, paid media, reporting and automation brought into one clear operating rhythm.</p>
            </div>
            <div className="tool-grid">
              {tools.map((tool, index) => <span key={tool}><i>0{index + 1}</i>{tool}</span>)}
            </div>
          </div>

          <div className="skill-line" aria-label="Core skills">
            <div>
              <span>Social strategy</span><b>◆</b><span>Brand strategy</span><b>◆</b><span>Content marketing</span><b>◆</b><span>Paid acquisition</span><b>◆</b><span>Automation</span><b>◆</b><span>Analytics</span><b>◆</b>
            </div>
            <div aria-hidden="true">
              <span>Social strategy</span><b>◆</b><span>Brand strategy</span><b>◆</b><span>Content marketing</span><b>◆</b><span>Paid acquisition</span><b>◆</b><span>Automation</span><b>◆</b><span>Analytics</span><b>◆</b>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact snap-section" id="contact">
          <div className="contact-top" data-reveal>
            <p className="eyebrow">Available worldwide</p>
            <span>06 / Let’s talk</span>
          </div>
          <div className="contact-main">
            <h2 data-reveal>Your brand has<br />somewhere to go.</h2>
            <div className="contact-side" data-reveal>
              <p>If you need clear social strategy, stronger content direction, conversion-focused ads or smarter automation, let’s talk about the next move.</p>
              <a className="contact-email" href="mailto:Peculiarsunshine12@gmail.com">Peculiarsunshine12@gmail.com <span>↗</span></a>
              <a className="contact-phone" href="tel:+2347066337370">070 6633 7370</a>
            </div>
          </div>
          <div className="contact-footer">
            <div className="footer-mark"><span>PS</span><p>Peculiar Sunshine<br /><small>Social Media &amp; Brand Strategist · Content Marketing Specialist</small></p></div>
            <div className="footer-status"><i /> Open to full-time, contract and consulting work</div>
            <a href="#home">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}
