"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["01", "home", "Home"],
  ["02", "results", "Results"],
  ["03", "work", "Work"],
  ["04", "services", "Services"],
  ["05", "about", "About"],
  ["06", "contact", "Contact"],
] as const;

const metrics = [
  { value: "586K+", label: "Total Audience Size", note: "Across connected digital touchpoints" },
  { value: "1.8M", label: "Standout Views", note: "Highest performing organic anchor" },
  { value: "1.1M", label: "Long-form Reach", note: "Consistent audience engagement" },
  { value: "196K+", label: "Short-form Views", note: "High-retention reel formats" },
];

const services = [
  {
    title: "Social Media Strategy",
    text: "Clear channel plans and day-to-day management built around your business goals.",
  },
  {
    title: "UGC & Content Creation",
    text: "High-quality, engaging visual content and reels designed specifically for social platforms.",
  },
  {
    title: "Content Strategy",
    text: "Campaign ideas, monthly plans, and hooks that give creators a consistent direction.",
  },
  {
    title: "Paid Social Ads",
    text: "Conversion-focused Meta campaigns planned for traffic, leads, and direct sales.",
  },
  {
    title: "Community Automation",
    text: "Automated chat journeys that answer questions, capture leads, and retain audiences.",
  },
  {
    title: "Analytics & Reporting",
    text: "Translating reach, engagement, and clicks into clear decisions for the next round of work.",
  },
];

const projects = [
  {
    name: "Winnie’s School of Excellence",
    problem: "Needed a cohesive strategy to unite seven different digital touchpoints and grow the community.",
    action: "Developed a comprehensive social media management and content strategy to anchor public content.",
    result: "Built a 586K+ subscriber ecosystem with 1.8M standout views.",
    image: "/phone_mockup.jpg",
  },
  {
    name: "Nova Tribe & Missions",
    problem: "Required organic growth and paid acquisition for a rapidly expanding brand ecosystem.",
    action: "Executed community content planning combined with conversion-focused paid distribution.",
    result: "Consistently hit 34K+ monthly views with highly efficient cost-per-click.",
    image: "/phone_mockup.jpg",
  },
  {
    name: "Coach AMARAK",
    problem: "Lacked a reliable, cross-platform operating rhythm to engage their existing audience.",
    action: "Designed and maintained a multi-platform system executed every single morning.",
    result: "100 consecutive days of flawless cross-platform delivery and engagement.",
    image: "/phone_mockup.jpg",
  },
];

const processSteps = [
  "Understand",
  "Strategise",
  "Create",
  "Distribute",
  "Convert",
  "Improve",
];

const testimonials = [
  {
    quote: "Peculiar completely transformed how we approach our social media. The strategy was clear, and the results were immediate.",
    author: "Founder, Nova Tribe"
  },
  {
    quote: "Her ability to connect organic content with paid distribution helped us scale faster than we thought possible.",
    author: "Winnie's School of Excellence"
  }
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5] }
    );

    document.querySelectorAll("main section[id]").forEach((section) =>
      sectionObserver.observe(section)
    );

    return () => sectionObserver.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-brand-cream/90 backdrop-blur-md border-b border-brand-light/20">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          <a href="#home" onClick={closeMenu} className="font-serif text-xl font-bold tracking-tight text-brand-dark flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-warm text-brand-cream flex items-center justify-center text-sm">PS</span>
            Peculiar Sunshine
          </a>

          <nav className={`fixed inset-0 bg-brand-cream md:bg-transparent md:static flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 transition-transform ${menuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
            {navItems.map(([, id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className={`text-sm tracking-wide font-medium transition-colors ${active === id ? 'text-brand-warm' : 'text-brand-dark/70 hover:text-brand-dark'}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:flex btn-primary">
            Work With Me
          </a>

          <button className="md:hidden z-10 relative p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-0.5 bg-brand-dark mb-1.5" />
            <div className="w-6 h-0.5 bg-brand-dark" />
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section id="home" className="section-container min-h-[90vh] flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif text-brand-dark leading-tight">
                Growth you can measure.
              </h1>
              <p className="text-xl text-brand-warm font-medium tracking-wide">
                Social Media Strategist • Content Strategist • UGC Creator
              </p>
            </div>
            <p className="text-lg text-brand-dark/80 max-w-xl mx-auto md:mx-0 text-balance">
              I help brands strengthen their online presence, reach the right people, and turn attention into meaningful action through creative strategy and engaging content.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a href="#work" className="btn-primary w-full sm:w-auto">View My Work</a>
              <a href="#contact" className="btn-secondary w-full sm:w-auto">Work With Me</a>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md mx-auto relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-brand-light/20 relative">
              {/* Using generated placeholder */}
              <img src="/hero_portrait.jpg" alt="Peculiar Sunshine" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-warm rounded-full -z-10 blur-2xl opacity-50" />
          </div>
        </section>

        {/* RESULTS SECTION */}
        <section id="results" className="bg-brand-dark text-brand-cream">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl">Results First.</h2>
              <p className="text-brand-cream/70 text-lg">Proof that the strategy works. The goal is not simply to be seen, but to help the right people take the next step.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              {metrics.map((metric, i) => (
                <div key={i} className="space-y-3">
                  <div className="text-6xl md:text-7xl font-serif text-brand-light">{metric.value}</div>
                  <h3 className="text-xl font-bold tracking-wide uppercase">{metric.label}</h3>
                  <p className="text-sm text-brand-cream/60">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK / CASE STUDIES SECTION */}
        <section id="work" className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl text-brand-dark">The Work</h2>
            <p className="text-brand-dark/70 text-lg">A selection of recent strategies, campaigns, and content creation.</p>
          </div>

          <div className="space-y-32">
            {projects.map((project, i) => (
              <article key={project.name} className={`flex flex-col gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                <div className="flex-1 w-full max-w-md relative">
                  {/* Phone Mockup Image */}
                  <img src={project.image} alt={project.name} className="w-full h-auto rounded-3xl shadow-xl transform transition-transform hover:scale-105 duration-500" />
                </div>
                <div className="flex-1 space-y-8">
                  <h3 className="text-3xl md:text-4xl text-brand-dark">{project.name}</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-brand-warm">The Problem</h4>
                      <p className="text-brand-dark/80">{project.problem}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-brand-warm">What I Did</h4>
                      <p className="text-brand-dark/80">{project.action}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-brand-warm">The Result</h4>
                      <p className="text-brand-dark/80 text-lg font-medium">{project.result}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SERVICES & PROCESS SECTION */}
        <section id="services" className="bg-brand-light/10">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-brand-dark mb-4">How I Can Help</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {services.map((service, i) => (
                <div key={i} className="bg-brand-white p-8 rounded-2xl shadow-sm border border-brand-dark/5 hover:border-brand-warm/30 transition-colors">
                  <h3 className="text-xl text-brand-warm mb-4 font-bold">{service.title}</h3>
                  <p className="text-brand-dark/70 leading-relaxed">{service.text}</p>
                </div>
              ))}
            </div>

            {/* Visual Process Pipeline */}
            <div className="text-center space-y-12">
              <h3 className="text-2xl font-serif text-brand-dark">The Process</h3>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                {processSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 md:gap-8">
                    <div className="bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm tracking-wide font-medium shadow-md">
                      {step}
                    </div>
                    {i < processSteps.length - 1 && (
                      <span className="text-brand-light text-2xl">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20 text-center">
              <p className="text-sm text-brand-dark/50 uppercase tracking-widest mb-4">Working Toolkit</p>
              <p className="text-brand-dark/70">Meta Ads Manager • Canva • ManyChat • Google Sheets • CapCut</p>
            </div>
          </div>
        </section>

        {/* ABOUT & TESTIMONIALS SECTION */}
        <section id="about" className="section-container">
          <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
            <div className="flex-1 w-full max-w-md">
              <div className="aspect-square rounded-full overflow-hidden shadow-2xl relative">
                <img src="/about_portrait.jpg" alt="About Peculiar Sunshine" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl text-brand-dark">Hi, I'm Peculiar.</h2>
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                I am a Social Media & Growth Strategist passionate about crafting digital experiences that actually work. I don't just post content—I build systems. 
              </p>
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                With a deep love for creative storytelling and data-driven results, I bridge the gap between aesthetics and conversion. Whether it's directing a massive campaign or filming raw UGC, I bring warmth, confidence, and strategy to everything I touch.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-brand-dark text-brand-cream p-10 rounded-3xl relative">
                <div className="text-6xl font-serif text-brand-warm absolute top-4 left-6 opacity-50">"</div>
                <p className="text-lg md:text-xl relative z-10 font-serif leading-relaxed mb-6">{t.quote}</p>
                <p className="text-sm tracking-widest uppercase text-brand-light">{t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="bg-brand-warm text-brand-cream">
          <div className="section-container text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-serif">Let's grow together.</h2>
            <p className="text-xl max-w-2xl mx-auto text-brand-cream/90">
              Ready to elevate your online presence? Send me a message and let's discuss how we can turn your goals into measurable results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a href="https://wa.me/2347066337370" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-full text-lg tracking-wide font-medium transition-transform hover:scale-105 shadow-lg w-full sm:w-auto gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
              <a href="mailto:Peculiarsunshine12@gmail.com" className="btn-secondary border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-warm w-full sm:w-auto">
                Email Me
              </a>
            </div>
            
            <div className="pt-24 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-brand-cream/20">
              <p className="font-serif text-2xl font-bold tracking-tight text-brand-cream">Peculiar Sunshine</p>
              <div className="flex gap-6 text-sm tracking-widest uppercase">
                <a href="#" className="hover:text-brand-dark transition-colors">Instagram</a>
                <a href="#" className="hover:text-brand-dark transition-colors">LinkedIn</a>
              </div>
              <p className="text-sm opacity-60">© 2026 Peculiar Sunshine</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
