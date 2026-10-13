import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Volume2, VolumeX, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Tv, Play, Home } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

export const RemoteScreen = ({ id = "remote" }) => {
  const [tvOn, setTvOn] = useState(true);
  const [vol, setVol] = useState(24);
  const [muted, setMuted] = useState(false);
  const [activeApp, setActiveApp] = useState("Apple TV");
  const [lastAction, setLastAction] = useState("");

  const trigger = (action) => {
    setLastAction(action);
    setTimeout(() => setLastAction(""), 700);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#180e29] via-[#0d0717] to-[#040207] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header & Power */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${tvOn ? "bg-emerald-400 shadow-[0_0_8px_#34D399]" : "bg-red-500"}`} />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-300">
              {tvOn ? "Connected" : "Standby"}
            </p>
          </div>
          <p className="font-display text-base font-semibold leading-tight">Living Room OLED</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            setTvOn(!tvOn);
            trigger(tvOn ? "Power Off" : "Power On");
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
            tvOn
              ? "border-purple-400/50 bg-purple-500/30 text-purple-200 shadow-lg shadow-purple-500/20"
              : "border-white/10 bg-white/5 text-white/40"
          }`}
        >
          <Power className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Active App Badge & Feedback banner */}
      <div className="mt-2 flex items-center justify-between rounded-xl bg-white/[0.05] px-3 py-1.5 text-[11px] border border-white/5">
        <span className="text-white/60">Source: <span className="font-bold text-white">{activeApp}</span></span>
        <span className="font-mono text-[9px] text-purple-300">
          {lastAction || (muted ? "MUTED" : `VOL ${vol}`)}
        </span>
      </div>

      {/* D-Pad Controller Wheel */}
      <div className="mt-3 relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-purple-500/30 bg-white/[0.04] backdrop-blur-md shadow-inner">
        {/* Up */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => trigger("Up")}
          className="absolute top-2 flex h-8 w-10 items-center justify-center text-white/70 hover:text-white"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>

        {/* Down */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => trigger("Down")}
          className="absolute bottom-2 flex h-8 w-10 items-center justify-center text-white/70 hover:text-white"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.button>

        {/* Left */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => trigger("Left")}
          className="absolute left-2 flex h-10 w-8 items-center justify-center text-white/70 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        {/* Right */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => trigger("Right")}
          className="absolute right-2 flex h-10 w-8 items-center justify-center text-white/70 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>

        {/* Center OK button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => trigger("SELECT")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 font-mono text-xs font-bold text-white shadow-lg shadow-purple-500/30"
        >
          OK
        </motion.button>
      </div>

      {/* Controls: Volume & Channel Rockers */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        {/* Vol Rocker */}
        <div className="flex flex-col items-center justify-between rounded-2xl bg-white/[0.06] p-1.5 border border-white/5">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              setVol((v) => Math.min(100, v + 1));
              setMuted(false);
              trigger("Vol +");
            }}
            className="p-1 hover:text-purple-300"
          >
            +
          </motion.button>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">VOL</span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              setVol((v) => Math.max(0, v - 1));
              trigger("Vol -");
            }}
            className="p-1 hover:text-purple-300"
          >
            -
          </motion.button>
        </div>

        {/* Center Shortcuts: Mute & Home */}
        <div className="flex flex-col justify-between gap-1.5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setMuted(!muted);
              trigger(muted ? "Unmuted" : "Muted");
            }}
            className={`flex flex-1 items-center justify-center rounded-xl border transition-all ${
              muted ? "border-amber-400 bg-amber-500/20 text-amber-300" : "border-white/5 bg-white/[0.05]"
            }`}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => trigger("Home")}
            className="flex flex-1 items-center justify-center rounded-xl border border-white/5 bg-white/[0.05] hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
          </motion.button>
        </div>

        {/* CH Rocker */}
        <div className="flex flex-col items-center justify-between rounded-2xl bg-white/[0.06] p-1.5 border border-white/5">
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => trigger("CH ▲")} className="p-1 hover:text-purple-300">
            ▲
          </motion.button>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">CH</span>
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => trigger("CH ▼")} className="p-1 hover:text-purple-300">
            ▼
          </motion.button>
        </div>
      </div>

      {/* Quick Launch Apps */}
      <div className="mt-2.5 flex items-center justify-between gap-1.5">
        {["Apple TV", "Netflix", "YouTube"].map((app) => (
          <motion.button
            key={app}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setActiveApp(app);
              trigger(`Opened ${app}`);
            }}
            className={`flex-1 rounded-xl py-1.5 text-[10px] font-semibold transition-all ${
              activeApp === app ? "bg-purple-500 text-white" : "bg-white/[0.06] text-white/60 hover:bg-white/10"
            }`}
          >
            {app}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
