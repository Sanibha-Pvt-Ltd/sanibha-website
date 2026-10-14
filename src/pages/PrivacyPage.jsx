import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Mail, MapPin, UserCheck, Clock, ExternalLink, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";

export default function PrivacyPage() {
  const { config } = useSiteContent();
  const company = config?.company || {};
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const legalName = company.legalName || "Sanibha Private Limited";
  const addressOneLine = company.addressOneLine || "451P, 2nd Floor, The Palm Crest, Sector 50, Gurgaon, Haryana 122018, India";
  const addressLines = company.addressLines || [
    "451P, 2nd Floor, The Palm Crest",
    "Sector 50, Gurgaon",
    "Haryana 122018, India",
  ];
  const supportEmail = company.supportEmail || "support@sanibha.com";
  const grievanceOfficer = company.grievanceOfficer || "Bharat Bhatia";
  const grievanceTitle = company.grievanceTitle || "Director";
  const responseTime = company.responseTime || "2 business days";
  const policyUpdated = company.policyUpdated || "13 October 2026";
  const hostingProvider = company.hostingProvider || "Vercel / Cloudflare";

  return (
    <main data-testid="privacy-page" className="pb-28">
      <PageHero
        testid="privacy-hero"
        eyebrow="Statutory Privacy"
        text="This policy covers the Sanibha website (sanibha.com). It states what the site collects, what it doesn't, and how to reach our grievance officer."
        lines={[
          "Privacy",
          <span key="highlight" className="font-serif italic font-normal prism-text pr-2">
            policy.
          </span>,
        ]}
      />

      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal delay={0.2} className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b hairline pb-6 text-xs text-dim">
          <span className="font-mono uppercase tracking-wider">Last updated: {policyUpdated}</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> DPDP Act 2023 & GDPR Compliant
          </span>
        </Reveal>

        {/* App isolation callout */}
        <Reveal delay={0.3} className="mb-12 rounded-2xl border hairline bg-ink/[0.02] p-6 backdrop-blur-sm sm:p-8">
          <p className="text-base leading-relaxed text-ink">
            <strong>Our apps have their own privacy policies.</strong> Each individual app's policy explains what that app does with your information. This page specifically applies to the public website at <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-xs">sanibha.com</code>.
          </p>
        </Reveal>

        {/* Document Body */}
        <div className="space-y-14 text-ink">
          {/* 1. Who we are */}
          <Reveal delay={0.35} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">1. Who we are</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              The website is operated by <strong className="text-ink">{legalName}</strong>, a company registered in India, with its registered corporate office at <span className="text-ink">{addressOneLine}</span>. In this policy, &ldquo;we&rdquo;, &ldquo;our&rdquo;, and &ldquo;us&rdquo; refer to {legalName}.
            </p>
          </Reveal>

          {/* 2. What we collect */}
          <Reveal delay={0.4} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">2. What we collect</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border hairline p-6 bg-ink/[0.015]">
                <h3 className="font-display text-lg font-medium text-ink mb-2">Technical logs</h3>
                <p className="text-sm leading-relaxed text-dim">
                  Our hosting infrastructure ({hostingProvider}) processes essential technical signals when your browser requests a page (IP address, requested path, browser type, and timestamp) solely to deliver assets securely, detect DDoS attacks, and prevent abuse.
                </p>
              </div>
              <div className="rounded-xl border hairline p-6 bg-ink/[0.015]">
                <h3 className="font-display text-lg font-medium text-ink mb-2">What you send us</h3>
                <p className="text-sm leading-relaxed text-dim">
                  If you email us directly or submit a statutory data request, we receive your email address and any text or attachments you choose to send. We use this strictly to respond to your inquiry and maintain records.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 3. What we don't do */}
          <Reveal delay={0.45} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">3. What we don't do</h2>
            <p className="text-base text-dim">We design for total absence of surveillance. On this site:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Zero tracking cookies or persistent identifiers",
                "Zero advertising pixels or 3rd-party telemetry",
                "No required user accounts, passwords or lock-in",
                "We never sell or monetise your personal data",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border hairline p-4 bg-ink/[0.01]">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-ink">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-dim italic pt-2">
              If we ever introduce any of these in the future, we will update this policy first and highlight the change on our home page.
            </p>
          </Reveal>

          {/* 4. Who we share information with */}
          <Reveal delay={0.5} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">4. Who we share information with</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              We share information only with trusted operational infrastructure partners necessary to host the site and reply to support inquiries (such as {hostingProvider} and Google Workspace for email delivery), or where required by statutory court order or law. These providers may process data across globally certified secure data centers.
            </p>
          </Reveal>

          {/* 5. Retention */}
          <Reveal delay={0.55} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">5. How long we retain data</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              Server network edge logs are retained by our hosting provider for short operational cycles under their standard rotation settings. Correspondence received via email is retained only as long as necessary to assist you and satisfy statutory accounting obligations, after which it is permanently purged.
            </p>
          </Reveal>

          {/* 6. Your Rights */}
          <Reveal delay={0.6} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">6. Your rights (DPDP Act, 2023 & GDPR)</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              Depending on where you live — including under India's Digital Personal Data Protection Act, 2023 (DPDPA), the EU/UK GDPR, and US State Privacy Laws — you have the statutory right to request confirmation of data held, access a readable copy, demand correction or erasure, or withdraw previously granted consent.
            </p>
            <div className="pt-2">
              <Link
                to="/data-request"
                className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-canvas"
              >
                Submit a Data Request <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* 7. Children */}
          <Reveal delay={0.65} className="space-y-4">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">7. Children's Privacy</h2>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              Our website is not targeted at children under 13 years of age, and we do not knowingly solicit or collect personal information from minors. If you believe a child has provided us with personal information, please notify us immediately and we will promptly delete it.
            </p>
          </Reveal>

          {/* 8. Grievance Officer */}
          <Reveal delay={0.7} className="scroll-mt-32 space-y-4" id="grievance">
            <div className="rounded-2xl border hairline bg-ink/[0.02] p-6 sm:p-10">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-dim mb-4">
                <UserCheck className="h-4 w-4 text-ink" /> Statutory Appointment
              </div>
              <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl mb-4">
                Grievance Officer
              </h2>
              <p className="text-base leading-relaxed text-dim mb-8">
                In compliance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, the designated Grievance Officer for {legalName} is:
              </p>

              <dl className="grid gap-6 sm:grid-cols-2 border-t hairline pt-6 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-dim">Name & Title</dt>
                  <dd className="mt-1 font-semibold text-ink text-base">{grievanceOfficer}</dd>
                  <dd className="text-dim text-xs">{grievanceTitle}, {legalName}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-dim">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${supportEmail}`} className="font-mono text-ink underline underline-offset-4 hover:opacity-80">
                      {supportEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-dim">Registered Address</dt>
                  <dd className="mt-1 text-dim leading-relaxed">
                    {addressLines.map((l, i) => (
                      <span key={i} className="block">{l}</span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-dim">Response Timelines</dt>
                  <dd className="mt-1 text-dim">
                    Acknowledgment within <strong className="text-ink">{responseTime}</strong>. Redressal within <strong className="text-ink">30 calendar days</strong>.
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* 9. Contact */}
          <Reveal delay={0.75} className="space-y-4 border-t hairline pt-10">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Questions?</h2>
            <p className="text-base leading-relaxed text-dim">
              If you have any questions about this privacy statement, please write to us at{" "}
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
