import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { MaskLines } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import { PhoneFrame } from "@/components/phones/PhoneFrame";
import { CleanerScreen } from "@/components/phones/CleanerScreen";
import { BabyScreen } from "@/components/phones/BabyScreen";
import { ResumeScreen } from "@/components/phones/ResumeScreen";
import { HeroCursor } from "./HeroCursor";
import { RotatingBadge } from "./RotatingBadge";
import { useIntro, easeOut } from "@/lib/intro";
import { useSiteContent } from "@/context/SiteContentContext";

const PhoneStack = ({ mx, my, scrollY }) => {
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 });
  const yBack = useTransform(scrollY, [0, 800], [0, -120]);
  const yFront = useTransform(scrollY, [0, 800], [0, 80]);
  return (
    <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative h-[600px] w-[560px]">
      <motion.div style={{ y: yBack, z: -80 }} className="absolute left-0 top-12 -rotate-[9deg] opacity-90"><PhoneFrame testid="hero-phone-baby"><BabyScreen id="hero-baby" /></PhoneFrame></motion.div>
      <motion.div style={{ y: yBack, z: -80 }} className="absolute right-0 top-16 rotate-[9deg] opacity-90"><PhoneFrame testid="hero-phone-resume"><ResumeScreen id="hero-resume" /></PhoneFrame></motion.div>
      <motion.div style={{ y: yFront, z: 60 }} className="absolute left-1/2 top-0 -ml-[131px]"><PhoneFrame testid="hero-phone-cleaner"><CleanerScreen id="hero-cleaner" /></PhoneFrame></motion.div>
    </motion.div>
  );
};

export const Hero = () => {
  const { done } = useIntro();
  const { config } = useSiteContent();
  const { hero } = config;
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -140]);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const fade = (d) => ({ initial: { opacity: 0, y: 20 }, animate: done ? { opacity: 1, y: 0 } : {}, transition: { delay: d, duration: 1, ease: easeOut } });

  return (
    <section ref={ref} onMouseMove={onMove} data-testid="hero-section" className="relative min-h-screen overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:pt-36" style={{ perspective: 1400 }}>
      <HeroCursor parent={ref} />
      <div className="rays pointer-events-none absolute -right-[20%] top-[-10%] h-[1300px] w-[1300px]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[var(--glow)] blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ y: textY }} className="relative z-10">
          <motion.p {...fade(0.1)} className="eyebrow mb-8 flex items-center gap-3"><span className="h-px w-10 bg-ink/40" />{hero.eyebrow}</motion.p>
          <MaskLines as="h1" play={done} delay={0.15} testid="hero-heading"
            className="font-display text-[3.1rem] font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[6.6rem]"
            lines={[hero.headingPart1, <span className="font-serif font-normal italic prism-text pr-2">{hero.headingHighlight}</span>, hero.headingPart2]} />
          <motion.p {...fade(0.7)} className="mt-8 max-w-md text-base leading-relaxed text-dim sm:text-lg">
            {hero.description}
          </motion.p>
          <motion.div {...fade(0.85)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link to="/apps" data-testid="hero-explore-apps-btn" className="group flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 font-semibold text-canvas">
                {hero.ctaPrimaryText}
                <span className="flex h-8 w-8 items-center justify-center rounded-full prism-bg text-white transition-transform duration-500 group-hover:rotate-[-45deg]"><ArrowRight className="h-4 w-4" /></span>
              </Link>
            </Magnetic>
            <Link to="/about" data-testid="hero-about-link" className="border-b border-ink/30 pb-0.5 text-sm font-semibold transition-colors hover:border-ink">{hero.ctaSecondaryText}</Link>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 60 }} animate={done ? { opacity: 1, scale: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 1.4, ease: easeOut }}
          className="relative hidden justify-center lg:flex">
          <PhoneStack mx={mx} my={my} scrollY={scrollY} />
        </motion.div>
        <motion.div {...fade(0.6)} className="flex justify-center lg:hidden">
          <PhoneFrame testid="hero-phone-mobile" className="scale-90"><CleanerScreen id="hero-mobile-cleaner" /></PhoneFrame>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-6 hidden items-center gap-3 sm:left-10 md:flex">
        <RotatingBadge />
        <span className="eyebrow flex items-center gap-2">Scroll <ArrowDown className="h-3 w-3 animate-bounce" /></span>
      </div>
    </section>
  );
};
