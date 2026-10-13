import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { MaskLines, Reveal } from "@/components/site/Reveal";
import { Method } from "@/components/home/Method";
import { LogoMark } from "@/components/site/Logo";
import { useSiteContent } from "@/context/SiteContentContext";

const Meaning = ({ bannerImage, story1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [80, 32]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} data-testid="about-meaning" className="px-4 py-10 sm:px-6">
      <motion.div style={{ scale, borderRadius: radius }} className="relative mx-auto h-[80vh] max-w-7xl overflow-hidden">
        <motion.img style={{ y: imgY }} src={bannerImage || "/img/prism.jpg"} alt="Prismatic light" className="absolute -inset-y-[12%] h-[124%] w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <LogoMark className="spin-slow h-16 w-16" />
          <p className="mt-8 max-w-4xl font-serif text-3xl italic leading-tight sm:text-5xl lg:text-6xl">
            “{story1 || "One who is pure, radiant, and beautifully resembles a bright light."}”
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-white/80">The meaning of Sanibha</p>
        </div>
      </motion.div>
    </section>
  );
};

const Values = ({ principles }) => {
  const items = principles || [
    { title: "Pure", desc: "Every feature must earn its place. If it doesn't make life simpler, it doesn't ship." },
    { title: "Radiant", desc: "Interfaces that feel warm, alive and quietly delightful from the very first tap." },
    { title: "Graceful", desc: "Motion and feedback tuned to feel natural — never loud, never in the way." },
    { title: "Brilliant", desc: "Smart under the hood, so the experience on the surface can stay beautifully simple." },
  ];

  return (
    <section data-testid="about-values" className="mx-auto max-w-7xl px-6 py-28 sm:px-10">
      <p className="eyebrow mb-6">( What we hold to )</p>
      <MaskLines className="mb-14 font-display text-4xl font-medium tracking-tight sm:text-6xl" lines={["Four quiet", <span className="font-serif italic font-normal">promises.</span>]} />
      <div className="border-t hairline">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05} className="group relative grid gap-4 overflow-hidden border-b hairline py-8 md:grid-cols-[120px_1fr_1.2fr] md:items-center">
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-y-100" />
            <span className="relative font-mono text-sm text-dim transition-colors group-hover:text-canvas/70 md:pl-4">0{i + 1}</span>
            <span className="relative font-display text-4xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-canvas sm:text-6xl">{item.title}</span>
            <span className="relative max-w-md text-dim transition-colors group-hover:text-canvas/80 md:pr-4">{item.desc}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default function AboutPage() {
  const { config } = useSiteContent();
  const { about } = config;

  return (
    <main data-testid="about-page">
      <PageHero
        testid="about-hero"
        eyebrow={about?.heroEyebrow || "Our story"}
        text={about?.storyParagraph1 || "Sanibha is an iOS studio building utility apps that feel as pure and radiant as the name we carry."}
        lines={[
          about?.heroTitlePart1 || "A studio named",
          "for a",
          <span className="font-serif italic font-normal prism-text pr-2">
            {about?.heroTitleHighlight || "bright light."}
          </span>
        ]}
      />
      <Meaning bannerImage={about?.bannerImage} story1={about?.storyParagraph1} />
      <Values principles={about?.principles} />
      <Method />
      <section className="border-t hairline py-24 text-center">
        <Reveal>
          <p className="eyebrow">Ready to collaborate?</p>
          <h3 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">We're always building something new.</h3>
          <Link to="/contact" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-semibold text-canvas transition-transform hover:scale-[1.03]">
            Get in touch <span className="flex h-9 w-9 items-center justify-center rounded-full prism-bg text-white transition-transform group-hover:rotate-[-45deg]"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
