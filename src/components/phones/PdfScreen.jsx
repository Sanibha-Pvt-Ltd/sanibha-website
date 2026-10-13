import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, FileText, Minimize2, PenTool, CheckCircle2, Share2, Sparkles } from "lucide-react";
import { StatusBar } from "./PhoneFrame";

export const PdfScreen = ({ id = "pdf" }) => {
  const [mode, setMode] = useState("compress"); // compress | sign | ocr
  const [signed, setSigned] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#081a24] via-[#050f14] to-[#020508] px-4 pb-4 pt-11 text-white select-none">
      <StatusBar />

      {/* Header */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Scan className="h-3 w-3" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em]">Auto Edge Detect</p>
          </div>
          <p className="font-display text-lg font-semibold leading-tight">Document Scanner</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-cyan-500/20 px-2 py-0.5 text-cyan-300 border border-cyan-500/30 text-[10px]">
          <span>A4 · 300 DPI</span>
        </div>
      </div>

      {/* Viewfinder / Document Canvas */}
      <div className="mt-2.5 relative flex-1 rounded-2xl border border-cyan-400/40 bg-black/60 p-3 overflow-hidden shadow-inner flex flex-col justify-between">
        {/* Background Laser Scan Line */}
        <div className="scan-line absolute inset-x-2 h-[2px] bg-cyan-300 shadow-[0_0_12px_#22D3EE]" />

        {/* Paper Preview */}
        <div className="relative mx-auto w-[82%] rounded-lg bg-white/95 p-3 text-neutral-900 shadow-xl border border-white/20">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5 text-[8px] font-mono text-neutral-500">
            <span>MUTUAL NDA v3</span>
            <span>PAGE 1 OF 1</span>
          </div>

          <div className="my-2 space-y-1">
            <div className="h-1.5 w-3/4 rounded bg-neutral-800" />
            <div className="h-1 w-full rounded bg-neutral-300" />
            <div className="h-1 w-5/6 rounded bg-neutral-300" />
            <div className="h-1 w-2/3 rounded bg-neutral-300" />
          </div>

          {/* Dynamic Signature Stamp */}
          {signed && (
            <motion.div
              initial={{ scale: 1.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: -4 }}
              className="mt-1 flex items-center gap-1 rounded border border-cyan-600 bg-cyan-50 px-1.5 py-0.5 text-[8px] font-bold text-cyan-800"
            >
              <span>Verified E-Signature ✓</span>
            </motion.div>
          )}

          {/* OCR Extract Mode */}
          {mode === "ocr" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 rounded bg-neutral-100 p-1 font-mono text-[7px] text-neutral-600"
            >
              OCR: "This Agreement is made on Oct 14..."
            </motion.div>
          )}
        </div>

        {/* Mode-Specific Status Badge */}
        <div className="rounded-xl bg-black/70 p-2 border border-white/10 text-[10px] text-center">
          {mode === "compress" && (
            <p className="text-cyan-300">
              {compressed ? "Compressed: 14.8 MB → 2.1 MB (-85%)" : "Ready to optimize PDF size"}
            </p>
          )}
          {mode === "sign" && (
            <p className="text-cyan-300">
              {signed ? "Signature stamped & legally bound" : "Tap Sign button below to sign"}
            </p>
          )}
          {mode === "ocr" && (
            <p className="text-cyan-300">
              {copied ? "Copied 418 words to clipboard!" : "Text extracted with 99.4% accuracy"}
            </p>
          )}
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-xs">
        <button
          onClick={() => {
            setMode("compress");
            setCompressed(!compressed);
          }}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 border transition-all ${
            mode === "compress"
              ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
              : "border-white/5 bg-white/[0.05] text-white/60"
          }`}
        >
          <Minimize2 className="h-3 w-3" />
          <span className="text-[10px] font-semibold">Compress</span>
        </button>

        <button
          onClick={() => {
            setMode("sign");
            setSigned(!signed);
          }}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 border transition-all ${
            mode === "sign"
              ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
              : "border-white/5 bg-white/[0.05] text-white/60"
          }`}
        >
          <PenTool className="h-3 w-3" />
          <span className="text-[10px] font-semibold">{signed ? "Signed ✓" : "Sign PDF"}</span>
        </button>

        <button
          onClick={() => {
            setMode("ocr");
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 border transition-all ${
            mode === "ocr"
              ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
              : "border-white/5 bg-white/[0.05] text-white/60"
          }`}
        >
          <FileText className="h-3 w-3" />
          <span className="text-[10px] font-semibold">{copied ? "Copied!" : "OCR Text"}</span>
        </button>
      </div>

      {/* Main Save Action */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl bg-cyan-400 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-400/20"
      >
        <Share2 className="h-3.5 w-3.5" /> Export High-Res PDF
      </motion.button>
    </div>
  );
};
