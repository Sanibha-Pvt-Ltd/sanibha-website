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
  const company = config?.company || {};
  const legalName = company?.legalName || "Sanibha Private Limited";
  const addressOneLine = company?.addressOneLine || "451P, 2nd Floor, The Palm Crest, Sector 50, Gurgaon, Haryana 122018, India";
  const supportEmail = company?.supportEmail || "support@sanibha.com";
  const letters = wordmark.split("");

  return (
    <footer data-testid="site-footer" className="relative overflow-hidden border-t hairline px-6 pt-20 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        {/* Col 1: Studio */}
        <div>
          <p className="max-w-sm font-serif text-3xl italic leading-tight text-slate-950 dark:text-white">{tagline}</p>
          <div className="mt-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-950 dark:text-white">{legalName}</p>
            <p className="mt-1 max-w-xs">{addressOneLine}</p>
          </div>
          <Link
            to="/contact"
            data-testid="footer-contact-link"
            className="mt-5 inline-block border-b-2 border-slate-900/50 dark:border-white/50 pb-1 text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white transition-colors hover:border-slate-900 dark:hover:border-white"
          >
            Start a conversation &rarr;
          </Link>
        </div>

        {/* Col 2: Navigate */}
        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2.5 text-sm font-medium">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  data-testid={`footer-nav-${n.label.toLowerCase()}`}
                  to={n.to}
                  className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Support */}
        <div>
          <p className="eyebrow mb-4">Help & Support</p>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <Link to="/support" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                Support Center
              </Link>
            </li>
            <li>
              <Link to="/support#cancel" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                Cancel Subscription
              </Link>
            </li>
            <li>
              <Link to="/support#refund" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                Refund Requests
              </Link>
            </li>
            <li>
              <Link to="/data-request" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                Data Rights (DPDP)
              </Link>
            </li>
            <li>
              <a href={`mailto:${supportEmail}`} className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors font-mono text-xs font-semibold">
                {supportEmail}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & Appearance */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Legal & Compliance</p>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/privacy" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy#grievance" className="text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors">
                  Grievance Officer
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 border-t hairline pt-4">
            <div className="flex items-center gap-3">
              <ThemeToggle testid="footer-theme-toggle" />
              <button
                data-testid="back-to-top-btn"
                onClick={() =>
                  window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white font-bold"
              >
                Top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
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
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t hairline py-6 text-xs text-slate-700 dark:text-slate-300 font-medium sm:flex-row">
        <span>{copyright}</span>
        <div className="flex items-center gap-4">
        <span className="font-mono uppercase tracking-[0.2em] font-semibold">Crafted for iOS</span>
        <Link to="/admin" className="font-mono text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors text-[10px] tracking-wider uppercase font-semibold">Admin</Link>
      </div>
      </div>
    </footer>
  );
};
