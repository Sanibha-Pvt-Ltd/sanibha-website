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
    Screen: CleanerScreen,
    testid: "hero-phone-cleaner",
    screenId: "hero-cleaner",
  },
  {
    id: "baby",
    name: "Baby Tracker",
    Screen: BabyScreen,
    testid: "hero-phone-baby",
    screenId: "hero-baby",
  },
  {
    id: "resume",
    name: "AI Resume",
    Screen: ResumeScreen,
    testid: "hero-phone-resume",
    screenId: "hero-resume",
  },
];

// True 3D Amphitheater Slot Coordinates
const SLOT_CONFIGS = {
  center: {
    x: 0,
    y: 0,
    z: 70,
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
    dim: 0,
  },
  left: {
    x: -175,
    y: 18,
    z: -110,
    rotateY: 26,
    rotateX: 2,
    rotateZ: -2,
    scale: 0.88,
    opacity: 0.85,
    dim: 0.35,
  },
  right: {
    x: 175,
    y: 18,
    z: -110,
    rotateY: -26,
    rotateX: 2,
    rotateZ: 2,
    scale: 0.88,
    opacity: 0.85,
    dim: 0.35,
  },
};

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
  setIsPaused,
}) => {
  // Gentle, dampened 3D tilt
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 60, damping: 25 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 25 });
  const yParallax = useTransform(scrollY, [0, 800], [0, 45]);

  return (
    <motion.div
      style={{
        y: yParallax,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[580px] w-[560px]"
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
              rotateX: slot.rotateX,
              rotateY: slot.rotateY,
              rotateZ: slot.rotateZ,
              scale: slot.scale,
              opacity: slot.opacity,
            }}
            transition={{
              duration: 1.35,
              ease: [0.16, 1, 0.3, 1], // Smooth exponential Apple deceleration
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
            className={`absolute left-1/2 top-4 -ml-[131px] select-none ${
              isCenter ? "cursor-default z-30" : "cursor-pointer z-10 group"
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
                className={
                  isCenter
                    ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
                    : "shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] pointer-events-none"
                }
              >
                <ScreenComponent id={app.screenId} />
              </PhoneFrame>

              {/* True 3D Depth Shadow Falloff (No filter repaints, 100% GPU composited) */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[48px] bg-black transition-opacity duration-700"
                style={{ opacity: slot.dim }}
              />

              {/* Hover indicator on background phones */}
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
    }, 20000); // exactly 20 seconds
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

        {/* Right Column: True 3D Revolving Phone Amphitheater (Desktop) - Controls & Bars Removed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1.4, ease: easeOut }}
          className="relative hidden items-center justify-center lg:flex"
        >
          <PhoneStack
            mx={mx}
            my={my}
            scrollY={scrollY}
            activeIndex={activeIndex}
            onSelectApp={handleSelectApp}
            setIsPaused={setIsPaused}
          />
        </motion.div>

        {/* Mobile View: Synchronized 20-Second Active App (Clean, no bars/dots) */}
        <motion.div {...fade(0.6)} className="flex items-center justify-center lg:hidden">
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
