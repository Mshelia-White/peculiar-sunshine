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
    label: "Scale · Content systems · Community",
    logo: "/brands/wse-logo.jpg",
    copy: "Social media management, content strategy and community coordination across seven connected digital touchpoints.",
    metrics: [["586K+", "subscriber ecosystem"], ["7", "digital channels"], ["1.8M", "public content anchor"]],
  },
  {
    number: "02",
    name: "Nova Tribe × Nova Missions",
    label: "Organic growth · Paid acquisition",
    logo: "/brands/nova-logo.jpg",
    copy: "Content planning, community, audience intelligence and conversion-focused paid distribution for a growing brand ecosystem.",
    metrics: [["34.6K", "30-day views"], ["31.8K", "30-day views"], ["₦39.11", "cost per click"]],
  },
  {
    number: "03",
    name: "Coach AMARAK",
    label: "Systems · Reliability · Execution",
    logo: "/brands/coach-logo.jpg",
    copy: "A cross-platform operating rhythm maintained every morning for one hundred consecutive days.",
    metrics: [["100", "consecutive days"], ["7:00", "every morning"], ["Multi", "platform system"]],
  },
  {
    number: "04",
    name: "KRD Autos & General Merchandise",
    label: "Foundation · Direction · Early traction",
    logo: "/brands/krd-logo.jpg",
    copy: "Positioning, social strategy, content planning and campaign direction for a brand starting from the ground up.",
    metrics: [["0 → 32", "early community"], ["1.7K", "30-day views"], ["16", "planned pieces"]],
  },
];

const tools = ["Meta Ads Manager", "Meta Business Suite", "Google Sheets", "Canva", "ManyChat", "WhatsApp Business", "Platform Insights"];

const brandExperience = [
  { name: "Winnie’s School of Excellence", logo: "/brands/wse-logo.jpg", mark: "WSE" },
  { name: "Nova", logo: "/brands/nova-logo.jpg", mark: "N" },
  { name: "Coach AMARAK", logo: "/brands/coach-logo.jpg", mark: "CA" },
  { name: "KRD Autos", logo: "/brands/krd-logo.jpg", mark: "KRD" },
  { name: "Agape Haven", logo: null, mark: "AH" },
  { name: "Shop With Pee Sunshine", logo: null, mark: "PS." },
  { name: "QPK Magical Pad", logo: null, mark: "QPK" },
  { name: "Teefly Kitchen", logo: null, mark: "TK" },
  { name: "Confidential Brand", logo: null, mark: "◎" },
];

const process = [
  ["Outcome", "What does the business need to achieve?"],
  ["Audience", "Who needs to care—and what matters to them?"],
  ["Direction", "What should we say, show and prioritise?"],
  ["Distribution", "Where should the audience meet it?"],
  ["Action", "What should happen next?"],
  ["Learning", "What did the performance teach us?"],
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
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
      { threshold: [0.25, 0.5, 0.75] },
    );

    document.querySelectorAll("main section[id]").forEach((section) =>
      sectionObserver.observe(section),
    );

    const updatePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="pointer-light" aria-hidden="true" />
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

      <aside className="section-rail" aria-label="Page progress">
        {navItems.map(([number, id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-label={`Go to ${label}`}>
            <span>{number}</span>
            <i />
          </a>
        ))}
      </aside>

      <main>
        <section className="hero snap-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker" data-reveal>Social Media &amp; Growth Strategist</p>
            <h1 className="hero-title" aria-label="Clear strategy. Better direction. Growth you can measure.">
              <span>Clear strategy.</span>
              <span>Better direction.</span>
              <span className="accent-line">Growth you can measure.</span>
            </h1>
            <p className="hero-intro" data-reveal>
              I help brands strengthen their online presence, reach the right people and turn attention into meaningful action.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="button button-light" href="#work">View selected work <span>↓</span></a>
              <a className="text-link" href="#expertise">Explore my expertise <span>↗</span></a>
            </div>
            <div className="hero-meta" data-reveal>
              <span>Based in Nigeria</span>
              <span>Available worldwide</span>
              <span>3 years of practice</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Portrait placeholder for Peculiar Sunshine">
            <div className="portrait-panel">
              <div className="portrait-grid" />
              <div className="portrait-orbit orbit-one" />
              <div className="portrait-orbit orbit-two" />
              <span className="portrait-monogram">PS</span>
              <div className="portrait-caption">
                <span>Portrait placement</span>
                <small>Final image to be supplied</small>
              </div>
            </div>
            <div className="visual-index"><span>01</span><i /></div>
          </div>

          <a className="scroll-cue" href="#overview" aria-label="Scroll to overview">
            <span>Scroll to explore</span>
            <i><b /></i>
          </a>
        </section>

        <section className="brand-marquee" aria-label="Selected brand experience">
          <div className="brand-marquee-label">
            <span>Selected brand experience</span>
            <span>Brands, businesses &amp; communities</span>
          </div>
          <div className="brand-marquee-window">
            <div className="brand-track">
              {[...brandExperience, ...brandExperience].map((brand, index) => (
                <div className="brand-chip" key={`${brand.name}-${index}`} aria-hidden={index >= brandExperience.length || undefined}>
                  {brand.logo ? (
                    <img src={brand.logo} alt={index < brandExperience.length ? `${brand.name} logo` : ""} />
                  ) : (
                    <span className="brand-placeholder" aria-label={index < brandExperience.length ? `${brand.name} logo placeholder` : undefined}>{brand.mark}</span>
                  )}
                  <small>{brand.name}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overview snap-section" id="overview">
          <div className="section-heading" data-reveal>
            <p className="eyebrow dark">A practical record of growth</p>
            <h2>Growing visibility<br /><em>and turning attention into action.</em></h2>
          </div>

          <div className="overview-copy" data-reveal>
            <p>
              For the past three years, I’ve helped education brands, personal brands, communities and growing businesses build clearer, more useful digital systems.
            </p>
            <p>
              My work connects social strategy, content direction, paid media and performance—so every action has a reason, and every result informs what comes next.
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

        <section className="work snap-section" id="work">
          <div className="work-heading" data-reveal>
            <div>
              <p className="eyebrow dark">Selected work</p>
              <h2>The work,<br /><em>in context.</em></h2>
            </div>
            <p>Different stages need different answers. These projects show scale, consistency, acquisition and early-stage brand building.</p>
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
              <span>Social strategy</span><b>◆</b><span>Content direction</span><b>◆</b><span>Paid acquisition</span><b>◆</b><span>Automation</span><b>◆</b><span>Analytics</span><b>◆</b>
            </div>
            <div aria-hidden="true">
              <span>Social strategy</span><b>◆</b><span>Content direction</span><b>◆</b><span>Paid acquisition</span><b>◆</b><span>Automation</span><b>◆</b><span>Analytics</span><b>◆</b>
            </div>
          </div>
        </section>

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
            <div className="footer-mark"><span>PS</span><p>Peculiar Sunshine<br /><small>Social Media &amp; Growth Strategist</small></p></div>
            <div className="footer-status"><i /> Open to full-time, contract and consulting work</div>
            <a href="#home">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}
