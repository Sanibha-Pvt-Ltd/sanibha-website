import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  // Precise scroll spy to keep activeIndex in sync with left story stream
  useEffect(() => {
    if (visibleApps.length === 0) return;

    const updateActiveByPosition = () => {
      const centerY = window.innerHeight * 0.45; // Eye-level line
      let closestIdx = -1;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1) {
        setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveByPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveByPosition();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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
          className="font-display text-4xl font-medium leading-[1] tracking-tight sm:text-6xl lg:text-7xl text-slate-950 dark:text-white"
          lines={[`${visibleApps.length} apps.`, <span className="font-serif italic font-normal">One light.</span>]}
        />
        <Reveal className="max-w-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-base">
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
                className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950 shadow-md"
                    : "border-slate-300 bg-white text-slate-800 hover:border-slate-500 hover:bg-slate-50 dark:border-white/15 dark:bg-surface dark:text-white dark:hover:border-white/30"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full transition-transform group-hover:scale-125 shrink-0"
                  style={{ background: app.accent }}
                />
                <span className={`font-mono text-[10px] font-bold ${isActive ? "text-white/90 dark:text-black/80" : "text-slate-700 dark:text-slate-300"}`}>{app.no}</span>
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
                className="relative min-h-[500px] flex flex-col justify-center rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-surface/90 p-8 sm:p-12 backdrop-blur-md transition-all duration-700 shadow-md"
                style={{
                  borderColor: isActive ? "rgba(15, 23, 42, 0.35)" : undefined,
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
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                        {app.no} — {app.virtue}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                      {idx + 1} / {visibleApps.length}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-8 font-display text-4xl font-medium tracking-tight sm:text-5xl text-slate-950 dark:text-white">
                    {app.name}
                  </h3>
                  <p className="mt-3 font-serif text-2xl sm:text-3xl italic text-slate-900 dark:text-slate-100 font-normal">
                    {app.tagline}
                  </p>
                  <p className="mt-6 max-w-md leading-relaxed text-slate-700 dark:text-slate-300 text-base font-normal">
                    {app.blurb}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="my-8 grid gap-2.5 sm:grid-cols-2">
                    {app.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: app.accent }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Discover Link */}
                  <Link
                    to="/apps"
                    className="group inline-flex items-center gap-2 font-bold text-slate-950 dark:text-white"
                  >
                    <span className="border-b-2 border-slate-900 dark:border-white pb-0.5 transition-colors group-hover:border-indigo-500">
                      Discover {app.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>

                  {/* Mobile-Only Phone Preview (Shown when split screen collapses on mobile) */}
                  <div className="mt-8 flex flex-col items-center justify-center lg:hidden pt-6 border-t border-slate-200 dark:border-white/10">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-slate-800 dark:text-slate-200 mb-4">Live interactive preview</p>
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
                className="h-2.5 w-2.5 rounded-full animate-pulse shadow-sm"
                style={{ background: currentApp.accent }}
              />
              <span className="font-mono text-xs font-bold text-slate-950 dark:text-white tracking-wide">
                {currentApp.no} · {currentApp.name}
              </span>
            </div>
            <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
              isAppComingSoon?.(currentApp.id)
                ? "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700"
                : "bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700"
            }`}>
              {isAppComingSoon?.(currentApp.id) ? "Coming soon" : "Try it — it's live"}
            </span>
          </div>

          {/* Interactive Phone Frame with Screen Transition */}
          <div className="relative z-10 transition-transform duration-700 hover:scale-[1.02]">
            <PhoneFrame testid="pinned-stage-phone" appId={currentApp.id} className="shadow-2xl shadow-black/80">
              <motion.div
                key={currentApp.id}
                initial={{ opacity: 0.7, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-full w-full"
              >
                <CurrentScreen id={`pinned-${currentApp.id}`} />
              </motion.div>
            </PhoneFrame>
          </div>

          {/* Redesigned Floating Dynamic Island Navigation Capsule */}
          <div className="relative z-10 mt-6 flex items-center justify-between w-full max-w-[340px] rounded-full border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-surface/90 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl">
            {/* Prev Button */}
            <button
              onClick={prevApp}
              aria-label="Previous app"
              data-testid="stage-prev-btn"
              className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 active:scale-90"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Center Dynamic Scrubber & Index */}
            <div className="flex flex-col items-center justify-center px-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="h-2 w-2 rounded-full shrink-0 transition-colors duration-500 shadow-sm"
                  style={{ background: currentApp.accent }}
                />
                <span className="font-mono text-xs font-bold text-slate-950 dark:text-white tracking-wider">
                  {String(activeIndex + 1).padStart(2, "0")}{" "}
                  <span className="text-slate-400 dark:text-slate-500 font-normal">
                    / {String(visibleApps.length).padStart(2, "0")}
                  </span>
                </span>
                <span className="text-slate-300 dark:text-white/20 text-xs">·</span>
                <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[110px]">
                  {currentApp.name}
                </span>
              </div>

              {/* Dynamic Interactive Progress Scrubber Bar */}
              <div
                className="relative h-1.5 w-full max-w-[170px] rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  const targetIdx = Math.min(visibleApps.length - 1, Math.floor(ratio * visibleApps.length));
                  scrollToApp(targetIdx);
                }}
                title="Click to jump to app"
              >
                <motion.div
                  className="h-full rounded-full transition-colors duration-500"
                  style={{ background: currentApp.accent }}
                  animate={{ width: `${((activeIndex + 1) / visibleApps.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                />
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextApp}
              aria-label="Next app"
              data-testid="stage-next-btn"
              className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 active:scale-90"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
