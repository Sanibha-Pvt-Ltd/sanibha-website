import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro, ease } from "@/lib/intro";
import { LogoMark } from "./Logo";

export const Preloader = () => {
  const { done, finish } = useIntro();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (done) return undefined;
    const iv = setInterval(() => setCount((c) => Math.min(100, c + Math.ceil(Math.random() * 9))), 55);
    return () => clearInterval(iv);
  }, [done]);

  useEffect(() => {
    if (count < 100) return undefined;
    const t = setTimeout(finish, 350);
    return () => clearTimeout(t);
  }, [count, finish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080b] text-white"
        >
          <motion.div initial={{ scale: 0.4, rotate: -90, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 1.2, ease }}>
            <LogoMark className="h-24 w-24 drop-shadow-[0_0_40px_rgba(236,72,153,.55)]" spin />
          </motion.div>
          <div className="mt-8 overflow-hidden">
            <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease }} className="font-serif text-3xl italic text-white/90">
              a bright light, distilled
            </motion.p>
          </div>
          <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            <span>Sanibha — iOS studio</span>
            <span className="font-display text-6xl tracking-tight text-white sm:text-8xl">{count}</span>
          </div>
          <motion.div className="absolute bottom-0 left-0 h-[3px] prism-bg" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
