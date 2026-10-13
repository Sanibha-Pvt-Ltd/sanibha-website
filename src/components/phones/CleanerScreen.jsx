import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Images, Film, Database, Camera } from "lucide-react";
import { StatusBar } from "./PhoneFrame";
import { ease } from "@/lib/intro";

const ITEMS = [
  { n: "Duplicate photos", s: 3.2, I: Images },
  { n: "Large videos", s: 6.8, I: Film },
  { n: "App cache", s: 2.1, I: Database },
  { n: "Screenshots", s: 1.4, I: Camera },
];

export const CleanerScreen = ({ id = "cleaner" }) => {
  const [state, setState] = useState("idle");
  const used = state === "done" ? 49 : 86;

  useEffect(() => {
    if (state !== "cleaning") return undefined;
    const t = setTimeout(() => setState("done"), 1700);
    return () => clearTimeout(t);
  }, [state]);

  const onTap = () => setState((s) => (s === "idle" ? "cleaning" : s === "done" ? "idle" : s));

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0c1838] via-[#070b1c] to-[#04050c] px-4 pb-5 pt-11 text-white">
      <StatusBar />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300">iPhone storage</p>
      <div className="mt-1 flex items-end justify-between">
        <motion.span key={used} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-semibold">{used}%</motion.span>
        <span className="mb-1.5 text-[11px] text-white/70">of 128 GB used</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-500 to-indigo-500" animate={{ width: `${used}%` }} transition={{ duration: 1.4, ease }} />
      </div>
      <ul className="mt-5 space-y-2">
        {ITEMS.map(({ n, s, I }, i) => (
          <motion.li key={n} animate={{ opacity: state === "done" ? 0.45 : 1, x: state === "cleaning" ? [0, 6, 0] : 0 }} transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3 py-2.5 text-[12px]">
            <I className="h-3.5 w-3.5 text-sky-300" />
            <span className="flex-1">{n}</span>
            <span className="font-mono text-sky-100">{state === "done" ? "0.0" : s.toFixed(1)} GB</span>
          </motion.li>
        ))}
      </ul>
      <button data-testid={`${id}-demo-btn`} onClick={onTap}
        className="relative mt-auto flex items-center justify-center gap-2 overflow-hidden rounded-full bg-sky-400 py-3 text-sm font-bold text-[#04050c] transition-transform active:scale-95">
        {state === "cleaning" && <motion.span className="absolute inset-y-0 left-0 bg-white/50" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.7 }} />}
        <span className="relative flex items-center gap-2">
          {state === "idle" && (<><Sparkles className="h-4 w-4" /> Free up 13.5 GB</>)}
          {state === "cleaning" && "Cleaning…"}
          {state === "done" && (<><Check className="h-4 w-4" /> All clear · tap to reset</>)}
        </span>
      </button>
    </div>
  );
};
