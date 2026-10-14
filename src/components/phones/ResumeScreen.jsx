import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, FileCheck, ArrowUpRight, Award, RefreshCw } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

export const ResumeScreen = ({ id = "resume" }) => {
  const [enhanced, setEnhanced] = useState(false);
  const [role, setRole] = useState("Staff Eng");
  const [atsScore, setAtsScore] = useState(82);

  const handleEnhance = () => {
    setEnhanced(true);
    setAtsScore(96);
  };

  const handleReset = () => {
    setEnhanced(false);
    setAtsScore(82);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0a1e16] via-[#05110c] to-[#020503] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <Award className="h-3 w-3" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em]">ATS Optimizer</p>
          </div>
          <p className="font-display text-lg font-semibold leading-tight">AI Resume Studio</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-emerald-300 border border-emerald-500/30 text-[10px]">
          <span className="font-mono font-bold">Score {atsScore}%</span>
        </div>
      </div>

      {/* Target Role Selector */}
      <div className="mt-2.5 flex items-center gap-1.5">
        {["Staff Eng", "Product Lead", "Design Dir"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`flex-1 rounded-xl py-1 text-[9px] font-semibold transition-all ${
              role === r
                ? "bg-emerald-500 text-black font-bold"
                : "bg-white/[0.05] text-white/60 hover:bg-white/10"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Live Resume Card Preview */}
      <div className="mt-2.5 flex-1 rounded-2xl border border-emerald-500/20 bg-white/[0.08] p-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div>
              <p className="text-xs font-bold text-white">Alex Morgan</p>
              <p className="font-mono text-[9px] text-emerald-300">{role} · Silicon Valley, CA</p>
            </div>
            <FileCheck className="h-4 w-4 text-emerald-400" />
          </div>

          <div className="mt-2.5 space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">Work Experience</p>

            <div className="rounded-xl bg-black/40 p-2.5 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-white">Senior Lead Engineer</span>
                <span className="font-mono text-[8px] text-white/40">2023 – Present</span>
              </div>

              {/* Dynamic Enhanced Bullet */}
              <motion.div
                key={enhanced ? "enhanced" : "raw"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-2 text-[10px] leading-relaxed transition-all ${
                  enhanced
                    ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
                    : "bg-white/5 text-white/70"
                }`}
              >
                {enhanced ? (
                  <>
                    <span className="font-bold text-emerald-300">✓ AI Impact Polished: </span>
                    Spearheaded 12-engineer distributed squad re-architecting data pipeline; reduced API latency by 48% and scaled throughput to 10M daily events.
                  </>
                ) : (
                  "Managed backend engineering team and implemented services to improve database speeds."
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ATS Metric Bar */}
        <div className="rounded-xl bg-black/50 p-2 border border-white/10 text-[9px]">
          <div className="flex justify-between text-white/60 mb-1">
            <span>Keywords matched (FAANG filter)</span>
            <span className="font-mono text-emerald-300 font-bold">{enhanced ? "18 of 18" : "11 of 18"}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-emerald-400"
              animate={{ width: enhanced ? "100%" : "60%" }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Transform Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={enhanced ? handleReset : handleEnhance}
        className={`mt-2 flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-bold transition-all ${
          enhanced
            ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            : "bg-emerald-400 text-black shadow-lg shadow-emerald-400/25 hover:bg-emerald-300"
        }`}
      >
        {enhanced ? (
          <>
            <RefreshCw className="h-3.5 w-3.5" /> Revert to Original
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5 fill-black" /> Transform Bullet with AI
          </>
        )}
      </motion.button>
    </div>
  );
};
