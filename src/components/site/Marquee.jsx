import { LogoMark } from "./Logo";

const WORDS = ["Pure", "Radiant", "Storage Cleaner", "Graceful", "Plant Identifier", "Brilliant", "Calorie Tracker", "Made for iOS"];

const Row = ({ reverse }) => (
  <div className={`marquee-track flex w-max items-center ${reverse ? "reverse" : ""}`}>
    {[...WORDS, ...WORDS].map((w, i) => (
      <span key={i} className="flex items-center">
        <span className={`px-6 font-display text-5xl font-medium tracking-tight sm:text-7xl lg:text-8xl ${i % 2 ? "font-serif italic font-normal outline-text" : ""}`}>{w}</span>
        <LogoMark className="h-8 w-8 shrink-0 sm:h-12 sm:w-12" />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <section data-testid="editorial-marquee" aria-label="Sanibha values" className="relative overflow-hidden border-y hairline py-10 sm:py-14">
    <Row />
  </section>
);
