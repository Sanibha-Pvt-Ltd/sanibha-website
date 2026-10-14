import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, Zap, LayoutGrid, Accessibility, SunMoon } from "lucide-react";
import { MaskLines } from "@/components/site/Reveal";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const Tile = ({ className = "", i, children, testid }) => (
  <motion.div
    data-testid={testid}
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
    className={`group relative overflow-hidden rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-surface p-7 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const Head = ({ Icon, title, text }) => (
  <>
    <Icon className="h-6 w-6 text-slate-900 dark:text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
    <h4 className="mt-auto font-display text-xl font-semibold tracking-tight sm:text-2xl text-slate-950 dark:text-white">{title}</h4>
    <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-normal">{text}</p>
  </>
);

const Bars = () => (
  <div className="absolute right-7 top-7 flex h-16 items-end gap-1.5">
    {[0.3, 0.55, 0.4, 0.8, 0.65, 1].map((h, i) => (
      <motion.span key={i} className="w-2.5 rounded-full prism-bg" initial={{ height: 6 }} whileInView={{ height: `${h * 100}%` }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }} />
    ))}
  </div>
);

import { useSiteContent } from "@/context/SiteContentContext";

export const Bento = () => {
  const { config } = useSiteContent();
  const { bento } = config;

  return (
    <section data-testid="bento-section" className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
      <p className="eyebrow mb-6">( How we build )</p>
      <MaskLines className="mb-14 max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl"
        lines={["Crafted with", <span className="font-serif italic font-normal">brilliance & grace.</span>]} />
      <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tile i={0} testid="bento-native" className="flex flex-col md:col-span-2 md:row-span-2 !p-0">
          <img src={bento.prismaticImage || "/img/prism.jpg"} alt="Prismatic light refraction" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative mt-auto p-8 text-white">
            <Smartphone className="h-7 w-7" />
            <h4 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">{bento.prismaticTitle || "Native to iOS, down to the pixel."}</h4>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{bento.prismaticDesc || "We design for the platform we love — familiar gestures, fluid motion and the polish iPhone users expect."}</p>
          </div>
        </Tile>
        <Tile i={1} testid="bento-privacy" className="flex flex-col"><Head Icon={ShieldCheck} title={bento.swiftTitle || "Privacy first"} text={bento.swiftDesc || "We treat your photos, plants and meals as yours. Always."} /></Tile>
        <Tile i={2} testid="bento-theme" className="flex flex-col">
          <div className="flex items-center justify-between"><SunMoon className="h-6 w-6 text-slate-900 dark:text-white" /><ThemeToggle testid="bento-theme-toggle" /></div>
          <h4 className="mt-auto font-display text-xl font-semibold tracking-tight sm:text-2xl text-slate-950 dark:text-white">Day & night</h4>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 font-normal">Go on — flip the switch. Our apps glow in both.</p>
        </Tile>
        <Tile i={3} testid="bento-speed" className="flex flex-col md:col-span-2"><Bars /><Head Icon={Zap} title={bento.hapticsTitle || "Tactile haptics"} text={bento.hapticsDesc || "No bloat, no maze of menus. Open the app, get it done, get on with your day."} /></Tile>
        <Tile i={4} testid="bento-widgets" className="flex flex-col md:col-span-2 lg:col-span-2"><Head Icon={LayoutGrid} title={bento.audioTitle || "Acoustic calm"} text={bento.audioDesc || "Clear numbers, calm layouts and information that reads in a heartbeat."} /></Tile>
        <Tile i={5} testid="bento-access" className="flex flex-col md:col-span-2 lg:col-span-2"><Head Icon={Accessibility} title="Light for everyone" text="Readable type, generous touch targets and care for accessibility in every screen." /></Tile>
      </div>
    </section>
  );
};
