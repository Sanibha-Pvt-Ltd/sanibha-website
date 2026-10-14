import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Eye,
  Gem,
  Wand2,
  Sparkle,
  Cpu,
  Zap,
  Activity,
  Waves,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";

// --- Vector Graphic 1: Distill the Core ---
const DistillGraphic = () => (
  <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-amber-500/[0.05] via-orange-500/[0.02] to-transparent border border-amber-500/15 p-4 shadow-inner">
    {/* Concentric Calibration Circles */}
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-44 w-44 rounded-full border border-amber-400/20 animate-spin" style={{ animationDuration: "40s" }} />
      <div className="absolute h-32 w-32 rounded-full border border-dashed border-amber-500/30 animate-spin" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
      <div className="absolute h-20 w-20 rounded-full bg-amber-500/15 blur-xl" />
      {/* Reticle Crosshairs */}
      <div className="absolute h-36 w-px bg-gradient-to-b from-transparent via-amber-400/25 to-transparent" />
      <div className="absolute w-36 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
    </div>

    {/* Faceted Crystal Prism */}
    <motion.div
      whileHover={{ scale: 1.12, rotate: 6 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/25 to-pink-500/20 border border-amber-400/40 shadow-xl shadow-amber-500/15 backdrop-blur-md cursor-pointer"
    >
      <svg viewBox="0 0 64 64" className="h-12 w-12 text-amber-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)]" fill="none">
        <path d="M32 6 L54 22 L32 58 L10 22 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="url(#prismGrad)" fillOpacity="0.35" />
        <path d="M10 22 L54 22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 6 L24 22 L32 58 L40 22 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />
        <defs>
          <linearGradient id="prismGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e0b" />
            <stop offset="0.5" stopColor="#ec4899" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>

    {/* Floating HUD Tags */}
    <div className="absolute left-3.5 top-3 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Noise: 0%
    </div>
    <div className="absolute right-3.5 bottom-3 flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-900 dark:text-amber-200 border border-amber-500/30 shadow-sm backdrop-blur-sm">
      Essence: 100% Pure
    </div>
  </div>
);

// --- Vector Graphic 2: Native Engineering ---
const NativeGraphic = () => (
  <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-sky-500/[0.05] via-indigo-500/[0.02] to-transparent border border-sky-500/15 p-4 shadow-inner">
    {/* Micro-Circuit Board Grid */}
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="native-circuit" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-sky-400" />
          <circle cx="14" cy="14" r="1.5" className="fill-sky-400" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#native-circuit)" />
    </svg>

    {/* Silicon Architecture Processor Core */}
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="relative z-10 flex h-24 w-28 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white border border-sky-400/50 shadow-xl shadow-sky-500/20 cursor-pointer"
    >
      <div className="flex items-center gap-1.5">
        <Cpu className="h-6 w-6 text-sky-400 animate-pulse" />
      </div>
      <span className="mt-1 font-mono text-[9px] font-black tracking-widest text-sky-300">SWIFT · METAL</span>
      <span className="text-[8px] font-mono text-white/60">64-BIT HARDWARE</span>
    </motion.div>

    {/* Floating HUD Tags */}
    <div className="absolute left-3.5 top-3 flex items-center gap-1.5 rounded-full bg-sky-500/15 px-2.5 py-1 text-[10px] font-mono font-bold text-sky-900 dark:text-sky-200 border border-sky-500/30 shadow-sm backdrop-blur-sm">
      <Zap className="h-3 w-3 text-sky-500" /> 120 FPS ProMotion
    </div>
    <div className="absolute right-3.5 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
      Render: 0.2ms
    </div>
  </div>
);

// --- Vector Graphic 3: Tactile Choreography ---
const TactileGraphic = () => (
  <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-purple-500/[0.05] via-pink-500/[0.02] to-transparent border border-purple-500/15 p-4 shadow-inner">
    {/* Expanding Harmonic Ripple Waves */}
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 rounded-full border border-purple-400/20 animate-ping" style={{ animationDuration: "3.5s" }} />
      <div className="absolute h-24 w-24 rounded-full border border-purple-500/30 animate-ping" style={{ animationDuration: "2.2s" }} />
    </div>

    {/* Spring Physics Waveform & Haptic Core */}
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="relative z-10 flex h-20 w-48 items-center justify-between rounded-full bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 px-3.5 py-2 border border-purple-400/40 shadow-xl shadow-purple-500/15 backdrop-blur-md cursor-pointer"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md">
        <Activity className="h-6 w-6 animate-pulse" />
      </div>
      <div className="flex-1 px-3">
        {/* SVG Spring Damping Sine Wave */}
        <svg viewBox="0 0 80 24" className="h-6 w-full text-purple-400" fill="none">
          <path d="M 0 12 Q 10 2, 20 12 T 40 12 T 60 12 T 80 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="flex justify-between font-mono text-[8px] font-bold text-purple-900 dark:text-purple-200">
          <span>HAPTIC</span>
          <span>432 HZ</span>
        </div>
      </div>
    </motion.div>

    {/* Floating HUD Tags */}
    <div className="absolute left-3.5 top-3 flex items-center gap-1.5 rounded-full bg-purple-500/15 px-2.5 py-1 text-[10px] font-mono font-bold text-purple-900 dark:text-purple-200 border border-purple-500/30 shadow-sm backdrop-blur-sm">
      <Waves className="h-3 w-3 text-purple-500" /> Taptic Engine™
    </div>
    <div className="absolute right-3.5 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
      Spring ζ: 0.86
    </div>
  </div>
);

// --- Vector Graphic 4: Privacy by Default ---
const PrivacyGraphic = () => (
  <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-500/[0.05] via-teal-500/[0.02] to-transparent border border-emerald-500/15 p-4 shadow-inner">
    {/* Rotating Cryptographic Shield Ring */}
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 rounded-full border border-emerald-500/20 animate-spin" style={{ animationDuration: "40s" }} />
      <div className="absolute h-28 w-28 rounded-full border border-dashed border-emerald-400/30" />
      <div className="absolute h-16 w-16 rounded-full bg-emerald-500/15 blur-xl" />
    </div>

    {/* Secure Enclave Vault Shield */}
    <motion.div
      whileHover={{ scale: 1.12, rotate: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/25 via-teal-500/25 to-emerald-600/25 border border-emerald-400/50 shadow-xl shadow-emerald-500/20 backdrop-blur-md cursor-pointer"
    >
      <ShieldCheck className="h-11 w-11 text-emerald-500 drop-shadow-[0_4px_16px_rgba(16,185,129,0.5)]" />
    </motion.div>

    {/* Floating HUD Tags */}
    <div className="absolute left-3.5 top-3 flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-500/30 shadow-sm backdrop-blur-sm">
      <Lock className="h-3 w-3 text-emerald-500" /> Secure Enclave
    </div>
    <div className="absolute right-3.5 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
      Telemetry: 0.00 KB
    </div>
  </div>
);

// --- Metadata & Visual Extras for each Step ---
const STEP_EXTRAS = [
  {
    badge: "Phase 01 · Distillation",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.16)",
    tags: ["Core Utility", "Zero Clutter", "Single Purpose"],
    Graphic: DistillGraphic,
  },
  {
    badge: "Phase 02 · Engineering",
    accent: "#0ea5e9",
    glow: "rgba(14, 165, 233, 0.16)",
    tags: ["Swift 6", "Metal 3 Shader", "120 FPS ProMotion"],
    Graphic: NativeGraphic,
  },
  {
    badge: "Phase 03 · Choreography",
    accent: "#a855f7",
    glow: "rgba(168, 85, 247, 0.16)",
    tags: ["Taptic Engine™", "Damped Springs", "Acoustic Chimes"],
    Graphic: TactileGraphic,
  },
  {
    badge: "Phase 04 · Architecture",
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.16)",
    tags: ["Secure Enclave", "AES-256 GCM", "Zero Telemetry"],
    Graphic: PrivacyGraphic,
  },
];

const DEFAULT_STEPS = [
  { n: "01", t: "Distill the core", d: "Strip every non-essential feature until only the pure, focused utility remains.", I: Eye },
  { n: "02", t: "Native engineering", d: "Handcrafted using Swift, Metal, and CoreData for instant, local responsiveness.", I: Gem },
  { n: "03", t: "Tactile choreography", d: "Calibrated haptic feedback, acoustic chimes, and smooth physical spring curves.", I: Wand2 },
  { n: "04", t: "Privacy by default", d: "On-device processing. Your files, logs, and photos never touch our servers.", I: Sparkle },
];

const Panel = ({ s, extras }) => {
  const Graphic = extras?.Graphic || DistillGraphic;
  const accent = extras?.accent || "#f59e0b";
  const glow = extras?.glow || "rgba(245, 158, 11, 0.16)";
  const badge = extras?.badge || `Phase ${s.n}`;
  const tags = extras?.tags || ["Focus", "Simplicity", "Speed"];

  return (
    <div
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-surface/90 p-7 sm:p-9 shadow-md backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        boxShadow: `0 15px 35px -10px ${glow}`,
      }}
    >
      {/* Background Ambient Radial Highlight */}
      <div
        className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full blur-[70px] opacity-25 transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: accent }}
      />

      {/* Top Header: Step Number, Badge, and Icon */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="font-display text-5xl sm:text-6xl font-semibold tracking-tighter text-slate-950 dark:text-white">
            {s.n}
          </span>
          <span className="ml-3 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10">
            {badge}
          </span>
        </div>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ borderColor: `${accent}40` }}
        >
          <s.I className="h-5 w-5" style={{ color: accent }} />
        </div>
      </div>

      {/* Center Hero Vector Stage */}
      <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
        <Graphic />
      </div>

      {/* Bottom Content: Title, Description, and Feature Tags */}
      <div className="relative z-10 mt-auto">
        <h4 className="font-serif text-3xl sm:text-4xl italic text-slate-950 dark:text-white font-normal">
          {s.t}
        </h4>
        <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
          {s.d}
        </p>

        {/* Feature Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-white/5 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/10"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Method = () => {
  const { config } = useSiteContent();
  const { method } = config;
  const ICONS = [Eye, Gem, Wand2, Sparkle];

  const steps =
    method?.steps?.map((step, idx) => ({
      n: step.no,
      t: step.title,
      d: step.desc,
      I: ICONS[idx % ICONS.length],
    })) || DEFAULT_STEPS;

  const ref = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const calc = () => {
      if (track.current) {
        setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section data-testid="method-section">
      {/* Desktop Horizontal Scroll Track */}
      <div ref={ref} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mb-10 px-10">
            <p className="eyebrow">{method?.eyebrow || "( The Sanibha method )"}</p>
            <h3 className="mt-3 font-display text-6xl font-medium tracking-tight">
              {method?.titlePart1 || "From spark to"}{" "}
              <span className="font-serif italic font-normal prism-text">
                {method?.titleHighlight || "radiance."}
              </span>
            </h3>
          </div>
          <motion.div ref={track} style={{ x }} className="flex gap-7 pl-10">
            {steps.map((s, idx) => (
              <div
                key={s.n}
                className="h-[58vh] min-h-[520px] w-[46vw] min-w-[460px] max-w-[640px] shrink-0"
              >
                <Panel s={s} extras={STEP_EXTRAS[idx % STEP_EXTRAS.length]} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Stacked Grid */}
      <div className="px-6 py-20 sm:px-10 lg:hidden">
        <p className="eyebrow">{method?.eyebrow || "( The Sanibha method )"}</p>
        <h3 className="mb-10 mt-3 font-display text-4xl font-medium tracking-tight">
          {method?.titlePart1 || "From spark to"}{" "}
          <span className="font-serif italic font-normal prism-text">
            {method?.titleHighlight || "radiance."}
          </span>
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} className="min-h-[500px]">
              <Panel s={s} extras={STEP_EXTRAS[i % STEP_EXTRAS.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
