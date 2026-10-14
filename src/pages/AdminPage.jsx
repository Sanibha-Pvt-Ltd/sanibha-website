import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  LogOut,
  RotateCcw,
  Download,
  Upload,
  Check,
  Smartphone,
  Layout,
  Grid,
  FileText,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Type,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { APPS } from "@/data/apps";
import { toast } from "sonner";

export default function AdminPage() {
  const {
    config,
    fontThemes = [],
    setFontTheme,
    updateSection,
    toggleAppVisibility,
    setAllAppsVisibility,
    appStatus = {},
    setAppStatus,
    toggleAppStatus,
    setAllAppsStatus,
    isAppComingSoon,
    resetToDefaults,
    exportJSON,
    importJSON,
    isAdminAuth,
    login,
    logout,
  } = useSiteContent();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("apps");
  const [savedBanner, setSavedBanner] = useState(false);
  const [customPreviewText, setCustomPreviewText] = useState("Sanibha Studio · Radiant iOS Utilities");

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setAuthError("");
      toast.success("Welcome, Admin");
    } else {
      setAuthError("Incorrect password. Please try again.");
      toast.error("Incorrect password");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content and visibility to factory defaults?")) {
      resetToDefaults();
      toast.success("All settings reset to defaults");
    }
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importJSON(event.target.result);
      if (res.success) {
        toast.success("Content backup imported successfully!");
      } else {
        toast.error("Import failed: " + res.error);
      }
    };
    reader.readAsText(file);
  };

  const notifySave = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2000);
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN (PASSWORD PROTECTED: bharathsanibha)
  // -------------------------------------------------------------
  if (!isAdminAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07090e] px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0e121a] p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-blue-500 p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0e121a]">
                <Lock className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">Sanibha Studio</h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white/50">Admin Control Panel</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                Studio Passcode
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-11 font-mono text-sm text-white outline-none transition-colors focus:border-amber-400/80"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {authError && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5" /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-blue-500 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition-transform active:scale-[0.98]"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4 text-center">
            <Link to="/" className="text-xs text-white/40 hover:text-white transition-colors">
              ← Return to public website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  const liveCount = Object.values(config.appVisibility).filter(Boolean).length;
  const comingSoonCount = APPS.filter(
    (a) => (config?.appStatus?.[a.id] || "live") === "coming-soon"
  ).length;
  const interactiveLiveCount = APPS.filter(
    (a) => config.appVisibility[a.id] !== false && (config?.appStatus?.[a.id] || "live") === "live"
  ).length;
  const activeFontId = config?.fontTheme || "original";
  const activeFont = (fontThemes && fontThemes.find((f) => f.id === activeFontId)) || fontThemes[0] || { name: "Sanibha 1:1 Original" };

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0d15]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-pink-500">
              <Sliders className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold tracking-tight text-white">Sanibha Studio</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                  Admin Live
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/50">Customization & App Visibility Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("typography")}
              title="Change active font"
              className="hidden md:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Type className="h-3 w-3 text-amber-400" />
              <span>Font: <span className="font-semibold text-white">{activeFont.name}</span></span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span>Live Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <button
              onClick={exportJSON}
              title="Download backup file"
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <label
              title="Upload backup file"
              className="flex cursor-pointer items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Upload className="h-3 w-3" />
              <span className="hidden sm:inline">Restore</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={handleReset}
              title="Reset all settings to initial state"
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20"
            >
              <RotateCcw className="h-3 w-3" />
            </button>

            <button
              onClick={logout}
              title="Log out"
              className="flex items-center gap-1 rounded-xl bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/30"
            >
              <LogOut className="h-3 w-3" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            {
              id: "apps",
              label: "Apps & Interactive State",
              icon: Smartphone,
              badge: comingSoonCount > 0 ? `${interactiveLiveCount} Live · ${comingSoonCount} Coming Soon` : `${liveCount}/12 Live`,
            },
            { id: "typography", label: "Typography & Font", icon: Type, badge: activeFont.name },
            { id: "hero", label: "Hero Section", icon: Layout },
            { id: "bento", label: "Bento Grid", icon: Grid },
            { id: "manifesto", label: "Manifesto", icon: FileText },
            { id: "method", label: "The Method", icon: Sparkles },
            { id: "about", label: "About Page", icon: Layout },
            { id: "contact", label: "Contact & FAQs", icon: HelpCircle },
            { id: "footer", label: "Footer", icon: FileText },
            { id: "company", label: "Company & Legal", icon: ShieldCheck },
          ].map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all ${
                activeTab === id
                  ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg shadow-pink-500/20"
                  : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
              {badge && (
                <span className="rounded-full bg-black/40 px-2 py-0.5 font-mono text-[10px] text-emerald-300 border border-emerald-400/30">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: APPS DISPLAY & INTERACTIVE STATUS CONTROLS */}
        {activeTab === "apps" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:flex-row lg:items-center">
              <div>
                <h2 className="font-display text-xl font-bold text-white flex flex-wrap items-center gap-2">
                  <span>Interactive Apps & Coming Soon Controls</span>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                    {interactiveLiveCount} Live
                  </span>
                  {comingSoonCount > 0 && (
                    <span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 font-mono text-[11px] text-rose-300">
                      {comingSoonCount} Coming Soon
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-sm text-white/60 max-w-2xl leading-relaxed">
                  Switch any interactive app between <span className="text-emerald-400 font-semibold">Live</span> and{" "}
                  <span className="text-rose-400 font-semibold">Coming Soon</span>. When an app is set to{" "}
                  <span className="text-rose-300 font-medium">Coming Soon</span>, its interactive phone window is automatically blurred, all buttons and controls are frozen, and the official red rubber stamp is overlaid.
                </p>
              </div>

              {/* Global Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setAllAppsStatus("live");
                    toast.success("All 12 interactive apps are now LIVE (Full controls operable)");
                  }}
                  className="rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  <span>Set All Live</span>
                </button>
                <button
                  onClick={() => {
                    setAllAppsStatus("coming-soon");
                    toast.warning("All 12 interactive apps are now COMING SOON (Frozen & Stamped)");
                  }}
                  className="rounded-xl border border-rose-500/40 bg-rose-500/20 px-3.5 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/30 transition-all flex items-center gap-1.5"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Set All Coming Soon</span>
                </button>
                <button
                  onClick={() => {
                    setAllAppsVisibility(true);
                    toast.success("All 12 apps are visible on site");
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10"
                >
                  Show All
                </button>
              </div>
            </div>

            {/* Apps Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {APPS.map((app) => {
                const isVisible = config.appVisibility[app.id] !== false;
                const isComingSoon = (config?.appStatus?.[app.id] || "live") === "coming-soon";
                const Icon = app.Icon;

                return (
                  <motion.div
                    key={app.id}
                    layout
                    className={`relative flex flex-col justify-between rounded-3xl border p-5 transition-all ${
                      !isVisible
                        ? "border-white/5 bg-white/[0.01] opacity-50"
                        : isComingSoon
                        ? "border-rose-500/30 bg-rose-500/[0.03] shadow-lg shadow-black/40"
                        : "border-white/15 bg-white/[0.04] shadow-lg shadow-black/40"
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon + Number + Status Badges */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-2xl"
                            style={{ background: isVisible ? app.accent : "#333" }}
                          >
                            <Icon className="h-5 w-5 text-black" />
                          </span>
                          <div>
                            <span className="font-mono text-[10px] text-white/40">{app.no}</span>
                            <h3 className="font-display text-base font-semibold text-white leading-tight">
                              {app.name}
                            </h3>
                          </div>
                        </div>

                        {/* Interactive Mode Badge */}
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border ${
                            isComingSoon
                              ? "border-rose-500/50 bg-rose-500/20 text-rose-300"
                              : "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {isComingSoon ? "COMING SOON" : "LIVE DEMO"}
                        </span>
                      </div>

                      <p className="mt-3 font-serif text-sm italic text-white/70 line-clamp-1">{app.tagline}</p>
                      <p className="mt-1 text-xs text-white/50 line-clamp-2 leading-relaxed">{app.blurb}</p>

                      {/* Visual Stamp Indicator when Coming Soon */}
                      {isComingSoon && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 p-2.5 text-rose-200">
                          <img
                            src="/img/coming-soon-stamp.png"
                            alt="Stamp"
                            className="h-8 w-8 object-contain drop-shadow shrink-0"
                          />
                          <span className="text-[11px] font-medium leading-tight">
                            Interactive screen is blurred, frozen & stamped with Coming Soon
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Controls Row */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4">
                      {/* Interactive Mode Segmented Toggle */}
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1.5">
                          Interactive App Status
                        </span>
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-black/40 p-1">
                          <button
                            onClick={() => {
                              setAppStatus(app.id, "live");
                              toast.success(`${app.name} is now LIVE and interactive`);
                            }}
                            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                              !isComingSoon
                                ? "bg-emerald-500 text-black shadow-md font-bold"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            <Check className="h-3 w-3 stroke-[3]" /> Live
                          </button>
                          <button
                            onClick={() => {
                              setAppStatus(app.id, "coming-soon");
                              toast.warning(`${app.name} is now COMING SOON (Frozen & Stamped)`);
                            }}
                            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                              isComingSoon
                                ? "bg-rose-500 text-white shadow-md font-bold"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            <AlertCircle className="h-3 w-3" /> Coming Soon
                          </button>
                        </div>
                      </div>

                      {/* Public Visibility Toggle */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-white/40">
                          {isVisible ? "Visible on site" : "Hidden from site"}
                        </span>
                        <button
                          onClick={() => {
                            toggleAppVisibility(app.id);
                            toast.success(`${app.name} is now ${isVisible ? "Hidden" : "Visible"}`);
                          }}
                          className="font-mono text-[11px] text-white/50 hover:text-white transition-colors underline underline-offset-4"
                        >
                          {isVisible ? "Hide from site" : "Show on site"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY & FONT SYSTEM */}
        {activeTab === "typography" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 text-black">
                      <Type className="h-4 w-4" />
                    </span>
                    <h2 className="font-display text-xl font-bold text-white">
                      Studio Typography & Sleek Font System
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-white/60 max-w-2xl">
                    Select a sleek, modern font family for the studio. Your selection updates{" "}
                    <span className="text-amber-300 font-medium">all headlines, body text, buttons, and the giant footer wordmark</span> in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2">
                  <span className="font-mono text-xs text-white/50">Active:</span>
                  <span className="font-semibold text-emerald-400 text-sm">{activeFont.name}</span>
                  <span className="text-xs text-white/40">({activeFont.subtitle})</span>
                </div>
              </div>

              {/* Custom Preview Live Tester */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Live Test Phrase (type any text to preview below)
                </label>
                <input
                  type="text"
                  value={customPreviewText}
                  onChange={(e) => setCustomPreviewText(e.target.value)}
                  placeholder="Type any test phrase..."
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Font Options Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {fontThemes.map((font) => {
                const isSelected = activeFontId === font.id;
                return (
                  <div
                    key={font.id}
                    onClick={() => {
                      setFontTheme(font.id);
                      toast.success(`Active font updated to ${font.name}`);
                      notifySave();
                    }}
                    className={`cursor-pointer group relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/[0.08] shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: font.display }}>
                              {font.name}
                            </h3>
                            {font.id === "original" && (
                              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
                                Exact 1:1 Match
                              </span>
                            )}
                            {font.id === "urbanist" && (
                              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300 border border-amber-400/30">
                                Geometric Sleek
                              </span>
                            )}
                            {font.id === "geist" && (
                              <span className="rounded-full bg-blue-400/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-blue-300 border border-blue-400/30">
                                Linear / Vercel Style
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 font-mono text-xs text-white/50">{font.subtitle}</p>
                        </div>

                        {isSelected ? (
                          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                            <Check className="h-3.5 w-3.5 stroke-[3]" /> Active
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 transition-colors group-hover:bg-amber-500 group-hover:text-black"
                          >
                            Activate
                          </button>
                        )}
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-white/60">
                        {font.description}
                      </p>

                      {/* Live Specimen Preview */}
                      <div className="mt-5 space-y-3 rounded-2xl border border-white/5 bg-black/40 p-4">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                            Display Specimen (Headline)
                          </span>
                          <p
                            className="mt-1 text-xl font-medium tracking-tight text-white"
                            style={{ fontFamily: font.display }}
                          >
                            {customPreviewText || "Utilities that radiate pure clarity."}
                          </p>
                        </div>

                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                            Body Specimen (Interface)
                          </span>
                          <p
                            className="mt-1 text-xs leading-relaxed text-white/80"
                            style={{ fontFamily: font.body }}
                          >
                            Sanibha means one who resembles a bright light. We craft zero-noise iOS utilities with native SwiftUI responsiveness.
                          </p>
                        </div>

                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                            Numerics & Data
                          </span>
                          <p
                            className="mt-1 font-mono text-xs tracking-wider text-amber-300/90"
                          >
                            01 · 60 FPS · 100% Swift · &lt; 15MB · $0.00
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-white/50">
                      <span>CSS: <code className="font-mono text-white/70">{font.id}</code></span>
                      <span className="font-medium text-amber-400 group-hover:underline">
                        {isSelected ? "Currently rendered live" : "Click card to apply live →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Wordmark Preview Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/50">
                    Live Giant Footer Wordmark Specimen (Rendering in {activeFont.name})
                  </h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    This verifies that large letters (like the 21vw footer signature) look sleek, elegant, and balanced with no awkward quirks.
                  </p>
                </div>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-300">
                  {activeFont.name} Active
                </span>
              </div>

              <div className="mt-6 flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#080a10] py-12">
                <span
                  className="prism-text select-none text-6xl font-medium tracking-tight sm:text-8xl md:text-9xl"
                  style={{ fontFamily: activeFont.display }}
                >
                  sanibha
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HERO SECTION CUSTOMIZATION */}
        {activeTab === "hero" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Hero Section Copy</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={config.hero.eyebrow}
                  onChange={(e) => updateSection("hero", { eyebrow: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Rotating Badge Text
                </label>
                <input
                  type="text"
                  value={config.hero.badgeText}
                  onChange={(e) => updateSection("hero", { badgeText: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Heading Line 1
                </label>
                <input
                  type="text"
                  value={config.hero.headingPart1}
                  onChange={(e) => updateSection("hero", { headingPart1: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Heading Highlight Word (Italic Serif)
                </label>
                <input
                  type="text"
                  value={config.hero.headingHighlight}
                  onChange={(e) => updateSection("hero", { headingHighlight: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Heading Line 2
                </label>
                <input
                  type="text"
                  value={config.hero.headingPart2}
                  onChange={(e) => updateSection("hero", { headingPart2: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={config.hero.description}
                  onChange={(e) => updateSection("hero", { description: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Primary CTA Button
                </label>
                <input
                  type="text"
                  value={config.hero.ctaPrimaryText}
                  onChange={(e) => updateSection("hero", { ctaPrimaryText: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Secondary CTA Button
                </label>
                <input
                  type="text"
                  value={config.hero.ctaSecondaryText}
                  onChange={(e) => updateSection("hero", { ctaSecondaryText: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BENTO GRID CUSTOMIZATION */}
        {activeTab === "bento" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Bento Grid Cards & Image</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Prismatic Background Image URL / Path
                </label>
                <input
                  type="text"
                  value={config.bento.prismaticImage}
                  onChange={(e) => updateSection("bento", { prismaticImage: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Prismatic Card Title
                </label>
                <input
                  type="text"
                  value={config.bento.prismaticTitle}
                  onChange={(e) => updateSection("bento", { prismaticTitle: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Prismatic Card Description
                </label>
                <input
                  type="text"
                  value={config.bento.prismaticDesc}
                  onChange={(e) => updateSection("bento", { prismaticDesc: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Swift Native Card Title
                </label>
                <input
                  type="text"
                  value={config.bento.swiftTitle}
                  onChange={(e) => updateSection("bento", { swiftTitle: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Swift Native Card Description
                </label>
                <input
                  type="text"
                  value={config.bento.swiftDesc}
                  onChange={(e) => updateSection("bento", { swiftDesc: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Haptics Card Title
                </label>
                <input
                  type="text"
                  value={config.bento.hapticsTitle}
                  onChange={(e) => updateSection("bento", { hapticsTitle: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Haptics Card Description
                </label>
                <input
                  type="text"
                  value={config.bento.hapticsDesc}
                  onChange={(e) => updateSection("bento", { hapticsDesc: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Acoustic Audio Title
                </label>
                <input
                  type="text"
                  value={config.bento.audioTitle}
                  onChange={(e) => updateSection("bento", { audioTitle: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Acoustic Audio Description
                </label>
                <input
                  type="text"
                  value={config.bento.audioDesc}
                  onChange={(e) => updateSection("bento", { audioDesc: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MANIFESTO CUSTOMIZATION */}
        {activeTab === "manifesto" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Manifesto & Philosophy</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Eyebrow
                </label>
                <input
                  type="text"
                  value={config.manifesto.eyebrow}
                  onChange={(e) => updateSection("manifesto", { eyebrow: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Highlight Word
                </label>
                <input
                  type="text"
                  value={config.manifesto.titleHighlight}
                  onChange={(e) => updateSection("manifesto", { titleHighlight: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Philosophy Paragraph
                </label>
                <textarea
                  rows={3}
                  value={config.manifesto.paragraph}
                  onChange={(e) => updateSection("manifesto", { paragraph: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              {/* 4 Stats */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Stat 1 (Value / Label)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    value={config.manifesto.stat1Value}
                    onChange={(e) => updateSection("manifesto", { stat1Value: e.target.value })}
                    className="w-1/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    value={config.manifesto.stat1Label}
                    onChange={(e) => updateSection("manifesto", { stat1Label: e.target.value })}
                    className="w-2/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Stat 2 (Value / Label)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    value={config.manifesto.stat2Value}
                    onChange={(e) => updateSection("manifesto", { stat2Value: e.target.value })}
                    className="w-1/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    value={config.manifesto.stat2Label}
                    onChange={(e) => updateSection("manifesto", { stat2Label: e.target.value })}
                    className="w-2/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Stat 3 (Value / Label)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    value={config.manifesto.stat3Value}
                    onChange={(e) => updateSection("manifesto", { stat3Value: e.target.value })}
                    className="w-1/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    value={config.manifesto.stat3Label}
                    onChange={(e) => updateSection("manifesto", { stat3Label: e.target.value })}
                    className="w-2/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Stat 4 (Value / Label)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    value={config.manifesto.stat4Value}
                    onChange={(e) => updateSection("manifesto", { stat4Value: e.target.value })}
                    className="w-1/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    value={config.manifesto.stat4Label}
                    onChange={(e) => updateSection("manifesto", { stat4Label: e.target.value })}
                    className="w-2/3 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: THE METHOD */}
        {activeTab === "method" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">The Sanibha Method Steps</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Eyebrow
                </label>
                <input
                  type="text"
                  value={config.method.eyebrow}
                  onChange={(e) => updateSection("method", { eyebrow: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Title Highlight Word
                </label>
                <input
                  type="text"
                  value={config.method.titleHighlight}
                  onChange={(e) => updateSection("method", { titleHighlight: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">4 Process Steps</h3>
              {config.method.steps.map((step, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-amber-400">{step.no}</span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...config.method.steps];
                        newSteps[idx].title = e.target.value;
                        updateSection("method", { steps: newSteps });
                      }}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={step.desc}
                    onChange={(e) => {
                      const newSteps = [...config.method.steps];
                      newSteps[idx].desc = e.target.value;
                      updateSection("method", { steps: newSteps });
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/80"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ABOUT PAGE */}
        {activeTab === "about" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">About Page Content</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Hero Eyebrow
                </label>
                <input
                  type="text"
                  value={config.about.heroEyebrow}
                  onChange={(e) => updateSection("about", { heroEyebrow: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Banner Image URL / Path
                </label>
                <input
                  type="text"
                  value={config.about.bannerImage}
                  onChange={(e) => updateSection("about", { bannerImage: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Heading Line 1
                </label>
                <input
                  type="text"
                  value={config.about.heroTitlePart1}
                  onChange={(e) => updateSection("about", { heroTitlePart1: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Heading Highlight Word
                </label>
                <input
                  type="text"
                  value={config.about.heroTitleHighlight}
                  onChange={(e) => updateSection("about", { heroTitleHighlight: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Story Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={config.about.storyParagraph1}
                  onChange={(e) => updateSection("about", { storyParagraph1: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Story Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={config.about.storyParagraph2}
                  onChange={(e) => updateSection("about", { storyParagraph2: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">4 Core Principles</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {config.about.principles.map((pr, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                    <input
                      type="text"
                      value={pr.title}
                      onChange={(e) => {
                        const newPr = [...config.about.principles];
                        newPr[idx].title = e.target.value;
                        updateSection("about", { principles: newPr });
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white"
                    />
                    <textarea
                      rows={2}
                      value={pr.desc}
                      onChange={(e) => {
                        const newPr = [...config.about.principles];
                        newPr[idx].desc = e.target.value;
                        updateSection("about", { principles: newPr });
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CONTACT & FAQS */}
        {activeTab === "contact" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Contact Page & FAQ Accordion</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={config.contact.email}
                  onChange={(e) => updateSection("contact", { email: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Studio Address / Base
                </label>
                <input
                  type="text"
                  value={config.contact.address}
                  onChange={(e) => updateSection("contact", { address: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Hero Title Line 1
                </label>
                <input
                  type="text"
                  value={config.contact.heroTitlePart1}
                  onChange={(e) => updateSection("contact", { heroTitlePart1: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Hero Highlight Word
                </label>
                <input
                  type="text"
                  value={config.contact.heroTitleHighlight}
                  onChange={(e) => updateSection("contact", { heroTitleHighlight: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* FAQs Accordion Manager */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">FAQ Items</h3>
                <button
                  onClick={() => {
                    const newFaqs = [
                      ...config.contact.faqs,
                      { q: "New Question Title", a: "Answer text goes here..." },
                    ];
                    updateSection("contact", { faqs: newFaqs });
                    toast.success("Added new FAQ item");
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20"
                >
                  <Plus className="h-3 w-3" /> Add FAQ Item
                </button>
              </div>

              <div className="space-y-3">
                {config.contact.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const newFaqs = [...config.contact.faqs];
                          newFaqs[idx].q = e.target.value;
                          updateSection("contact", { faqs: newFaqs });
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white"
                        placeholder="Question..."
                      />
                      <button
                        onClick={() => {
                          const newFaqs = config.contact.faqs.filter((_, i) => i !== idx);
                          updateSection("contact", { faqs: newFaqs });
                          toast.success("FAQ removed");
                        }}
                        className="text-white/40 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => {
                        const newFaqs = [...config.contact.faqs];
                        newFaqs[idx].a = e.target.value;
                        updateSection("contact", { faqs: newFaqs });
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/80"
                      placeholder="Answer..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: FOOTER */}
        {activeTab === "footer" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Footer Copy</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Giant Wordmark
                </label>
                <input
                  type="text"
                  value={config.footer.wordmark}
                  onChange={(e) => updateSection("footer", { wordmark: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Tagline
                </label>
                <input
                  type="text"
                  value={config.footer.tagline}
                  onChange={(e) => updateSection("footer", { tagline: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={config.footer.copyright}
                  onChange={(e) => updateSection("footer", { copyright: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: COMPANY & LEGAL COMPLIANCE */}
        {activeTab === "company" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" /> Company Identity & Legal Compliance
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  Manage official statutory registration details for Sanibha Private Limited. Synchronizes live with all legal pages, verification headers, and Apple App Store compliance documents.
                </p>
              </div>

              {/* Quick links to live legal pages */}
              <div className="flex flex-wrap gap-2 text-xs">
                <Link
                  to="/privacy"
                  target="_blank"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-1.5"
                >
                  <span>/privacy</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  to="/terms"
                  target="_blank"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-1.5"
                >
                  <span>/terms</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  to="/support"
                  target="_blank"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-1.5"
                >
                  <span>/support</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  to="/data-request"
                  target="_blank"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-1.5"
                >
                  <span>/data-request</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Corporate Profile */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber-400">
                1. Corporate Profile & Jurisdiction
              </h3>
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Legal Entity Name
                  </label>
                  <input
                    type="text"
                    value={config.company?.legalName || ""}
                    onChange={(e) => updateSection("company", { legalName: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                    placeholder="Sanibha Private Limited"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Corporate Country
                  </label>
                  <input
                    type="text"
                    value={config.company?.country || ""}
                    onChange={(e) => updateSection("company", { country: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                    placeholder="India"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    CIN (Registration Number)
                  </label>
                  <input
                    type="text"
                    value={config.company?.cin || ""}
                    onChange={(e) => updateSection("company", { cin: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                    placeholder="Optional (e.g. U72200HR2026PTC...)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Full Registered Office Address (One Line)
                  </label>
                  <input
                    type="text"
                    value={config.company?.addressOneLine || ""}
                    onChange={(e) => updateSection("company", { addressOneLine: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Jurisdiction City
                  </label>
                  <input
                    type="text"
                    value={config.company?.jurisdictionCity || ""}
                    onChange={(e) => updateSection("company", { jurisdictionCity: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                    placeholder="Gurugram, Haryana"
                  />
                </div>
              </div>
            </div>

            {/* Officers & Statutory Compliance */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                2. Grievance Officer & Statutory Timelines (DPDP Act 2023)
              </h3>
              <div className="grid gap-5 md:grid-cols-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Grievance Officer Name
                  </label>
                  <input
                    type="text"
                    value={config.company?.grievanceOfficer || ""}
                    onChange={(e) => updateSection("company", { grievanceOfficer: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Officer Designation
                  </label>
                  <input
                    type="text"
                    value={config.company?.grievanceTitle || ""}
                    onChange={(e) => updateSection("company", { grievanceTitle: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    SLA Response Window
                  </label>
                  <input
                    type="text"
                    value={config.company?.responseTime || ""}
                    onChange={(e) => updateSection("company", { responseTime: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                    placeholder="2 business days"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Policy Last Updated
                  </label>
                  <input
                    type="text"
                    value={config.company?.policyUpdated || ""}
                    onChange={(e) => updateSection("company", { policyUpdated: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Support & Privacy Communications */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-sky-400">
                3. Channels & Hosting Infrastructure
              </h3>
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Customer Support Email
                  </label>
                  <input
                    type="email"
                    value={config.company?.supportEmail || ""}
                    onChange={(e) => {
                      updateSection("company", { supportEmail: e.target.value });
                      updateSection("contact", { email: e.target.value });
                    }}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Privacy / Data Subject Email
                  </label>
                  <input
                    type="email"
                    value={config.company?.privacyEmail || ""}
                    onChange={(e) => updateSection("company", { privacyEmail: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Hosting Provider Notice
                  </label>
                  <input
                    type="text"
                    value={config.company?.hostingProvider || ""}
                    onChange={(e) => updateSection("company", { hostingProvider: e.target.value })}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
