import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ease } from "@/lib/intro";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/apps", label: "Apps" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const MobileMenu = ({ onClose }) => (
  <motion.div
    data-testid="mobile-menu"
    initial={{ clipPath: "circle(0% at 92% 4%)" }}
    animate={{ clipPath: "circle(150% at 92% 4%)" }}
    exit={{ clipPath: "circle(0% at 92% 4%)" }}
    transition={{ duration: 0.8, ease }}
    className="fixed inset-0 z-40 flex flex-col justify-between bg-canvas px-6 pb-10 pt-28 md:hidden"
  >
    <nav className="flex flex-col gap-2">
      {NAV.map((n, i) => (
        <motion.div key={n.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease }}>
          <Link data-testid={`mobile-nav-${n.label.toLowerCase()}`} to={n.to} onClick={onClose} className="font-display text-5xl font-medium tracking-tight">
            {n.label}
          </Link>
        </motion.div>
      ))}
    </nav>
    <div className="flex items-center justify-between">
      <span className="eyebrow">Theme</span>
      <ThemeToggle testid="mobile-theme-toggle" />
    </div>
  </motion.div>
);

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
  });

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2">
          <Link to="/" data-testid="nav-logo" className="group"><Wordmark /></Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end data-testid={`nav-${n.label.toLowerCase()}-link`} className="relative px-4 py-2 text-sm font-medium">
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink/[0.07]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className={`relative transition-colors ${isActive ? "text-ink" : "text-dim hover:text-ink"}`}>{n.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block"><ThemeToggle /></div>
            <Link to="/contact" data-testid="nav-cta-btn" className="group hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-[1.03] md:flex">
              Say hello <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <button data-testid="mobile-menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-ink md:hidden">
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-4 bg-canvas" />
              <motion.span animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-4 bg-canvas" />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};
