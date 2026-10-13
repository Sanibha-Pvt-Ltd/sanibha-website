import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { NAV } from "./Navbar";
import { ThemeToggle } from "./ThemeToggle";
import { easeOut } from "@/lib/intro";
import { useSiteContent } from "@/context/SiteContentContext";

export const Footer = () => {
  const { config } = useSiteContent();
  const wordmark = config?.footer?.wordmark || "sanibha";
  const tagline = config?.footer?.tagline || "Utilities as pure and radiant as a bright light.";
  const copyright = config?.footer?.copyright || "© 2026 Sanibha. All rights reserved.";
  const letters = wordmark.split("");

  return (
    <footer data-testid="site-footer" className="relative overflow-hidden border-t hairline px-6 pt-20 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="max-w-sm font-serif text-3xl italic leading-tight">{tagline}</p>
          <Link to="/contact" data-testid="footer-contact-link" className="mt-6 inline-block border-b border-ink/40 pb-1 text-sm font-semibold transition-colors hover:border-ink">Start a conversation</Link>
        </div>
        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.to}><Link data-testid={`footer-nav-${n.label.toLowerCase()}`} to={n.to} className="text-dim transition-colors hover:text-ink">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-4">
          <p className="eyebrow">Appearance</p>
          <ThemeToggle testid="footer-theme-toggle" />
          <button data-testid="back-to-top-btn" onClick={() => window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })} className="group mt-2 flex items-center gap-2 text-sm text-dim hover:text-ink">
            Back to top <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mt-16 flex select-none justify-center leading-[0.8] tracking-[-0.04em]">
        {letters.map((l, i) => (
          <span key={i} className="overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { delay: i * 0.06, duration: 1, ease: easeOut } } }}
              className="block font-display text-[21vw] font-medium tracking-tight prism-text transition-[filter] hover:brightness-125 select-none"
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t hairline py-6 text-xs text-dim sm:flex-row">
        <span>{copyright}</span>
        <div className="flex items-center gap-4">
        <span className="font-mono uppercase tracking-[0.2em]">Crafted for iOS</span>
        <Link to="/admin" className="font-mono text-dim/60 hover:text-ink transition-colors text-[10px] tracking-wider uppercase">Admin</Link>
      </div>
      </div>
    </footer>
  );
};
