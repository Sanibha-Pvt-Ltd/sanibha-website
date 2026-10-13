import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Moon, Heart, Clock, Check } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

export const BabyScreen = ({ id = "baby" }) => {
  const [ml, setMl] = useState(120);
  const [lastLogged, setLastLogged] = useState("Fed 42m ago");
  const [justLogged, setJustLogged] = useState(false);

  const handleLog = (type) => {
    setLastLogged(`Logged ${type} just now`);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 1500);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#24131b] via-[#140a10] to-[#060305] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pink-300">Little Wonder</p>
          <p className="font-display text-xl font-semibold leading-tight">Baby Leo · 4m</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-pink-500/20 px-2.5 py-1 text-pink-300 border border-pink-500/30 text-[10px]">
          <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
          <span>On Schedule</span>
        </div>
      </div>

      {/* Main Interactive Bottle Feed Card */}
      <div className="mt-3 rounded-2xl border border-pink-500/20 bg-white/[0.06] p-3 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-pink-200">Bottle Feeding</span>
          <span className="font-mono text-[10px] text-white/50">{lastLogged}</span>
        </div>

        {/* Stepper Amount */}
        <div className="my-3 flex items-center justify-center gap-5">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMl((m) => Math.max(30, m - 15))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Minus className="h-4 w-4" />
          </motion.button>

          <div className="text-center">
            <motion.span
              key={ml}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="block font-display text-4xl font-bold text-white"
            >
              {ml}
            </motion.span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-pink-300">milliliters</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMl((m) => Math.min(300, m + 15))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/30"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleLog(`${ml}ml Bottle`)}
          className={`w-full rounded-xl py-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            justLogged ? "bg-emerald-500 text-white" : "bg-white/10 hover:bg-white/15 text-pink-200"
          }`}
        >
          {justLogged ? (
            <>
              <Check className="h-3.5 w-3.5" /> Logged!
            </>
          ) : (
            `Log ${ml} ml Bottle Feed`
          )}
        </motion.button>
      </div>

      {/* Quick Action Matrix */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => handleLog("Wet Diaper")}
          className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.05] p-3 text-left hover:bg-white/[0.08]"
        >
          <span className="text-lg">🧷</span>
          <div>
            <p className="font-semibold text-white">Diaper</p>
            <p className="font-mono text-[9px] text-white/50">1h ago · Wet</p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => handleLog("Nap Session")}
          className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.05] p-3 text-left hover:bg-white/[0.08]"
        >
          <Moon className="h-4 w-4 text-purple-300" />
          <div>
            <p className="font-semibold text-white">Nap</p>
            <p className="font-mono text-[9px] text-white/50">1h 45m today</p>
          </div>
        </motion.button>
      </div>

      {/* Recent Timeline */}
      <div className="mt-3 flex-1 rounded-2xl bg-black/40 p-3 border border-white/5 space-y-2 text-[10px]">
        <div className="flex items-center justify-between text-white/50">
          <span className="font-mono uppercase tracking-wider">Today's Timeline</span>
          <Clock className="h-3 w-3" />
        </div>
        <div className="space-y-1.5 text-white/80">
          <div className="flex justify-between">
            <span>🍼 120 ml formula</span>
            <span className="font-mono text-white/40">10:45 AM</span>
          </div>
          <div className="flex justify-between">
            <span>💤 Morning nap (50m)</span>
            <span className="font-mono text-white/40">11:30 AM</span>
          </div>
          <div className="flex justify-between">
            <span>🧷 Diaper change</span>
            <span className="font-mono text-white/40">1:15 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
