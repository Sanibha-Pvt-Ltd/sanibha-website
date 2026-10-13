import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/home/Manifesto";
import { AppsShowcase } from "@/components/home/AppsShowcase";
import { Bento } from "@/components/home/Bento";
import { Method } from "@/components/home/Method";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <Manifesto />
      <AppsShowcase />
      <Bento />
      <Method />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
