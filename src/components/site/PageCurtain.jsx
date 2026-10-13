import { motion } from "framer-motion";
import { ease } from "@/lib/intro";

export const PageCurtain = () => (
  <motion.div
    aria-hidden="true"
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    transition={{ duration: 0.9, ease }}
    className="pointer-events-none fixed inset-0 z-[80] origin-top bg-ink"
  />
);
