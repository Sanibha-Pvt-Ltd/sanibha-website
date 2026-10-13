import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const BACKEND_URL =
  (typeof process !== "undefined" && process.env?.REACT_APP_BACKEND_URL) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_BACKEND_URL) ||
  "https://sanibha-studio.preview.emergentagent.com";
const INTERESTS = [
  "Storage Cleaner",
  "Calorie Counter",
  "Plant Identifier",
  "Habit Tracker",
  "Fax",
  "Baby Tracker",
  "Sleep Tracker",
  "Universal TV Remote",
  "Recipe Importer",
  "Document Scanner / PDF Toolkit",
  "AI Resume Builder",
  "Immigration Case Tracker",
  "General",
];
const empty = { name: "", email: "", app_interest: "General", message: "" };

const Field = ({ label, children }) => (
  <label className="block">
    <span className="eyebrow">{label}</span>
    {children}
  </label>
);

const inputCls = "mt-2 w-full border-b hairline bg-transparent pb-3 font-display text-xl outline-none transition-colors placeholder:text-dim/60 focus:border-ink";

export const ContactForm = () => {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!BACKEND_URL) { toast.error("Messaging is unavailable right now."); return; }
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("sent");
      setForm(empty);
      toast.success("Message received — we'll be in touch soon.");
    } catch (err) {
      setStatus("idle");
      const detail = err?.response?.data?.detail;
      toast.error(Array.isArray(detail) ? "Please check your name, email and message." : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={submit} data-testid="contact-form" className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Your name"><input required data-testid="contact-name-input" value={form.name} onChange={set("name")} placeholder="Jane Appleseed" className={inputCls} /></Field>
        <Field label="Email"><input required type="email" data-testid="contact-email-input" value={form.email} onChange={set("email")} placeholder="jane@icloud.com" className={inputCls} /></Field>
      </div>
      <div>
        <span className="eyebrow">About</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((o) => (
            <button type="button" key={o} data-testid={`contact-interest-${o.toLowerCase().replace(/\s/g, "-")}`} onClick={() => setForm({ ...form, app_interest: o })}
              className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${form.app_interest === o ? "border-transparent text-canvas" : "hairline text-dim hover:text-ink"}`}>
              {form.app_interest === o && <motion.span layoutId="interest-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative">{o}</span>
            </button>
          ))}
        </div>
      </div>
      <Field label="Message"><textarea required minLength={2} rows={4} data-testid="contact-message-input" value={form.message} onChange={set("message")} placeholder="Tell us what's on your mind…" className={`${inputCls} resize-none`} /></Field>
      <button type="submit" disabled={status === "sending"} data-testid="contact-form-submit"
        className="group flex items-center gap-3 rounded-full bg-ink py-3 pl-7 pr-3 font-semibold text-canvas transition-transform hover:scale-[1.02] disabled:opacity-70">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={status} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
            {status === "sending" ? "Sending" : status === "sent" ? "Sent — send another?" : "Send message"}
          </motion.span>
        </AnimatePresence>
        <span className="flex h-9 w-9 items-center justify-center rounded-full prism-bg text-white">
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : status === "sent" ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </span>
      </button>
    </form>
  );
};
