import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bell, CheckCircle2, Clock, Check, Sparkles, Building2 } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

const STEPS = [
  { id: 1, title: "Receipt Notice Sent", date: "May 12, 2024", done: true },
  { id: 2, title: "Biometrics Appointment", date: "Jun 24, 2024", done: true },
  { id: 3, title: "Actively Under Review", date: "Current Step", done: true, active: true },
  { id: 4, title: "Decision & Card Produced", date: "Est. 18 days", done: false },
];

export const CaseTrackerScreen = ({ id = "case-tracker" }) => {
  const [approved, setApproved] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0e1629] via-[#070b16] to-[#020408] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-blue-300">
            <Shield className="h-3 w-3" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em]">USCIS & Global Visa</p>
          </div>
          <p className="font-display text-lg font-semibold leading-tight">Case Tracker</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setNotif(!notif)}
          className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
            notif ? "border-blue-400 bg-blue-500/20 text-blue-300" : "border-white/10 bg-white/5 text-white/40"
          }`}
        >
          <Bell className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Case Receipt Card */}
      <div className="mt-2.5 rounded-2xl border border-blue-500/30 bg-white/[0.06] p-3 backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-mono text-blue-300 uppercase tracking-wider">Receipt Number</span>
          <span className="rounded bg-blue-500/20 px-1.5 py-0.5 font-mono text-[9px] text-blue-200">
            Form I-485
          </span>
        </div>

        <p className="mt-1 font-mono text-sm font-bold tracking-wider text-white">IOE-092-481-9201</p>

        {/* Dynamic Status Pill */}
        <div className="mt-2 flex items-center justify-between rounded-xl bg-black/40 p-2 border border-white/5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                approved ? "bg-emerald-400 shadow-[0_0_8px_#34D399]" : "bg-blue-400 animate-pulse"
              }`}
            />
            <span className="font-medium text-white">
              {approved ? "Case Approved & Card Ordered" : "Case Is Being Actively Reviewed"}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Step Milestone Progression */}
      <div className="mt-2.5 flex-1 rounded-2xl border border-white/10 bg-black/50 p-3 space-y-2 text-[10px] overflow-y-auto">
        <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">Case Milestones</p>

        <div className="space-y-2.5">
          {STEPS.map((s) => {
            const isCompleted = approved ? true : s.done && !s.active;
            const isCurrent = approved ? false : s.active;

            return (
              <div key={s.id} className="flex items-start gap-2.5">
                <div
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${
                    isCompleted
                      ? "bg-emerald-500 text-black"
                      : isCurrent
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {isCompleted ? "✓" : s.id}
                </div>
                <div className="flex-1 leading-tight">
                  <p className={`font-semibold ${isCompleted || isCurrent ? "text-white" : "text-white/40"}`}>
                    {s.title}
                  </p>
                  <p className="font-mono text-[8px] text-white/40">
                    {s.id === 4 && approved ? "Approved Today · Welcome to USA" : s.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[8px] text-white/50">
          <span className="flex items-center gap-1">
            <Building2 className="h-2.5 w-2.5" /> Potomac Center
          </span>
          <span>Day 114 of ~132</span>
        </div>
      </div>

      {/* Interactive Simulation Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setApproved(!approved)}
        className={`mt-2 flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-bold transition-all ${
          approved
            ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/25"
            : "bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400"
        }`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {approved ? "Approved! Tap to Revert" : "Simulate USCIS Status Update"}
      </motion.button>
    </div>
  );
};
