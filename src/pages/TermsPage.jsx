import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale, ShieldAlert, FileText, ArrowRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";

export default function TermsPage() {
  const { config } = useSiteContent();
  const company = config?.company || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const legalName = company.legalName || "Sanibha Private Limited";
  const addressOneLine = company.addressOneLine || "451P, 2nd Floor, The Palm Crest, Sector 50, Gurgaon, Haryana 122018, India";
  const jurisdictionCity = company.jurisdictionCity || "Gurugram, Haryana";
  const supportEmail = company.supportEmail || "support@sanibha.com";
  const policyUpdated = company.policyUpdated || "13 October 2026";

  return (
    <main data-testid="terms-page" className="pb-28">
      <PageHero
        testid="terms-hero"
        eyebrow="Terms & Conditions"
        text="The terms and rules governing use of the Sanibha website. These provisions exist alongside the standard Apple EULA governing our native iOS applications."
        lines={[
          "Terms of",
          <span key="highlight" className="font-serif italic font-normal prism-text pr-2">
            use.
          </span>,
        ]}
      />

      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal delay={0.2} className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b hairline pb-6 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-mono uppercase tracking-wider">Effective: {policyUpdated}</span>
          <span className="font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Scale className="h-4 w-4" /> Jurisdiction: {jurisdictionCity}, India
          </span>
        </Reveal>

        <div className="space-y-14 text-ink">
          {/* 1. Who these terms are with */}
          <Reveal delay={0.3} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">1. Agreement & Parties</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              These terms constitute a legally binding agreement between you and <strong className="text-ink">{legalName}</strong>, a corporation incorporated under the laws of India, having its registered office at <span className="text-ink">{addressOneLine}</span>. By accessing or browsing <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-xs">sanibha.com</code>, you affirm your acceptance of these Terms. If you do not agree, you must discontinue use immediately.
            </p>
          </Reveal>

          {/* 2. Using the website */}
          <Reveal delay={0.35} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">2. Permitted Use</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              You are granted a revocable, non-exclusive license to view the materials on this website for personal, non-commercial informational purposes. You agree not to misuse, probe, tamper with, or intentionally inject malicious code into the website, or utilize automated scraping engines to harvest proprietary data without explicit authorization.
            </p>
          </Reveal>

          {/* 3. Our apps & Apple EULA */}
          <Reveal delay={0.4} className="space-y-4">
            <div className="rounded-2xl border hairline bg-ink/[0.02] p-6 sm:p-8">
              <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl mb-3 flex items-center gap-3">
                <FileText className="h-6 w-6 text-ink" /> 3. Apple App Store & Standard EULA
              </h2>
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                Our mobile applications are distributed exclusively through the Apple App Store. Unless an application specifies custom end-user terms, your download and license are governed by Apple&apos;s standard{" "}
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline underline-offset-4 hover:opacity-80"
                >
                  Licensed Application End User License Agreement (EULA)
                </a>
                .
              </p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                All financial transactions, in-app billing, subscriptions, and refund adjudications are handled directly by Apple Inc. See our{" "}
                <Link to="/support" className="text-ink underline underline-offset-4 font-semibold">
                  Support Guide
                </Link>{" "}
                for clear steps on subscription cancellations and refunds.
              </p>
            </div>
          </Reveal>

          {/* 4. Intellectual Property */}
          <Reveal delay={0.45} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">4. Intellectual Property Rights</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              All visual interfaces, design patterns, typography choreography, logos, copy, software, and audio-haptic implementations on this site belong to <strong className="text-ink">{legalName}</strong> or its licensors and are protected under international copyright and intellectual property treaties.
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic">
              Apple, iPhone, iPad, Dynamic Island, and App Store are registered trademarks of Apple Inc., registered in the U.S. and other countries.
            </p>
          </Reveal>

          {/* 5. Informational Nature & Health Disclaimer */}
          <Reveal delay={0.5} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">5. No Professional Advice Disclaimer</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              Content provided on this site and within our utility applications is provided for informational and record-keeping purposes only on an &ldquo;as is&rdquo; basis. <strong className="text-ink">Nothing on this site constitutes medical, dietary, legal, or financial advice.</strong> Always consult an accredited healthcare practitioner, pediatrician, or legal professional for individualized advice.
            </p>
          </Reveal>

          {/* 6. External Links */}
          <Reveal delay={0.55} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">6. Third-Party Links</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              Our site may incorporate references or links to external services (including Apple and documentation portals). We do not oversee or endorse these external sites and bear no liability for their content or operational practices.
            </p>
          </Reveal>

          {/* 7. Limitation of Liability */}
          <Reveal delay={0.6} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">7. Limitation of Liability</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              To the maximum extent permissible by applicable law, {legalName} and its officers shall not be held liable for indirect, punitive, or consequential damages resulting from the use or inability to use this site. Nothing herein limits non-excludable consumer protections provided under statutory law.
            </p>
          </Reveal>

          {/* 8. Governing Law */}
          <Reveal delay={0.65} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">8. Governing Law & Dispute Resolution</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              These Terms of Use are governed by the substantive laws of India. The courts of competent jurisdiction located at <strong className="text-ink">{jurisdictionCity}</strong> shall have exclusive jurisdiction over any proceedings or claims arising hereunder.
            </p>
          </Reveal>

          {/* 9. Contact */}
          <Reveal delay={0.7} className="space-y-4 border-t hairline pt-10">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Inquiries</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
              For any questions regarding these Terms of Use, please contact:{" "}
              <a href={`mailto:${supportEmail}`} className="text-ink underline underline-offset-4">
                {supportEmail}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
