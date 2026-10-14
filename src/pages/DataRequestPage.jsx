import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, ShieldAlert, CheckCircle, Mail, Clock, ArrowRight, UserCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";

export default function DataRequestPage() {
  const { config } = useSiteContent();
  const company = config?.company || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacyEmail = company.privacyEmail || company.supportEmail || "support@sanibha.com";
  const responseTime = company.responseTime || "2 business days";
  const policyUpdated = company.policyUpdated || "13 October 2026";

  return (
    <main data-testid="data-request-page" className="pb-28">
      <PageHero
        testid="data-request-hero"
        eyebrow="Privacy & Data Subject Rights"
        text="Request an export of your information, petition for a correction, or demand full deletion under DPDP Act 2023 and global privacy frameworks. Free of charge, no account login required."
        lines={[
          "Data",
          <span key="highlight" className="font-serif italic font-normal prism-text pr-2">
            requests.
          </span>,
        ]}
      />

      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal delay={0.2} className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b hairline pb-6 text-xs text-dim">
          <span className="font-mono uppercase tracking-wider">Last updated: {policyUpdated}</span>
          <span className="font-mono text-dim">Statutory Response Window: 30 Days</span>
        </Reveal>

        <div className="space-y-14 text-ink">
          {/* Section 1: Data in Apps */}
          <Reveal delay={0.3} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">1. Local on-device app data</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              Because our architecture adheres strictly to an on-device privacy paradigm, all photos, scan documents, caloric diaries, and personal entries remain stored locally in your iPhone&apos;s sandboxed storage.
            </p>
            <div className="rounded-2xl border hairline p-6 bg-ink/[0.015]">
              <ul className="space-y-3 text-sm text-dim">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-ink">Direct Self-Export:</strong> You can export raw records at any time directly within the Settings menu of each app for free (CSV/JSON/PDF).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-ink">Immediate Permanent Erasure:</strong> Deleting an app immediately obliterates its local sandbox and database from your hardware.</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Section 2: Data we hold */}
          <Reveal delay={0.35} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">2. Information we may hold</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              The primary records we retain are limited to direct correspondence you have voluntarily initiated with us (such as customer support dispatches and email attachments). Under the DPDP Act 2023, you have the right to request:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                "A full copy of your correspondence history",
                "Rectification and correction of outdated contact info",
                "Permanent erasure and purge of email archives",
                "Revocation of prior consent",
              ].map((item, i) => (
                <div key={i} className="rounded-lg border hairline p-4 bg-ink/[0.01] text-ink font-medium">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Section 3: How to make a request */}
          <Reveal delay={0.4} className="rounded-2xl border hairline bg-ink/[0.02] p-8 sm:p-10 space-y-6">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              3. How to submit your request
            </h2>
            <ol className="space-y-4 text-sm text-dim list-decimal list-inside">
              <li>
                <strong className="text-ink">Initiate from your verified email:</strong> Email us from the specific email address you originally used when communicating with our team. This serves as our primary non-intrusive identity verification.
              </li>
              <li>
                <strong className="text-ink">Specify your action:</strong> State whether you require data access, correction, or permanent erasure.
              </li>
              <li>
                <strong className="text-ink">Identify the context:</strong> Mention which application or subject matter your correspondence references.
              </li>
            </ol>

            <div className="pt-4">
              <a
                href={`mailto:${privacyEmail}?subject=Data%20Request%20-%20DPDP%20Act`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02]"
              >
                <Mail className="h-4 w-4" /> Start a request via email
              </a>
            </div>
          </Reveal>

          {/* Section 4: What happens next */}
          <Reveal delay={0.45} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">4. Timelines & Escalation</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              We acknowledge receipt within <strong className="text-ink">{responseTime}</strong> and complete all statutory data requests within <strong className="text-ink">30 calendar days</strong> without assessing any administrative fees.
            </p>
            <p className="text-sm leading-relaxed text-dim">
              If you believe your statutory data rights have not been handled adequately, you may escalate directly to our designated{" "}
              <Link to="/privacy#grievance" className="text-ink underline underline-offset-4 font-semibold">
                Grievance Officer
              </Link>{" "}
              under Section 43A of the Information Technology Act.
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
