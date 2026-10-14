import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { MaskLines } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import { PhoneFrame } from "@/components/phones/PhoneFrame";
import { CleanerScreen } from "@/components/phones/CleanerScreen";
import { BabyScreen } from "@/components/phones/BabyScreen";
import { ResumeScreen } from "@/components/phones/ResumeScreen";
import { HeroCursor } from "./HeroCursor";
import { RotatingBadge } from "./RotatingBadge";
import { useIntro, easeOut } from "@/lib/intro";
import { useSiteContent } from "@/context/SiteContentContext";

// The 3 Hero Applications
const HERO_APPS = [
  {
    id: "cleaner",
    name: "Phone Cleaner",
    badge: "Storage",
    Screen: CleanerScreen,
    testid: "hero-phone-cleaner",
    screenId: "hero-cleaner",
  },
  {
    id: "baby",
    name: "Baby Tracker",
    badge: "Milestones",
    Screen: BabyScreen,
    testid: "hero-phone-baby",
    screenId: "hero-baby",
  },
  {
    id: "resume",
    name: "AI Resume",
    badge: "Career",
    Screen: ResumeScreen,
    testid: "hero-phone-resume",
    screenId: "hero-resume",
  },
];

// Physical 3D Slot Coordinate Specifications
const SLOT_CONFIGS = {
  center: {
    x: 149,
    y: 0,
    rotateZ: 0,
    z: 60,
    scale: 1,
    opacity: 1,
    zIndex: 30,
  },
  left: {
    x: 0,
    y: 48,
    rotateZ: -9,
    z: -80,
    scale: 0.94,
    opacity: 0.88,
    zIndex: 10,
  },
  right: {
    x: 298,
    y: 64,
    rotateZ: 9,
    z: -80,
    scale: 0.94,
    opacity: 0.88,
    zIndex: 10,
  },
};

// Calculates slot assignment: diff 0 = center, diff 1 = left, diff 2 = right
const getSlotName = (appIndex, activeIndex) => {
  const diff = (appIndex - activeIndex + 3) % 3;
  if (diff === 0) return "center";
  if (diff === 1) return "left";
  return "right";
};

const PhoneStack = ({
  mx,
  my,
  scrollY,
  activeIndex,
  onSelectApp,
  isPaused,
  setIsPaused,
}) => {
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 });
  const yParallax = useTransform(scrollY, [0, 800], [0, 45]);

  return (
    <motion.div
      style={{ y: yParallax, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative h-[600px] w-[560px]"
    >
      {HERO_APPS.map((app, index) => {
        const slotName = getSlotName(index, activeIndex);
        const slot = SLOT_CONFIGS[slotName];
        const isCenter = slotName === "center";
        const ScreenComponent = app.Screen;

        return (
          <motion.div
            key={app.id}
            animate={{
              x: slot.x,
              y: slot.y,
              z: slot.z,
              rotateZ: slot.rotateZ,
              scale: slot.scale,
              opacity: slot.opacity,
              zIndex: slot.zIndex,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className={`absolute left-0 top-0 select-none ${
              isCenter ? "cursor-default" : "cursor-pointer group"
            }`}
            onClick={() => {
              if (!isCenter) {
                onSelectApp(index);
              }
            }}
            onMouseEnter={() => {
              if (isCenter) setIsPaused(true);
            }}
            onMouseLeave={() => {
              if (isCenter) setIsPaused(false);
            }}
          >
            <div className="relative">
              <PhoneFrame
                testid={app.testid}
                className={`transition-all duration-500 ${
                  isCenter
                    ? "shadow-2xl shadow-black/60 ring-1 ring-white/10"
                    : "group-hover:brightness-110 pointer-events-none"
                }`}
              >
                <ScreenComponent id={app.screenId} />
              </PhoneFrame>

              {/* Hover focus indicator on background phones */}
              {!isCenter && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="rounded-full bg-black/85 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md border border-white/20 shadow-xl">
                    Focus app
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const Hero = () => {
  const { done } = useIntro();
  const { config } = useSiteContent();
  const { hero } = config;
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -140]);

  // Place switching state: 0 = Cleaner, 1 = Baby, 2 = Resume
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch places every 20 seconds
  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_APPS.length);
    }, 20000); // 20 seconds
    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleSelectApp = (index) => {
    setActiveIndex(index);
    setIsPaused(false);
  };

  const fade = (d) => ({
    initial: { opacity: 0, y: 20 },
    animate: done ? { opacity: 1, y: 0 } : {},
    transition: { delay: d, duration: 1, ease: easeOut },
  });

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      data-testid="hero-section"
      className="relative min-h-screen overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:pt-36"
      style={{ perspective: 1400 }}
    >
      <HeroCursor parent={ref} />
      <div className="rays pointer-events-none absolute -right-[20%] top-[-10%] h-[1300px] w-[1300px]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[var(--glow)] blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Left Column: Typography & CTAs */}
        <motion.div style={{ y: textY }} className="relative z-10">
          <motion.p {...fade(0.1)} className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            {hero.eyebrow}
          </motion.p>
          <MaskLines
            as="h1"
            play={done}
            delay={0.15}
            testid="hero-heading"
            className="font-display text-[3.1rem] font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[6.6rem]"
            lines={[
              hero.headingPart1,
              <span key="highlight" className="font-serif font-normal italic prism-text pr-2">
                {hero.headingHighlight}
              </span>,
              hero.headingPart2,
            ]}
          />
          <motion.p {...fade(0.7)} className="mt-8 max-w-md text-base leading-relaxed text-dim sm:text-lg">
            {hero.description}
          </motion.p>
          <motion.div {...fade(0.85)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                to="/apps"
                data-testid="hero-explore-apps-btn"
                className="group flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 font-semibold text-canvas"
              >
                {hero.ctaPrimaryText}
                <span className="flex h-8 w-8 items-center justify-center rounded-full prism-bg text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Magnetic>
            <Link
              to="/about"
              data-testid="hero-about-link"
              className="border-b border-ink/30 pb-0.5 text-sm font-semibold transition-colors hover:border-ink"
            >
              {hero.ctaSecondaryText}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Revolving Phone Stack (Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1.4, ease: easeOut }}
          className="relative hidden flex-col items-center justify-center lg:flex"
        >
          <PhoneStack
            mx={mx}
            my={my}
            scrollY={scrollY}
            activeIndex={activeIndex}
            onSelectApp={handleSelectApp}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />

          {/* 20-Second Carousel Switcher Controls */}
          <div className="mt-6 flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-1 rounded-full border hairline bg-ink/[0.04] p-1.5 backdrop-blur-md">
              {HERO_APPS.map((app, idx) => {
                const isCurrent = activeIndex === idx;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleSelectApp(idx)}
                    className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isCurrent
                        ? "bg-ink text-canvas shadow-md"
                        : "text-dim hover:text-ink hover:bg-ink/[0.03]"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-60">0{idx + 1}</span>
                    <span>{app.name}</span>
                    {isCurrent && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 20-Second Progress Line */}
            <div className="flex items-center gap-3 text-xs text-dim">
              <div className="relative h-1 w-28 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  key={`${activeIndex}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "0%" : "100%" }}
                  transition={{ duration: 20, ease: "linear" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500"
                />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-dim">
                {isPaused ? "Paused (hovered)" : "20s cycle"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mobile View: Synchronized 20-Second Active App */}
        <motion.div {...fade(0.6)} className="flex flex-col items-center justify-center lg:hidden">
          <div className="relative h-[550px] w-[270px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {HERO_APPS.map((app, idx) => {
                if (idx !== activeIndex) return null;
                const ScreenComponent = app.Screen;
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                    animate={{ opacity: 1, scale: 0.9, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="absolute"
                  >
                    <PhoneFrame testid="hero-phone-mobile">
                      <ScreenComponent id={`hero-mobile-${app.id}`} />
                    </PhoneFrame>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile pagination dots */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {HERO_APPS.map((app, idx) => (
                <button
                  key={app.id}
                  onClick={() => handleSelectApp(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === idx ? "w-7 bg-ink" : "w-2 bg-ink/30"
                  }`}
                  aria-label={app.name}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-dim">
              {HERO_APPS[activeIndex].name} · 20s auto-switch
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-6 hidden items-center gap-3 sm:left-10 md:flex">
        <RotatingBadge />
        <span className="eyebrow flex items-center gap-2">
          Scroll <ArrowDown className="h-3 w-3 animate-bounce" />
        </span>
      </div>
    </section>
  );
};
