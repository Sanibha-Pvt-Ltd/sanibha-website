import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Gem, Wand2, Sparkle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const STEPS = [
  { n: "01", t: "Observe", d: "We start with an everyday friction — a full phone, an unknown plant, a forgotten meal.", I: Eye },
  { n: "02", t: "Distill", d: "We strip the idea down to its purest form until only what matters remains.", I: Gem },
  { n: "03", t: "Polish", d: "Motion, haptics and typography are tuned until every tap feels effortless.", I: Wand2 },
  { n: "04", t: "Illuminate", d: "We ship, listen and refine — so every update makes the app a little brighter.", I: Sparkle },
];

const Panel = ({ s }) => (
  <div className="group flex h-full flex-col justify-between rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-surface p-8 sm:p-10 shadow-sm">
    <div className="flex items-start justify-between">
      <span className="font-display text-7xl font-semibold tracking-tighter outline-text sm:text-8xl">{s.n}</span>
      <s.I className="h-8 w-8 text-slate-900 dark:text-white transition-transform duration-700 group-hover:rotate-180" />
    </div>
    <div>
      <h4 className="font-serif text-5xl italic text-slate-950 dark:text-white">{s.t}</h4>
      <p className="mt-4 max-w-sm leading-relaxed text-slate-700 dark:text-slate-300 text-base font-normal">{s.d}</p>
    </div>
  </div>
);

import { useSiteContent } from "@/context/SiteContentContext";

export const Method = () => {
  const { config } = useSiteContent();
  const { method } = config;
  const ICONS = [Eye, Gem, Wand2, Sparkle];

  const steps = method?.steps?.map((step, idx) => ({
    n: step.no,
    t: step.title,
    d: step.desc,
    I: ICONS[idx % ICONS.length],
  })) || STEPS;

  const ref = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const calc = () => { if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80)); };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section data-testid="method-section">
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
          <motion.div ref={track} style={{ x }} className="flex gap-6 pl-10">
            {steps.map((s) => <div key={s.n} className="h-[52vh] w-[42vw] shrink-0"><Panel s={s} /></div>)}
          </motion.div>
        </div>
      </div>
      <div className="px-6 py-20 sm:px-10 lg:hidden">
        <p className="eyebrow">{method?.eyebrow || "( The Sanibha method )"}</p>
        <h3 className="mb-10 mt-3 font-display text-4xl font-medium tracking-tight">
          {method?.titlePart1 || "From spark to"}{" "}
          <span className="font-serif italic font-normal prism-text">
            {method?.titleHighlight || "radiance."}
          </span>
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => <Reveal key={s.n} delay={i * 0.05} className="h-80"><Panel s={s} /></Reveal>)}
        </div>
      </div>
    </section>
  );
};
