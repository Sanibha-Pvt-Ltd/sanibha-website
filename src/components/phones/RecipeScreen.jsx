import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Utensils, Sparkles, Plus, Minus, Timer } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

const BASE_INGREDIENTS = [
  { id: "pasta", name: "Artisanal Rigatoni", baseQty: 250, unit: "g" },
  { id: "garlic", name: "Garlic, thinly shaved", baseQty: 3, unit: "cloves" },
  { id: "cream", name: "Heavy cream", baseQty: 120, unit: "ml" },
  { id: "spinach", name: "Baby spinach & sundried tomatoes", baseQty: 80, unit: "g" },
];

export const RecipeScreen = ({ id = "recipe" }) => {
  const [servings, setServings] = useState(2);
  const [checked, setChecked] = useState(["pasta"]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(720); // 12 minutes

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const toggle = (ingId) => {
    setChecked((prev) =>
      prev.includes(ingId) ? prev.filter((x) => x !== ingId) : [...prev, ingId]
    );
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#24140b] via-[#120a06] to-[#050302] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="h-3 w-3" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em]">Ad-Free Import</p>
          </div>
          <p className="font-display text-lg font-semibold leading-tight">Tuscan Rigatoni</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-300 border border-amber-500/30 text-[10px]">
          <Clock className="h-3 w-3" />
          <span>25 min</span>
        </div>
      </div>

      {/* Import Source URL pill */}
      <div className="mt-2 rounded-xl bg-white/[0.05] px-2.5 py-1.5 text-[10px] text-white/50 border border-white/5 flex items-center justify-between font-mono truncate">
        <span className="truncate">nytimes.com/cooking/rigatoni</span>
        <span className="text-emerald-400 font-bold ml-1">CLEAN</span>
      </div>

      {/* Servings Stepper */}
      <div className="mt-2.5 flex items-center justify-between rounded-2xl bg-white/[0.06] p-2.5 border border-amber-500/20">
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-amber-300" />
          <span className="text-xs font-medium">Servings</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setServings((s) => Math.max(1, s - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <Minus className="h-3 w-3" />
          </motion.button>
          <span className="font-mono text-xs font-bold text-amber-300">{servings} people</span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setServings((s) => Math.min(8, s + 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black font-bold"
          >
            <Plus className="h-3 w-3" />
          </motion.button>
        </div>
      </div>

      {/* Ingredient Checklist */}
      <div className="mt-2.5 flex-1 space-y-1.5 overflow-y-auto pr-0.5">
        <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 mb-1">
          Ingredients ({checked.length}/{BASE_INGREDIENTS.length})
        </p>
        {BASE_INGREDIENTS.map((ing) => {
          const isDone = checked.includes(ing.id);
          const scaledQty = Math.round((ing.baseQty * servings) / 2);
          return (
            <motion.div
              key={ing.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(ing.id)}
              className={`flex cursor-pointer items-center justify-between rounded-xl p-2 text-xs border transition-all ${
                isDone
                  ? "border-amber-500/30 bg-amber-500/10 text-white/50"
                  : "border-white/5 bg-white/[0.04] text-white hover:bg-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-md border text-[10px] ${
                    isDone
                      ? "border-amber-400 bg-amber-400 text-black font-bold"
                      : "border-white/20 bg-transparent"
                  }`}
                >
                  {isDone && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
                <span className={`text-xs ${isDone ? "line-through text-white/40" : "text-white"}`}>
                  {ing.name}
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber-200">
                {scaledQty} {ing.unit}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Integrated Cook Timer */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setTimerRunning(!timerRunning)}
        className={`mt-2 flex items-center justify-center gap-2 rounded-2xl py-2.5 text-xs font-bold transition-all ${
          timerRunning
            ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30"
            : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
        }`}
      >
        <Timer className="h-3.5 w-3.5" />
        {timerRunning ? `Simmering: ${formatTimer(seconds)} (Tap to pause)` : "Start Pasta Simmer Timer (12:00)"}
      </motion.button>
    </div>
  );
};
