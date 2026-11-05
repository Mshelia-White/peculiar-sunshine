"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ==========================================================================
   LAUNCH SETTINGS — the only things to edit when details change
   ========================================================================== */
// Enrolment opens at this exact moment (Lagos time). It is the same for every visitor.
const LAUNCH_AT = "2026-11-07T15:00:00+01:00";
const WHATSAPP = "2347066337370";
const COURSE = "Learn to Create Flyers & Carousels Using AI";
const WAITLIST_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  `Hi Peculiar! Please add me to the waitlist for “${COURSE}”.`,
)}`;
// Swap this for the payment/checkout link once it is ready.
const ENROL_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Peculiar! I’d like to enrol in “${COURSE}”.`)}`;
// Set to a price such as "₦25,000" to show it on the page.
const PRICE: string | null = null;

/* ==========================================================================
   CONTENT
   ========================================================================== */
const pains = [
  "You see beautiful flyers online and think, “I wish I could create something like this.”",
  "You pay a designer every time you need a post—and wait days for it.",
  "You’ve tried AI, but the results look generic, cluttered or full of wrong text.",
  "Your posts don’t look like they belong to one brand.",
];

const philosophy = [
  { word: "Think first.", text: "Decide the message, who it’s for, what they should notice first and what they should do next." },
  { word: "Visualise second.", text: "Picture the hierarchy, colours, type and layout before you ever write a prompt." },
  { word: "Use AI third.", text: "Let AI draft the copy and the design—then you review, refine and finish like a designer." },
];

const steps = [
  { title: "Create your visual identity", text: "Logo direction, colours, fonts, imagery and overall style—saved as a simple brand guide you reuse every time." },
  { title: "Define your message", text: "What you’re promoting, who it’s for, the main offer, the key details and the one action you want." },
  { title: "Generate your copy", text: "Use AI to shape the headline, supporting line, benefits and call to action—then approve it before you design." },
  { title: "Get your reference", text: "Study layout, hierarchy and image placement on Pinterest—for direction only, never to copy." },
  { title: "Create, review & finalise", text: "Bring brand, copy and reference together. Generate with AI, review carefully, refine, then export." },
];

const checks = ["Message", "Hierarchy", "Colour", "Type", "Spacing", "Branding", "Action"];
const carousel = ["Hook", "Problem", "Insight", "Example", "Action"];

const flyers = [
  { src: "/work/graphics/lushgreen-diffusers.webp", alt: "Lushgreen diffusers flyer designed by Peculiar Sunshine" },
  { src: "/work/graphics/everyday-handbag.webp", alt: "Everyday handbag product flyer designed by Peculiar Sunshine" },
  { src: "/work/graphics/sami-casual.webp", alt: "Sami Casual fashion flyer designed by Peculiar Sunshine" },
  { src: "/work/graphics/iced-coffee-concept.webp", alt: "Iced coffee concept flyer designed by Peculiar Sunshine" },
  { src: "/work/graphics/ai-flyers-carousel.webp", alt: "AI flyers carousel slide designed by Peculiar Sunshine" },
];

const forYou = [
  "Business owners who want to create their own promotional content",
  "Social media managers and content creators",
  "Beginners who have never designed anything before",
  "Anyone who wants a valuable, practical creative skill",
];
const notForYou = [
  "People who want AI to do all the thinking for them",
  "Anyone looking for advanced print, packaging or 3D design",
];

const included = [
  "Foundation Guide (13-page PDF)",
  "5 short practical videos",
  "4 copy-paste AI prompt templates",
  "Carousel framework: Hook → Action",
  "7-point final design checklist",
  "Phone + laptop editions",
  "Your first-flyer assignment",
];

const faqs = [
  {
    q: "Do I need any design experience?",
    a: "No. The course starts from the beginning. You need a clear idea, a message and the ability to explain what you want—the guide and videos handle the rest.",
  },
  {
    q: "Can I learn on my phone?",
    a: "Yes. There is a phone edition and a laptop edition of the practical class, so you can learn on whatever you have.",
  },
  {
    q: "Which tools will I use?",
    a: "ChatGPT for your brand guide, copy and design drafts, Pinterest for references, and Canva only for small clean-ups. Need Canva (₦3,000) or CapCut (₦4,000) access, or ChatGPT Go or Claude? Message Peculiar for current options.",
  },
  {
    q: "Is it live or recorded?",
    a: "The practical class is a set of short recorded videos, each covering one step, plus the PDF guide—so you can learn at your own pace and rewatch any time.",
  },
  {
    q: "Does it cover carousels too?",
    a: "Yes. You’ll learn a simple five-slide framework—Hook, Problem, Insight, Example, Action—built on the same five-step system as your flyer.",
  },
  {
    q: "How do I join?",
    a: "Enrolment opens when the countdown ends. Join the waitlist on WhatsApp now and you’ll be among the first to hear the launch price and get access.",
  },
];

/* ==========================================================================
   HELPERS
   ========================================================================== */
const launchTime = new Date(LAUNCH_AT).getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ready = now !== null;
  const diff = ready ? Math.max(0, launchTime - now) : 0;
  return {
    ready,
    done: ready && diff === 0,
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}
type Count = ReturnType<typeof useCountdown>;

function Digits({ value }: { value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <span className="gc-digits">
      {text.split("").map((char, index) => (
        <span className="gc-digit" key={index}>
          <span className="gc-digit-in" key={char}>{char}</span>
        </span>
      ))}
    </span>
  );
}

function Countdown({ count, variant = "large" }: { count: Count; variant?: "large" | "card" }) {
  const units: [string, number][] = [
    ["Days", count.d],
    ["Hours", count.h],
    ["Minutes", count.m],
    ["Seconds", count.s],
  ];
  return (
    <div className={`gc-count gc-count-${variant}${count.ready ? " is-ready" : ""}`} role="timer" aria-label="Time until enrolment opens">
      {units.map(([label, value], index) => (
        <div className="gc-unit" key={label}>
          <Digits value={value} />
          <span className="gc-unit-label">{label}</span>
          {index < units.length - 1 && <i className="gc-colon" aria-hidden="true">:</i>}
        </div>
      ))}
    </div>
  );
}

function CompactCount({ count }: { count: Count }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="gc-compact" aria-hidden={!count.ready}>
      {count.ready ? `${pad(count.d)}d ${pad(count.h)}h ${pad(count.m)}m ${pad(count.s)}s` : "-- -- -- --"}
    </span>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.3 21.7l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 1.8a8 8 0 1 1-4.1 14.9l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 0 1 12 4Zm-3.3 4c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3-1.6-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.4Z"
      />
    </svg>
  );
}

function CTA({ live, label, className = "" }: { live: boolean; label?: string; className?: string }) {
  return (
    <a className={`gc-btn gc-btn-primary ${className}`} href={live ? ENROL_URL : WAITLIST_URL} target="_blank" rel="noopener noreferrer">
      <ChatIcon />
      <span>{label ?? (live ? "Enrol now" : "Join the waitlist")}</span>
      <b aria-hidden="true">↗</b>
    </a>
  );
}

function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: "div" | "li" | "article" | "p"; className?: string; delay?: number }) {
  return (
    <Tag className={`gc-reveal ${className}`} data-gc-reveal style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function CoursePage() {
  const count = useCountdown();
  const live = count.done;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroPassed, setHeroPassed] = useState(false);
  const [phase, setPhase] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-gc-reveal]").forEach((el) => reveal.observe(el));

    const heroWatch = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), { threshold: 0.05 });
    if (heroRef.current) heroWatch.observe(heroRef.current);

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--gc-progress", String(max > 0 ? window.scrollY / max : 0));

      const method = methodRef.current;
      if (method) {
        const rect = method.getBoundingClientRect();
        const travel = rect.height - vh;
        const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 0.999) : 0;
        setPhase(Math.floor(p * philosophy.length));
        method.style.setProperty("--p", p.toFixed(3));
      }

      const list = stepsRef.current;
      if (list) {
        const rect = list.getBoundingClientRect();
        const fill = Math.min(Math.max((vh * 0.55 - rect.top) / rect.height, 0), 1);
        list.style.setProperty("--fill", fill.toFixed(3));
        list.querySelectorAll<HTMLElement>("li").forEach((item) => {
          item.classList.toggle("is-on", item.getBoundingClientRect().top < vh * 0.55);
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const hero = heroRef.current;
    const onPointer = (event: PointerEvent) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      hero.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    hero?.addEventListener("pointermove", onPointer);
    return () => {
      reveal.disconnect();
      heroWatch.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero?.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className="gc">
      <div className="gc-progress" aria-hidden="true" />

      {/* HEADER */}
      <header className="gc-header">
        <a className="gc-brand" href="/" aria-label="Peculiar Sunshine home">
          <span className="gc-brand-mark">PS</span>
          <span className="gc-brand-name">Peculiar Sunshine</span>
        </a>
        <div className="gc-header-status">
          <i className={live ? "gc-dot live" : "gc-dot"} />
          {live ? <span>Enrolment is open</span> : <><span>Enrolment opens in</span><CompactCount count={count} /></>}
        </div>
        <CTA live={live} className="gc-btn-small" label={live ? "Enrol now" : "Join waitlist"} />
      </header>

      <main>
        {/* HERO */}
        <section className="gc-hero" ref={heroRef}>
          <div className="gc-glow gc-glow-a" aria-hidden="true" />
          <div className="gc-glow gc-glow-b" aria-hidden="true" />
          <div className="gc-wrap gc-hero-grid">
            <div className="gc-hero-copy">
              <p className="gc-chip gc-load" style={{ "--d": "100ms" } as CSSProperties}>
                <i className={live ? "gc-dot live" : "gc-dot"} />
                {live ? "Now enrolling" : "Pre-launch"} · Phone + laptop editions
              </p>
              <h1 className="gc-h1">
                <span className="gc-line"><span style={{ "--d": "180ms" } as CSSProperties}>Create flyers &amp;</span></span>
                <span className="gc-line"><span style={{ "--d": "260ms" } as CSSProperties}>carousels that</span></span>
                <span className="gc-line"><span style={{ "--d": "340ms" } as CSSProperties}>stop the scroll—</span></span>
                <span className="gc-line"><span style={{ "--d": "420ms" } as CSSProperties}><em>using AI.</em></span></span>
              </h1>
              <p className="gc-lead gc-load" style={{ "--d": "560ms" } as CSSProperties}>
                A beginner-friendly course that teaches you to think like a designer and let AI do the heavy lifting. No design degree. No complicated software. Just your phone or laptop.
              </p>

              <div className="gc-hero-count gc-load" style={{ "--d": "680ms" } as CSSProperties}>
                {live ? (
                  <p className="gc-open-note">Enrolment is open — secure your place today.</p>
                ) : (
                  <>
                    <span className="gc-count-label">Enrolment opens in</span>
                    <Countdown count={count} />
                  </>
                )}
              </div>

              <div className="gc-hero-actions gc-load" style={{ "--d": "800ms" } as CSSProperties}>
                <CTA live={live} />
                <a className="gc-btn gc-btn-ghost" href="#inside">What’s inside <b aria-hidden="true">↓</b></a>
              </div>

              <ul className="gc-proof gc-load" style={{ "--d": "920ms" } as CSSProperties}>
                <li><strong>5</strong> practical videos</li>
                <li><strong>13</strong>-page guide</li>
                <li><strong>4</strong> copy-paste prompts</li>
              </ul>
            </div>

            <div className="gc-hero-visual" aria-hidden="true">
              <div className="gc-arch" />
              <img className="gc-flyer f1" src={flyers[0].src} alt="" />
              <img className="gc-flyer f2" src={flyers[2].src} alt="" />
              <img className="gc-flyer f3" src={flyers[1].src} alt="" />
              <img className="gc-portrait" src="/header-portrait.webp" alt="" />
              <span className="gc-float-note">Think first. Visualise second. <em>Use AI third.</em></span>
            </div>
          </div>
        </section>

        {/* INTRO FILM */}
        <section className="gc-section gc-film-section">
          <div className="gc-wrap">
            <Reveal className="gc-head gc-head-center">
              <p className="gc-eyebrow">Intro film</p>
              <h2 className="gc-h2">A short hello <em>before you begin.</em></h2>
            </Reveal>
            <Reveal className="gc-film" delay={120}>
              <div className="gc-film-copy">
                <p className="gc-eyebrow light">Why I teach design with AI</p>
                <p className="gc-film-title">“You don’t need to be a designer. <em>You need a system.</em>”</p>
                <span className="gc-film-soon">
                  <span className="gc-play" aria-hidden="true">▶</span>
                  Premieres at launch
                </span>
              </div>
              <img className="gc-film-portrait" src="/header-portrait.webp" alt="Peculiar Sunshine" loading="lazy" />
            </Reveal>
          </div>
        </section>

        {/* PAINS */}
        <section className="gc-section">
          <div className="gc-wrap gc-pains">
            <Reveal className="gc-head">
              <p className="gc-eyebrow">Sound familiar?</p>
              <h2 className="gc-h2">If any of this <em>feels like you…</em></h2>
            </Reveal>
            <ol className="gc-pain-list">
              {pains.map((pain, index) => (
                <Reveal as="li" key={pain} delay={index * 90}>
                  <span>0{index + 1}</span>
                  <p>{pain}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="gc-turn" delay={100}>
              <p>
                You don’t need to become a designer overnight.
                <br />
                <em>You need a clear system—and AI as your assistant.</em>
              </p>
            </Reveal>
          </div>
        </section>

        {/* PHILOSOPHY (sticky scroll) */}
        <section className="gc-method" ref={methodRef} aria-label="The philosophy">
          <div className="gc-method-sticky">
            <div className="gc-wrap gc-method-inner">
              <p className="gc-eyebrow light">The philosophy behind the course</p>
              <div className="gc-method-words">
                {philosophy.map((item, index) => (
                  <p key={item.word} className={index <= phase ? "is-on" : ""}>
                    {item.word}
                  </p>
                ))}
              </div>
              <div className="gc-method-text">
                {philosophy.map((item, index) => (
                  <p key={item.word} className={index === phase ? "is-on" : ""}>{item.text}</p>
                ))}
              </div>
              <div className="gc-method-bar" aria-hidden="true"><i /></div>
            </div>
          </div>
        </section>

        {/* FIVE STEPS */}
        <section className="gc-section">
          <div className="gc-wrap gc-steps-grid">
            <div className="gc-steps-head">
              <Reveal className="gc-head">
                <p className="gc-eyebrow">The practical workflow</p>
                <h2 className="gc-h2">Five steps.<br /><em>One flyer that works.</em></h2>
                <p className="gc-sub">Each step is one short video. You follow along with a real case study—<strong>Peculiar Bakes</strong>—then repeat it for your own brand.</p>
              </Reveal>
            </div>
            <ol className="gc-steps" ref={stepsRef}>
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="gc-step-dot">{index + 1}</span>
                  <div>
                    <p className="gc-step-tag">Video 0{index + 1}</p>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="gc-section gc-inside" id="inside">
          <div className="gc-wrap">
            <Reveal className="gc-head gc-head-split">
              <div>
                <p className="gc-eyebrow">What’s inside</p>
                <h2 className="gc-h2">Everything you need <em>to start creating.</em></h2>
              </div>
              <p className="gc-sub">Read the why, watch the how, then do it yourself. The guide and videos are built to be used together.</p>
            </Reveal>

            <div className="gc-bento">
              <Reveal as="article" className="gc-tile gc-tile-guide">
                <p className="gc-tile-tag">PDF · 13 pages</p>
                <h3>The Foundation Guide</h3>
                <p>Hierarchy, colour, typography, spacing and branding—explained simply, so every design decision makes sense.</p>
                <div className="gc-guide-cover" aria-hidden="true">
                  <span>Peculiar Sunshine / Creative Education</span>
                  <b>Learn to create flyers &amp; carousels <em>using AI</em></b>
                  <i>01 Think first · 02 Visualise second · 03 Use AI third</i>
                </div>
              </Reveal>
              <Reveal as="article" className="gc-tile" delay={80}>
                <p className="gc-tile-tag">Video</p>
                <h3>5 practical videos</h3>
                <p>Short, focused and on screen—one clear step per video, in order.</p>
                <span className="gc-tile-big">05</span>
              </Reveal>
              <Reveal as="article" className="gc-tile" delay={160}>
                <p className="gc-tile-tag">Templates</p>
                <h3>4 copy-paste prompts</h3>
                <p>Visual identity, flyer copy, reference analysis and final design—just fill the brackets.</p>
                <span className="gc-prompt" aria-hidden="true">Brand name: <i>[ your brand ]</i></span>
              </Reveal>
              <Reveal as="article" className="gc-tile gc-tile-wide" delay={80}>
                <p className="gc-tile-tag">Carousels</p>
                <h3>One idea, five slides</h3>
                <div className="gc-slides" aria-label="Carousel framework">
                  {carousel.map((slide, index) => (
                    <span key={slide} style={{ "--i": index } as CSSProperties}>
                      <i>0{index + 1}</i>
                      {slide}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal as="article" className="gc-tile gc-tile-wide" delay={160}>
                <p className="gc-tile-tag">Before you post</p>
                <h3>The 7-point final check</h3>
                <div className="gc-checks">
                  {checks.map((check) => (
                    <span key={check}>✓ {check}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal as="article" className="gc-tile gc-tile-dark" delay={240}>
                <p className="gc-tile-tag">Editions</p>
                <h3>Phone or laptop</h3>
                <p>Learn on the device you already have. Same system, two practical editions.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="gc-section gc-proof-section">
          <div className="gc-wrap">
            <Reveal className="gc-head gc-head-center">
              <p className="gc-eyebrow light">Made with this exact process</p>
              <h2 className="gc-h2 light">Designs that do <em>one job, clearly.</em></h2>
              <p className="gc-sub light">Real flyers and carousels by Peculiar—built with the same five steps you’ll learn.</p>
            </Reveal>
          </div>
          <div className="gc-marquee" aria-label="Flyers designed by Peculiar Sunshine">
            <div className="gc-marquee-track">
              {[...flyers, ...flyers].map((flyer, index) => (
                <figure key={`${flyer.src}-${index}`} aria-hidden={index >= flyers.length || undefined}>
                  <img src={flyer.src} alt={index < flyers.length ? flyer.alt : ""} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FOR / NOT FOR */}
        <section className="gc-section">
          <div className="gc-wrap">
            <Reveal className="gc-head gc-head-center">
              <p className="gc-eyebrow">Who it’s for</p>
              <h2 className="gc-h2">Built for <em>doers, not designers.</em></h2>
            </Reveal>
            <div className="gc-fit">
              <Reveal as="article" className="gc-fit-card yes">
                <h3>This is for you if…</h3>
                <ul>{forYou.map((item) => <li key={item}>{item}</li>)}</ul>
              </Reveal>
              <Reveal as="article" className="gc-fit-card no" delay={120}>
                <h3>It’s not for you if…</h3>
                <ul>{notForYou.map((item) => <li key={item}>{item}</li>)}</ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* INSTRUCTOR */}
        <section className="gc-section gc-instructor-section">
          <div className="gc-wrap gc-instructor">
            <Reveal className="gc-instructor-photo">
              <div className="gc-arch small" />
              <img src="/header-portrait.webp" alt="Peculiar Sunshine" loading="lazy" />
            </Reveal>
            <div className="gc-instructor-copy">
              <Reveal>
                <p className="gc-eyebrow">Meet your instructor</p>
                <h2 className="gc-h2">Peculiar <em>Sunshine</em></h2>
                <p className="gc-instructor-role">Social Media &amp; Brand Strategist · AI Video &amp; UGC Creator · Graphic Designer</p>
                <p className="gc-instructor-bio">
                  Peculiar has spent years managing brands across education, health, faith and retail—helping drive over ₦50 million in product sales—while designing the flyers, carousels and AI video ads that make them stand out. This course is the exact system she uses, made simple enough to learn from scratch.
                </p>
              </Reveal>
              <Reveal className="gc-stats" delay={120}>
                <div><strong>₦50M+</strong><span>Product sales supported</span></div>
                <div><strong>586K+</strong><span>Community managed</span></div>
                <div><strong>6+</strong><span>Brands managed</span></div>
              </Reveal>
              <Reveal delay={200}>
                <a className="gc-work-link" href="/#featured-film">
                  <img src="/work/videos/subway-ad-poster.jpg" alt="" loading="lazy" />
                  <span>
                    <i>Also an AI video creator</i>
                    <b>Watch one of her AI video ads</b>
                  </span>
                  <em aria-hidden="true">↗</em>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="gc-section gc-pricing-section" id="enrol">
          <div className="gc-wrap">
            <Reveal className="gc-head gc-head-center">
              <p className="gc-eyebrow">{live ? "Enrolment is open" : "Founding enrolment"}</p>
              <h2 className="gc-h2">Your first great flyer <em>starts here.</em></h2>
            </Reveal>
            <Reveal className="gc-price-wrap" delay={100}>
              <div className="gc-price-card">
                <div className="gc-price-top">
                  <p className="gc-tile-tag">{COURSE}</p>
                  <p className="gc-price">{PRICE ?? (live ? "Message for price" : "Price revealed at launch")}</p>
                  <p className="gc-price-note">
                    {live ? "Instant access to the guide, prompts and practical videos." : "Waitlist members are the first to hear the launch price and get access."}
                  </p>
                </div>
                <ul className="gc-included">
                  {included.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {!live && (
                  <div className="gc-price-count">
                    <span className="gc-count-label">Enrolment opens in</span>
                    <Countdown count={count} variant="card" />
                  </div>
                )}
                <CTA live={live} className="gc-btn-block" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="gc-section gc-faq-section">
          <div className="gc-wrap gc-faq-grid">
            <Reveal className="gc-head">
              <p className="gc-eyebrow">Questions</p>
              <h2 className="gc-h2">Good to <em>know.</em></h2>
              <p className="gc-sub">Something else on your mind? <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">Ask Peculiar on WhatsApp ↗</a></p>
            </Reveal>
            <div className="gc-faq">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div className={open ? "gc-faq-item is-open" : "gc-faq-item"} key={faq.q}>
                    <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? null : index)}>
                      <span>{faq.q}</span>
                      <i aria-hidden="true" />
                    </button>
                    <div className="gc-faq-a">
                      <div><p>{faq.a}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="gc-final">
          <div className="gc-wrap gc-final-inner">
            <Reveal>
              <p className="gc-eyebrow light">{live ? "Enrolment is open" : "Launching soon"}</p>
              <h2 className="gc-final-title">Think first. Visualise second. <em>Use AI third.</em></h2>
            </Reveal>
            <Reveal className="gc-final-actions" delay={120}>
              {!live && <Countdown count={count} variant="card" />}
              <CTA live={live} />
            </Reveal>
          </div>
          <footer className="gc-wrap gc-footer">
            <a className="gc-brand" href="/">
              <span className="gc-brand-mark light">PS</span>
              <span className="gc-brand-name">Peculiar Sunshine</span>
            </a>
            <nav aria-label="Social links">
              <a href="https://www.instagram.com/pee_sunshine_" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.tiktok.com/@peesunshine5" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="https://x.com/PeculiarChukwu3" target="_blank" rel="noopener noreferrer">X</a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </nav>
            <p>© 2026 Peculiar Sunshine</p>
          </footer>
        </section>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className={heroPassed ? "gc-sticky is-on" : "gc-sticky"}>
        <div>
          <span>{live ? "Enrolment is open" : "Opens in"}</span>
          {!live && <CompactCount count={count} />}
        </div>
        <CTA live={live} className="gc-btn-small" label={live ? "Enrol now" : "Join waitlist"} />
      </div>
    </div>
  );
}
