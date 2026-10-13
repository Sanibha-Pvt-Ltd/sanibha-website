import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { StatusBar } from "./PhoneFrame";
import { ease } from "@/lib/intro";

const MEALS = [["Breakfast", 420], ["Lunch", 640], ["Snack", 180], ["Dinner", 560]];
const GOAL = 2000;
const R = 64;
const C = 2 * Math.PI * R;

export const CalorieScreen = ({ id = "calorie" }) => {
  const [logged, setLogged] = useState(["Breakfast"]);
  const total = MEALS.filter(([m]) => logged.includes(m)).reduce((a, [, k]) => a + k, 0);
  const pct = Math.min(1, total / GOAL);
  const toggle = (m) => setLogged((l) => (l.includes(m) ? l.filter((x) => x !== m) : [...l, m]));
  const macros = [["Protein", "bg-rose-400", 0.3], ["Carbs", "bg-amber-300", 0.45], ["Fat", "bg-sky-300", 0.25]];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1d1206] via-[#0d0905] to-[#050403] px-4 pb-4 pt-11 text-white">
      <StatusBar />
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">Today</p>
      <div className="relative mx-auto mt-2 h-40 w-40">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id={`cal-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FCD34D" /><stop offset="1" stopColor="#F43F5E" /></linearGradient>
          </defs>
          <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12" />
          <motion.circle cx="80" cy="80" r={R} fill="none" stroke={`url(#cal-${id})`} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={C} animate={{ strokeDashoffset: C * (1 - pct) }} transition={{ duration: 1, ease }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span key={total} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-3xl font-semibold">{total}</motion.span>
          <span className="text-[10px] text-white/70">of {GOAL} kcal</span>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {macros.map(([n, c, w]) => (
          <div key={n} className="flex items-center gap-2 text-[10px]">
            <span className="w-11 text-white/75">{n}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div className={`h-full rounded-full ${c}`} animate={{ width: `${pct * w * 200}%` }} transition={{ duration: 1, ease }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        {MEALS.map(([m, k]) => {
          const on = logged.includes(m);
          return (
            <button key={m} data-testid={`${id}-meal-${m.toLowerCase()}`} onClick={() => toggle(m)}
              className={`flex items-center justify-between rounded-2xl px-3 py-2 text-[11px] transition-colors ${on ? "bg-amber-300 text-[#1d1206]" : "bg-white/[0.08] text-white"}`}>
              <span className="text-left font-semibold leading-tight">{m}<span className="block font-mono text-[9px] opacity-70">{k} kcal</span></span>
              {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
