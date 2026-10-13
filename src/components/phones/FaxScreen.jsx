import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, FileText, ShieldCheck, RefreshCw, Radio } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

export const FaxScreen = ({ id = "fax" }) => {
  const [status, setStatus] = useState("idle"); // idle | dialing | sending | sent
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "dialing") {
      const t = setTimeout(() => setStatus("sending"), 900);
      return () => clearTimeout(t);
    }
    if (status === "sending") {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setStatus("sent");
            return 100;
          }
          return p + 20;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleTransmit = () => {
    if (status === "idle") {
      setProgress(0);
      setStatus("dialing");
    } else if (status === "sent") {
      setStatus("idle");
      setProgress(0);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0e1329] via-[#070914] to-[#030408] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300">Encrypted Line</p>
          <p className="font-display text-xl font-semibold leading-tight">Send Fax</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-emerald-300 border border-emerald-500/30 text-[10px]">
          <ShieldCheck className="h-3 w-3" />
          <span>HIPAA Safe</span>
        </div>
      </div>

      {/* Document Preview Card */}
      <div className="mt-3 relative rounded-2xl border border-indigo-500/20 bg-white/[0.05] p-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-8 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-semibold text-white">Signed_Agreement_v2.pdf</p>
            <p className="font-mono text-[9px] text-white/50">1 Page · 142 KB · 300 DPI Fine</p>
          </div>
        </div>

        {/* Recipient Box */}
        <div className="mt-2.5 rounded-xl bg-black/40 p-2 border border-white/5 flex items-center justify-between text-xs">
          <div>
            <span className="block font-mono text-[8px] uppercase tracking-wider text-indigo-300/80">Recipient</span>
            <span className="font-mono text-[11px] font-bold text-white">+1 (415) 890-FAX1</span>
          </div>
          <span className="text-[10px] text-white/40">US Toll-Free</span>
        </div>
      </div>

      {/* Transmission Terminal Display */}
      <div className="mt-3 flex-1 rounded-2xl border border-white/10 bg-black/50 p-3 font-mono text-[10px] flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-white/50 text-[9px]">
            <span>MODEM STATUS</span>
            <span className="flex items-center gap-1 text-indigo-300">
              <Radio className="h-2.5 w-2.5 animate-pulse" /> V.34 Protocol
            </span>
          </div>

          {status === "idle" && (
            <p className="text-white/60">Ready to transmit. Document verified & digitally signed.</p>
          )}

          {status === "dialing" && (
            <div className="space-y-1 text-amber-300">
              <p>Dialing carrier network...</p>
              <p className="text-white/40">Exchanging handshake tokens (14,400 bps)</p>
            </div>
          )}

          {status === "sending" && (
            <div className="space-y-1.5">
              <p className="text-indigo-300">Transmitting raster pages... {progress}%</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400"
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {status === "sent" && (
            <div className="space-y-1 text-emerald-300">
              <div className="flex items-center gap-1 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Delivered Successfully
              </div>
              <p className="text-[9px] text-white/60">Receipt #FX-88219 confirmed by remote machine</p>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[8px] text-white/40">
          <span>TX ID: 88219-B</span>
          <span>SPEED: 14.4 KBPS</span>
        </div>
      </div>

      {/* Send / Reset Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleTransmit}
        className={`mt-3 flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all ${
          status === "sent"
            ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            : status === "sending" || status === "dialing"
            ? "bg-indigo-600/70 text-white cursor-wait"
            : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
        }`}
      >
        {status === "idle" && (
          <>
            <Send className="h-3.5 w-3.5" /> Send Fax Now
          </>
        )}
        {status === "dialing" && "Dialing…"}
        {status === "sending" && `Sending page 1/1 (${progress}%)`}
        {status === "sent" && (
          <>
            <RefreshCw className="h-3.5 w-3.5" /> All Sent · Tap to Reset
          </>
        )}
      </motion.button>
    </div>
  );
};
