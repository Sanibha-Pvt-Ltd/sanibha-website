import { MaskLines, Reveal } from "@/components/site/Reveal";

export const PageHero = ({ eyebrow, lines, text, testid }) => (
  <section data-testid={testid} className="relative overflow-hidden px-6 pb-16 pt-40 sm:px-10 lg:pt-48">
    <div className="rays pointer-events-none absolute -right-[30%] -top-[40%] h-[1100px] w-[1100px]" />
    <div className="relative mx-auto max-w-7xl">
      <Reveal className="eyebrow mb-8 flex items-center gap-3"><span className="h-px w-10 bg-ink/40" />{eyebrow}</Reveal>
      <MaskLines as="h1" play delay={0.5} className="font-display text-[3rem] font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]" lines={lines} />
      {text && <Reveal delay={0.8} className="mt-8 max-w-xl text-base leading-relaxed text-dim sm:text-lg">{text}</Reveal>}
    </div>
  </section>
);
