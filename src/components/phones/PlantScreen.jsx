import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Sun, PawPrint, X, ScanLine } from "lucide-react";
import { StatusBar } from "./PhoneFrame";
import { easeOut } from "@/lib/intro";

const Corner = ({ c }) => <span className={`absolute h-6 w-6 border-white ${c}`} />;

export const PlantScreen = ({ id = "plant" }) => {
  const [found, setFound] = useState(false);
  return (
    <div className="relative h-full overflow-hidden text-white">
      <img src="/img/leaf.jpg" alt="Leaf in front of the camera" className="absolute inset-0 h-full w-full scale-[1.6] object-cover object-[60%_50%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/40" />
      <div className="relative px-4 pt-11"><StatusBar /></div>
      <p className="relative mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em]">{found ? "Match found" : "Point at a leaf"}</p>
      <div className="absolute left-1/2 top-[40%] h-44 w-44 -translate-x-1/2 -translate-y-1/2">
        <Corner c="left-0 top-0 rounded-tl-xl border-l-2 border-t-2" />
        <Corner c="right-0 top-0 rounded-tr-xl border-r-2 border-t-2" />
        <Corner c="bottom-0 left-0 rounded-bl-xl border-b-2 border-l-2" />
        <Corner c="bottom-0 right-0 rounded-br-xl border-b-2 border-r-2" />
        {!found && <span className="scan-line absolute inset-x-2 h-[2px] bg-emerald-300 shadow-[0_0_18px_4px_rgba(110,231,183,.7)]" />}
      </div>
      <AnimatePresence>
        {found ? (
          <motion.div key="card" initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ duration: 0.6, ease: easeOut }}
            className="absolute inset-x-2 bottom-2 rounded-[30px] bg-white/90 p-4 text-neutral-900 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-700">Demo result · 96% match</p>
                <p className="mt-1 font-display text-xl font-semibold leading-tight">Leafy shrub</p>
                <p className="font-serif text-sm italic text-neutral-600">sample species card</p>
              </div>
              <button data-testid={`${id}-demo-reset`} onClick={() => setFound(false)} aria-label="Scan again" className="rounded-full bg-neutral-900/10 p-1.5"><X className="h-3.5 w-3.5" /></button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px]">
              {[[Droplets, "Weekly"], [Sun, "Bright"], [PawPrint, "Pet-safe?"]].map(([I, t]) => (
                <span key={t} className="flex flex-col items-center gap-1 rounded-2xl bg-emerald-50 py-2 text-emerald-900"><I className="h-4 w-4" />{t}</span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button key="shutter" data-testid={`${id}-demo-btn`} onClick={() => setFound(true)} aria-label="Identify plant"
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileTap={{ scale: 0.85 }}
            className="absolute bottom-7 left-1/2 -ml-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-emerald-400/90">
            <ScanLine className="h-6 w-6 text-emerald-950" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
