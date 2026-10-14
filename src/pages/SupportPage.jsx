import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  RotateCcw,
  Smartphone,
  Download,
  Trash2,
  HeartPulse,
  Mail,
  ExternalLink,
  HelpCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";

export default function SupportPage() {
  const { config } = useSiteContent();
  const company = config?.company || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const supportEmail = company.supportEmail || "support@sanibha.com";
  const responseTime = company.responseTime || "2 business days";

  return (
    <main data-testid="support-page" className="pb-28">
      <PageHero
        testid="support-hero"
        eyebrow="Help & Assistance"
        text="Need assistance with a Sanibha app? We take customer support seriously. Most subscription, refund, and restoration workflows are detailed below."
        lines={[
          "How can we",
          <span key="highlight" className="font-serif italic font-normal prism-text pr-2">
            help you?
          </span>,
        ]}
      />

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Direct Email Header Card */}
        <Reveal delay={0.2} className="mb-14 rounded-3xl border hairline bg-ink/[0.02] p-8 sm:p-10 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-ink" /> Guaranteed Human Reply
              </span>
              <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                Write to human support
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-dim sm:text-base">
                We review every single ticket directly. We reply within <strong className="text-ink">{responseTime}</strong>, Monday to Friday.
              </p>
            </div>
            <a
              href={`mailto:${supportEmail}?subject=Support%20Request`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02] shrink-0"
            >
              <Mail className="h-4 w-4" /> {supportEmail}
            </a>
          </div>

          <div className="mt-8 border-t hairline pt-6 text-xs text-dim">
            <p className="font-medium text-ink mb-2">To help us resolve your issue promptly, please include:</p>
            <ul className="grid gap-2 sm:grid-cols-3 list-disc list-inside">
              <li>App name & installed version</li>
              <li>iPhone model & iOS version</li>
              <li>Expected vs actual result & screenshot</li>
            </ul>
            <p className="mt-3 text-dim/80 italic">
              * Note: Please never send passwords or credit card numbers. We will never ask for them.
            </p>
          </div>
        </Reveal>

        {/* 4 Core Workflows Grid */}
        <div className="mb-16">
          <Reveal delay={0.3} className="mb-8">
            <p className="eyebrow">( Self-Service Solutions )</p>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl mt-2">
              Common account & app questions
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 1. Cancel Subscription */}
            <Reveal delay={0.35} className="flex flex-col justify-between rounded-2xl border hairline p-8 bg-ink/[0.015] hover:border-ink/40 transition-colors">
              <div>
                <div className="h-10 w-10 rounded-xl bg-ink/5 flex items-center justify-center mb-6">
                  <CreditCard className="h-5 w-5 text-ink" />
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-3">
                  Cancel a Subscription
                </h3>
                <p className="text-sm leading-relaxed text-dim mb-4">
                  Subscriptions are billed and managed directly through Apple. Deleting the application does not automatically cancel the subscription.
                </p>
                <ol className="space-y-2 text-xs text-dim list-decimal list-inside bg-ink/[0.02] p-4 rounded-xl">
                  <li>Open <strong className="text-ink">Settings</strong> on your iPhone</li>
                  <li>Tap your <strong className="text-ink">Apple Account name</strong> at the top</li>
                  <li>Tap <strong className="text-ink">Subscriptions</strong></li>
                  <li>Select the app, then tap <strong className="text-ink">Cancel Subscription</strong></li>
                </ol>
              </div>
              <p className="mt-4 text-xs text-dim italic">
                You retain full premium access until the end of your prepaid billing period.
              </p>
            </Reveal>

            {/* 2. Refunds */}
            <Reveal delay={0.4} className="flex flex-col justify-between rounded-2xl border hairline p-8 bg-ink/[0.015] hover:border-ink/40 transition-colors">
              <div>
                <div className="h-10 w-10 rounded-xl bg-ink/5 flex items-center justify-center mb-6">
                  <RotateCcw className="h-5 w-5 text-ink" />
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-3">
                  Request a Refund
                </h3>
                <p className="text-sm leading-relaxed text-dim mb-4">
                  Because payments are processed through Apple App Store in-app purchases, developers cannot issue direct merchant refunds. Apple handles all claims through their dedicated portal.
                </p>
                <div className="text-xs text-dim space-y-2 bg-ink/[0.02] p-4 rounded-xl">
                  <p>1. Visit Apple's dispute portal below.</p>
                  <p>2. Sign in with the Apple ID used for purchase.</p>
                  <p>3. Select &ldquo;Request a refund&rdquo; and specify your reason.</p>
                </div>
              </div>
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4 hover:opacity-80"
              >
                Go to reportaproblem.apple.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Reveal>

            {/* 3. Restore Purchases */}
            <Reveal delay={0.45} className="flex flex-col justify-between rounded-2xl border hairline p-8 bg-ink/[0.015] hover:border-ink/40 transition-colors">
              <div>
                <div className="h-10 w-10 rounded-xl bg-ink/5 flex items-center justify-center mb-6">
                  <Smartphone className="h-5 w-5 text-ink" />
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-3">
                  Restore Purchases
                </h3>
                <p className="text-sm leading-relaxed text-dim mb-4">
                  If you bought a lifetime pass or active subscription and reinstall the app, you will never be charged twice.
                </p>
                <p className="text-xs text-dim leading-relaxed bg-ink/[0.02] p-4 rounded-xl">
                  Open the app, navigate to its Settings or Subscription paywall, and tap <strong className="text-ink">&ldquo;Restore Purchases&rdquo;</strong>. Ensure you are signed in to the identical Apple ID on your iPhone.
                </p>
              </div>
              <p className="mt-4 text-xs text-dim italic">
                Restorations query StoreKit locally and activate in less than 3 seconds.
              </p>
            </Reveal>

            {/* 4. Switching iPhones & Backups */}
            <Reveal delay={0.5} className="flex flex-col justify-between rounded-2xl border hairline p-8 bg-ink/[0.015] hover:border-ink/40 transition-colors">
              <div>
                <div className="h-10 w-10 rounded-xl bg-ink/5 flex items-center justify-center mb-6">
                  <Download className="h-5 w-5 text-ink" />
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-3">
                  Switching Devices & Backups
                </h3>
                <p className="text-sm leading-relaxed text-dim mb-4">
                  Our apps store records locally on your device for strict privacy. When migrating to a new iPhone, standard iCloud Backup or Mac Encrypted Backups seamlessly restore your app databases.
                </p>
                <p className="text-xs text-dim leading-relaxed bg-ink/[0.02] p-4 rounded-xl">
                  You can also export your raw logs into standard JSON/CSV files anytime using the in-app export tool before migrating.
                </p>
              </div>
              <Link
                to="/data-request"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4 hover:opacity-80"
              >
                Learn about data exports <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Health Disclaimer Note */}
        <Reveal delay={0.55} className="rounded-2xl border hairline bg-amber-500/5 border-amber-500/20 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <HeartPulse className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-lg font-medium text-ink mb-1">
                Health & Nutrition Disclaimer
              </h3>
              <p className="text-sm leading-relaxed text-dim">
                Sanibha applications (including calorie, water, and baby trackers) are personal logging and utility tools designed to assist your daily routines. They do not dispense medical, pediatric, or clinical advice. For questions regarding medical diagnoses, dietary interventions, or infant healthcare, always consult a qualified medical professional.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
