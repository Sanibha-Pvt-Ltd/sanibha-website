import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, AlarmClock, Sparkles, Waves, Power } from "lucide-react";
import { StatusBar } from "./PhoneFrame";
import { ease } from "@/lib/intro";

const STAGES = [
  { name: "Deep", time: "1h 54m", pct: 24, color: "bg-indigo-500" },
  { name: "REM", time: "2h 12m", pct: 28, color: "bg-purple-400" },
  { name: "Core", time: "3h 48m", pct: 44, color: "bg-sky-400" },
  { name: "Awake", time: "16m", pct: 4, color: "bg-amber-400" },
];

export const SleepScreen = ({ id = "sleep" }) => {
  const [tracking, setTracking] = useState(false);
  const score = tracking ? 94 : 91;

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#090b20] via-[#050612] to-[#020208] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300">Circadian Cycle</p>
          <p className="font-display text-xl font-semibold leading-tight">Last Night's Sleep</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-2.5 py-1 text-indigo-300 border border-indigo-500/30 text-[10px]">
          <Moon className="h-3 w-3" />
          <span>7h 54m</span>
        </div>
      </div>

      {/* Sleep Score Gauge */}
      <div className="mt-3 relative mx-auto flex h-36 w-36 items-center justify-center">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
          <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <motion.circle
            cx="70"
            cy="70"
            r="56"
            fill="none"
            stroke="url(#sleep-grad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 56}
            animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - score / 100) }}
            transition={{ duration: 1.2, ease }}
          />
          <defs>
            <linearGradient id="sleep-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-3xl font-bold tracking-tight text-white"
          >
            {score}
          </motion.span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-300">Optimal Rest</span>
        </div>
      </div>

      {/* Sleep Hypnogram Stages */}
      <div className="mt-2 rounded-2xl border border-indigo-500/20 bg-white/[0.05] p-3 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-white/90">Sleep Stages</span>
          <span className="font-mono text-[10px] text-indigo-300">88% Efficiency</span>
        </div>

        {/* Stacked Stage Bar */}
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/10 gap-0.5">
          {STAGES.map((s) => (
            <div key={s.name} className={`${s.color} h-full`} style={{ width: `${s.pct}%` }} />
          ))}
        </div>

        {/* Breakdown Tags */}
        <div className="mt-2.5 grid grid-cols-4 gap-1 text-[9px]">
          {STAGES.map((s) => (
            <div key={s.name} className="flex flex-col items-center rounded-lg bg-black/30 py-1 border border-white/5">
              <span className="text-white/60">{s.name}</span>
              <span className="font-mono font-bold text-white">{s.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Alarm Card */}
      <div className="mt-2.5 flex items-center justify-between rounded-2xl bg-white/[0.05] p-2.5 border border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
            <AlarmClock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold">Smart Wake: 7:15 AM</p>
            <p className="font-mono text-[9px] text-white/50">Gentle acoustic fade in light sleep</p>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
      </div>

      {/* Interactive Sleep Session Toggle */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setTracking(!tracking)}
        className={`mt-auto flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all ${
          tracking
            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 animate-pulse"
            : "bg-indigo-500 text-white hover:bg-indigo-400"
        }`}
      >
        <Power className="h-3.5 w-3.5" />
        {tracking ? "Recording Sleep… Tap to Stop" : "Start Sleep Session"}
      </motion.button>
    </div>
  );
};
