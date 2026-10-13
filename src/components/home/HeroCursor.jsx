import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const HeroCursor = ({ parent }) => {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });
  const [inside, setInside] = useState(false);

  useEffect(() => {
    const el = parent.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const move = (e) => { const r = el.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); };
    const enter = () => setInside(true);
    const leave = () => setInside(false);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, [parent, x, y]);

  return (
    <>
      <motion.div aria-hidden="true" style={{ x: sx, y: sy }} animate={{ opacity: inside ? 1 : 0 }}
        className="pointer-events-none absolute left-0 top-0 z-0 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,.18),rgba(236,72,153,.10)_35%,transparent_65%)]" />
      <motion.div aria-hidden="true" style={{ x: sx, y: sy }} animate={{ opacity: inside ? 1 : 0, scale: inside ? 1 : 0.4 }}
        className="pointer-events-none absolute left-0 top-0 z-40 -ml-5 -mt-5 h-10 w-10 rounded-full border border-ink/50 mix-blend-difference" />
    </>
  );
};
