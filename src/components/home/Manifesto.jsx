import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TEXT = "Sanibha is a name for one who is pure, radiant and beautifully resembles a bright light. Every app we ship carries that promise — fewer taps, calmer screens, and the quiet joy of a tool that simply works.";

const Word = ({ w, range, progress }) => {
  const opacity = useTransform(progress, range, [0.6, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{w}</motion.span>;
};

import { useSiteContent } from "@/context/SiteContentContext";

export const Manifesto = () => {
  const { config } = useSiteContent();
  const text = config?.manifesto?.paragraph || TEXT;
  const eyebrow = config?.manifesto?.eyebrow || "( The meaning )";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <section ref={ref} data-testid="manifesto-section" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-40">
      <p className="font-mono text-xs uppercase tracking-[0.22em] font-bold text-slate-800 dark:text-slate-200 mb-10">{eyebrow}</p>
      <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl text-slate-950 dark:text-white">
        {words.map((w, i) => (
          <Word key={i} w={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
};
