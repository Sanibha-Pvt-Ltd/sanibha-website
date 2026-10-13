import { motion } from "framer-motion";
import { easeOut, ease } from "@/lib/intro";

export const Reveal = ({ children, delay = 0, y = 40, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: easeOut }}
    {...rest}
  >
    {children}
  </motion.div>
);

const line = {
  hidden: { y: "115%", rotate: 3 },
  show: ({ i, d }) => ({ y: "0%", rotate: 0, transition: { duration: 1.1, delay: d + i * 0.09, ease } }),
};

export const MaskLines = ({ lines, as = "h2", className = "", play, delay = 0, testid }) => {
  const Tag = motion[as];
  const trigger = play === undefined
    ? { whileInView: "show", viewport: { once: true, amount: 0.1 } }
    : { animate: play ? "show" : "hidden" };
  return (
    <Tag data-testid={testid} className={className} initial="hidden" {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className="block origin-top-left" variants={line} custom={{ i, d: delay }}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
};
