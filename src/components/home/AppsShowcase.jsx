import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { APPS } from "@/data/apps";
import { PhoneFrame } from "@/components/phones/PhoneFrame";
import { MaskLines, Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";

export const AppsShowcase = () => {
  const { config, isAppComingSoon } = useSiteContent();
  const visibleApps = APPS.filter((a) => config.appVisibility[a.id] !== false);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  // Ensure activeIndex is within bounds if apps are toggled offline
  useEffect(() => {
    if (activeIndex >= visibleApps.length && visibleApps.length > 0) {
      setActiveIndex(0);
    }
  }, [visibleApps.length, activeIndex]);

  // Scroll observer to update activeIndex as the left story stream scrolls
  useEffect(() => {
    if (visibleApps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -45% 0px", // triggers when item is centered in viewport
        threshold: 0.1,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleApps]);

  const scrollToApp = (index) => {
    setActiveIndex(index);
    const target = itemRefs.current[index];
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -100 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const nextApp = () => {
    if (activeIndex < visibleApps.length - 1) {
      scrollToApp(activeIndex + 1);
    } else {
      scrollToApp(0);
    }
  };

  const prevApp = () => {
    if (activeIndex > 0) {
      scrollToApp(activeIndex - 1);
    } else {
      scrollToApp(visibleApps.length - 1);
    }
  };

  if (visibleApps.length === 0) return null;

  const currentApp = visibleApps[activeIndex] || visibleApps[0];
  const CurrentScreen = currentApp.Screen;

  return (
    <section data-testid="apps-showcase" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-10">
      {/* Section Header */}
      <div className="mb-12 flex flex-col justify-between gap-8 px-2 md:flex-row md:items-end">
        <MaskLines
          className="font-display text-4xl font-medium leading-[1] tracking-tight sm:text-6xl lg:text-7xl"
          lines={[`${visibleApps.length} apps.`, <span className="font-serif italic font-normal">One light.</span>]}
        />
        <Reveal className="max-w-sm text-dim">
          Each Sanibha utility is built around a single bright purpose. Tap the pinned phone — the live interface
          morphs as you scroll.
        </Reveal>
      </div>

      {/* Quick Jump Bar */}
      <div className="mb-12 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {visibleApps.map((app, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={app.id}
                onClick={() => scrollToApp(idx)}
                className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "border-white/30 bg-white/10 text-white shadow-lg"
                    : "border-white/5 bg-white/[0.03] text-white/50 hover:border-white/15 hover:text-white"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125"
                  style={{ background: app.accent }}
                />
                <span className="font-mono text-[10px] text-white/40">{app.no}</span>
                <span>{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split-Screen Pinned Stage */}
      <div className="relative grid items-start lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* LEFT COLUMN: Scrolling Story Stream */}
        <div className="space-y-16 lg:space-y-32">
          {visibleApps.map((app, idx) => {
            const isActive = idx === activeIndex;
            const Icon = app.Icon;

            return (
              <div
                key={app.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                data-index={idx}
                className="relative min-h-[500px] flex flex-col justify-center rounded-[36px] border hairline bg-surface/50 p-8 sm:p-12 backdrop-blur-md transition-all duration-700"
                style={{
                  borderColor: isActive ? "rgba(255,255,255,0.2)" : undefined,
                  boxShadow: isActive ? `0 20px 50px -10px ${app.glow}` : undefined,
                }}
              >
                {/* Accent glow corner */}
                <div
                  className="pointer-events-none absolute -left-10 -top-10 h-60 w-60 rounded-full blur-[80px] transition-opacity duration-700"
                  style={{ background: app.glow, opacity: isActive ? 0.6 : 0.15 }}
                />

                <div className="relative z-10">
                  {/* Virtue & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-md"
                        style={{ background: app.accent }}
                      >
                        <Icon className="h-5 w-5 text-black" />
                      </span>
                      <span className="eyebrow">
                        {app.no} — {app.virtue}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-dim">
                      {idx + 1} / {visibleApps.length}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-8 font-display text-4xl font-medium tracking-tight sm:text-5xl text-ink">
                    {app.name}
                  </h3>
                  <p className="mt-3 font-serif text-2xl italic text-dim">{app.tagline}</p>
                  <p className="mt-6 max-w-md leading-relaxed text-dim">{app.blurb}</p>

                  {/* Feature Checklist */}
                  <ul className="my-8 grid gap-2.5 sm:grid-cols-2">
                    {app.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-dim">
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: app.accent }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Discover Link */}
                  <Link
                    to="/apps"
                    className="group inline-flex items-center gap-2 font-semibold text-ink"
                  >
                    <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                      Discover {app.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>

                  {/* Mobile-Only Phone Preview (Shown when split screen collapses on mobile) */}
                  <div className="mt-8 flex flex-col items-center justify-center lg:hidden pt-6 border-t hairline">
                    <p className="eyebrow mb-4">Live interactive preview</p>
                    <div className="scale-90 sm:scale-100">
                      <PhoneFrame testid={`app-mobile-${app.id}-phone`} appId={app.id}>
                        <app.Screen id={`mobile-${app.id}`} />
                      </PhoneFrame>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Pinned Floating Phone Stage (Desktop) */}
        <div className="sticky top-28 hidden lg:flex flex-col items-center justify-center h-[calc(100vh-140px)]">
          {/* Ambient Radial Halo */}
          <motion.div
            key={`halo-${currentApp.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[110px]"
            style={{ background: currentApp.glow }}
          />

          {/* Background Mood Texture with Soft Feathered Vignette */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.img
              key={`bg-${currentApp.id}`}
              src={currentApp.image}
              alt=""
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="h-[520px] w-[520px] max-w-[85%] max-h-[85%] object-cover rounded-full"
              style={{
                maskImage:
                  "radial-gradient(circle closest-side at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 72%, transparent 88%)",
                WebkitMaskImage:
                  "radial-gradient(circle closest-side at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 72%, transparent 88%)",
                filter: "blur(2px)",
              }}
            />
          </div>

          {/* Stage Controls Top Header */}
          <div className="relative z-10 mb-5 flex items-center justify-between w-full max-w-[340px] px-2">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full animate-pulse shadow-sm"
                style={{ background: currentApp.accent }}
              />
              <span className="font-mono text-[11px] font-semibold text-white/80">
                {currentApp.no} · {currentApp.name}
              </span>
            </div>
            <span className={`eyebrow text-[10px] ${isAppComingSoon?.(currentApp.id) ? "text-amber-400" : ""}`}>
              {isAppComingSoon?.(currentApp.id) ? "Coming soon" : "Try it — it's live"}
            </span>
          </div>

          {/* Interactive Phone Frame with Screen Transition */}
          <div className="relative z-10 transition-transform duration-700 hover:scale-[1.02]">
            <PhoneFrame testid="pinned-stage-phone" appId={currentApp.id} className="shadow-2xl shadow-black/80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentApp.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <CurrentScreen id={`pinned-${currentApp.id}`} />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>

          {/* Stage Controls Bottom Navigation */}
          <div className="relative z-10 mt-5 flex items-center justify-between w-full max-w-[340px] px-2 text-xs">
            <button
              onClick={prevApp}
              aria-label="Previous app"
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Prev</span>
            </button>

            {/* Progress Dots */}
            <div className="flex items-center gap-1.5">
              {visibleApps.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => scrollToApp(i)}
                  aria-label={`Jump to ${a.name}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextApp}
              aria-label="Next app"
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
