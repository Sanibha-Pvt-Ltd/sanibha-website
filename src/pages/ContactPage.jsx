import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSiteContent } from "@/context/SiteContentContext";

export default function ContactPage() {
  const { config } = useSiteContent();
  const { contact } = config;

  const faqs = contact?.faqs || [
    { q: "Can I suggest a feature for one of your apps?", a: "Absolutely. Pick the app in the form above and tell us your idea — feature requests shape our roadmap." },
    { q: "I found a bug. What should I include?", a: "Tell us which app, your iPhone model and iOS version, and what happened. Screenshots help too." },
    { q: "Do you work on partnerships?", a: "We're open to thoughtful collaborations. Choose “General” and share a few details about what you have in mind." },
    { q: "Where can I download Sanibha apps?", a: "Our apps are built for iPhone and distributed through the Apple App Store." },
  ];

  return (
    <main data-testid="contact-page">
      <PageHero
        testid="contact-hero"
        eyebrow={contact?.heroEyebrow || "Contact"}
        text="Questions, feedback or a spark of an idea — write to us and we'll reply as soon as we can."
        lines={[
          contact?.heroTitlePart1 || "Say hello.",
          <span className="font-serif italic font-normal prism-text pr-2">
            {contact?.heroTitleHighlight || "We're listening."}
          </span>,
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-[32px] border hairline bg-surface/70 p-7 backdrop-blur-xl sm:p-12"><ContactForm /></Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" /></span>
            <span className="eyebrow">Inbox open</span>
          </div>
          <p className="mt-6 font-serif text-3xl italic leading-tight text-slate-950 dark:text-white">Every message is read by a real person at Sanibha.</p>
          <p className="eyebrow mb-2 mt-12">Common questions</p>
          <Accordion type="single" collapsible data-testid="contact-faq">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`f${i}`} className="hairline">
                <AccordionTrigger data-testid={`faq-trigger-${i}`} className="text-left font-display text-lg hover:no-underline text-slate-950 dark:text-white font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </main>
  );
}
