import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Sparkles, Plus, Trophy } from "lucide-react";
import { StatusBar } from "./PhoneFrame";
import { ease } from "@/lib/intro";

const INITIAL_HABITS = [
  { id: "mind", title: "Morning Mindfulness", time: "15 min", done: true, icon: "🧘" },
  { id: "water", title: "2.5L Hydration", time: "Daily goal", done: true, icon: "💧" },
  { id: "read", title: "Read 20 Pages", time: "Atomic Habits", done: false, icon: "📖" },
  { id: "focus", title: "Deep Work Sprint", time: "90 min", done: false, icon: "⚡" },
];

const DAYS = [
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", done: true },
  { d: "T", done: true },
  { d: "F", done: true },
  { d: "S", done: false },
  { d: "S", current: true },
];

export const HabitScreen = ({ id = "habit" }) => {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggle = (hId) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === hId ? { ...h, done: !h.done } : h))
    );
  };

  const completedCount = habits.filter((h) => h.done).length;
  const totalCount = habits.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1f0b1a] via-[#100611] to-[#050206] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pink-300">Habit Rituals</p>
          <p className="font-display text-xl font-semibold leading-tight">Today's Flow</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-pink-500/20 px-2.5 py-1 text-pink-300 border border-pink-500/30">
          <Flame className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
          <span className="font-mono text-xs font-bold">14d</span>
        </div>
      </div>

      {/* Week Calendar Strip */}
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/[0.06] p-2">
        {DAYS.map(({ d, done, current }, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] text-white/50">{d}</span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                done
                  ? "bg-pink-500 text-white"
                  : current
                  ? "border border-pink-400 bg-pink-500/30 text-pink-200"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Pill */}
      <div className="mt-3 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-transparent p-3 border border-pink-500/20">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-pink-200">
            {completedCount === totalCount ? "All done today!" : `${completedCount} of ${totalCount} completed`}
          </span>
          <span className="font-mono font-bold text-pink-300">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      </div>

      {/* Habit Items */}
      <ul className="mt-3 space-y-2 flex-1 overflow-y-auto pr-0.5">
        {habits.map((h) => (
          <motion.li
            key={h.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(h.id)}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all ${
              h.done
                ? "border-pink-500/30 bg-pink-500/10 text-white"
                : "border-white/5 bg-white/[0.05] text-white/70 hover:bg-white/[0.08]"
            }`}
          >
            <span className="text-base">{h.icon}</span>
            <div className="flex-1">
              <p className={`text-xs font-medium leading-tight ${h.done ? "line-through text-white/60" : "text-white"}`}>
                {h.title}
              </p>
              <p className="font-mono text-[9px] text-pink-300/80">{h.time}</p>
            </div>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-lg border transition-all ${
                h.done
                  ? "border-pink-400 bg-pink-500 text-white"
                  : "border-white/20 bg-transparent text-transparent"
              }`}
            >
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Bottom Status */}
      <div className="mt-2 text-center">
        <p className="font-mono text-[9px] text-white/40">Tap any item to check in</p>
      </div>
    </div>
  );
};
