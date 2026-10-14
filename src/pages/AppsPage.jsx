import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Apple, ArrowUpRight } from "lucide-react";
import { APPS } from "@/data/apps";
import { PageHero } from "@/components/site/PageHero";
import { PhoneFrame } from "@/components/phones/PhoneFrame";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";

const AppDetail = ({ app, flip }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(18% 18% 18% 18% round 40px)", "inset(0% 0% 0% 0% round 40px)"]);
  const { Screen, Icon } = app;

  return (
    <section ref={ref} id={app.id} data-testid={`app-detail-${app.id}`} className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
      <div className={`grid items-center gap-12 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative h-[620px] sm:h-[680px]">
          <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden rounded-[40px] border hairline">
            <motion.img style={{ y: imgY }} src={app.image} alt={`${app.name} mood`} className="absolute -inset-y-[14%] h-[128%] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40 backdrop-blur-[1px]" />
            <div className="pointer-events-none absolute inset-0 blur-[90px] opacity-50" style={{ background: app.glow }} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <PhoneFrame testid={`apps-page-${app.id}-phone`} appId={app.id} className="shadow-2xl">
              <Screen id={`page-${app.id}`} />
            </PhoneFrame>
          </div>
        </div>
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: app.accent }}><Icon className="h-6 w-6 text-black" /></span>
            <span className="eyebrow">{app.no} — {app.virtue}</span>
          </Reveal>
          <Reveal delay={0.05}><h2 className="mt-8 font-display text-5xl font-medium tracking-tight sm:text-6xl">{app.name}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-4 font-serif text-3xl italic leading-tight text-dim">{app.tagline}</p></Reveal>
          <Reveal delay={0.15}><p className="mt-6 max-w-lg leading-relaxed text-dim">{app.blurb}</p></Reveal>
          <ul className="mt-10 border-t hairline">
            {app.features.map((f, i) => (
              <Reveal key={f} delay={0.05 * i} className="group flex items-center justify-between border-b hairline py-4">
                <span className="flex items-center gap-4"><span className="font-mono text-xs text-dim">0{i + 1}</span><span className="text-lg transition-transform duration-500 group-hover:translate-x-2">{f}</span></span>
                <span className="h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-[2.5]" style={{ background: app.accent }} />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <a href="#" onClick={(e) => e.preventDefault()} data-testid={`apps-page-${app.id}-appstore-btn`} className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-canvas transition-transform hover:scale-[1.03]">
              <Apple className="h-6 w-6" />
              <span className="leading-tight"><span className="block text-[10px] uppercase tracking-wider opacity-80">Download on the</span><span className="font-semibold">App Store</span></span>
            </a>
            <Link to="/contact" data-testid={`apps-page-${app.id}-feedback-link`} className="group flex items-center gap-2 rounded-2xl border hairline px-5 py-3 font-semibold">Share feedback <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

import { useSiteContent } from "@/context/SiteContentContext";

export default function AppsPage() {
  const { config } = useSiteContent();
  const visibleApps = APPS.filter((a) => config.appVisibility[a.id] !== false);

  return (
    <main data-testid="apps-page">
      <PageHero testid="apps-hero" eyebrow="The collection" text={`${visibleApps.length} focused utilities, each built around a single bright idea. Every phone on this page is a live, tappable preview.`}
        lines={["Small apps,", <span className="font-serif italic font-normal prism-text pr-2">brilliant</span>, "purpose."]} />
      <nav className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 sm:px-10">
        {visibleApps.map((a) => (
          <button key={a.id} data-testid={`apps-jump-${a.id}`} onClick={() => window.__lenis?.scrollTo(`#${a.id}`, { offset: -80 })}
            className="rounded-full border hairline px-4 py-2 text-sm font-medium text-dim transition-colors hover:bg-ink hover:text-canvas">{a.no} · {a.name}</button>
        ))}
      </nav>
      {visibleApps.map((a, i) => <AppDetail key={a.id} app={a} flip={i % 2 === 1} />)}
      <Marquee />
    </main>
  );
}
