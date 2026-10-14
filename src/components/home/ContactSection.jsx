import { MaskLines, Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { RotatingBadge } from "./RotatingBadge";

export const ContactSection = () => (
  <section data-testid="home-contact-section" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
    <div className="pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--glow)] blur-[120px]" />
    <div className="relative grid gap-14 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] font-bold text-slate-800 dark:text-slate-200 mb-6">( Contact )</p>
        <MaskLines className="font-display text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl text-slate-950 dark:text-white"
          lines={["Let's make", "something", <span className="font-serif italic font-normal prism-text pr-2">bright.</span>]} />
        <Reveal className="mt-8 max-w-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed text-base">Feedback on an app, a partnership idea, or simply hello — every message lands with our team.</Reveal>
        <div className="mt-10 hidden lg:block"><RotatingBadge size="h-32 w-32" /></div>
      </div>
      <Reveal delay={0.1} className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-surface/70 p-7 backdrop-blur-xl sm:p-12 shadow-md"><ContactForm /></Reveal>
    </div>
  </section>
);
