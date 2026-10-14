import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { MaskLines } from "@/components/site/Reveal";

const QUOTES = [
  { q: "[Placeholder review] Freed up so much space in one tap — my iPhone feels new.", a: "[Reviewer name]", app: "Storage Cleaner" },
  { q: "[Placeholder review] I finally know the names of every plant on my balcony.", a: "[Reviewer name]", app: "Plant Identifier" },
  { q: "[Placeholder review] The calmest calorie app I've used. Logging takes seconds.", a: "[Reviewer name]", app: "Calorie Tracker" },
];

export const Testimonials = () => (
  <section data-testid="testimonials-section" className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <MaskLines className="font-display text-4xl font-medium tracking-tight sm:text-6xl" lines={["Kind words,", <span className="font-serif italic font-normal">softly glowing.</span>]} />
      <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-slate-800 dark:text-slate-200 rounded-full border border-slate-300 dark:border-white/15 px-3.5 py-1.5 bg-white dark:bg-surface shadow-sm">Sample copy — swap in real App Store reviews</span>
    </div>
    <div className="grid gap-5 md:grid-cols-3">
      {QUOTES.map((t, i) => (
        <motion.figure
          key={t.app}
          data-testid={`testimonial-${i}`}
          initial={{ opacity: 0, y: 50, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          whileHover={{ rotate: 0, y: -8 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className={`flex flex-col justify-between rounded-[28px] border border-slate-200 dark:border-white/10 p-8 shadow-sm ${i === 1 ? "bg-slate-900 text-white md:translate-y-10 shadow-xl" : "bg-white text-slate-900 dark:bg-surface dark:text-white"}`}
        >
          <div className="flex gap-1">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
          <blockquote className="mt-8 font-serif text-2xl leading-snug font-normal">“{t.q}”</blockquote>
          <figcaption className="mt-10 flex items-center justify-between text-sm">
            <span className="font-bold text-base">{t.a}</span>
            <span className={`font-mono text-xs uppercase tracking-[0.15em] font-semibold ${i === 1 ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>{t.app}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
);
