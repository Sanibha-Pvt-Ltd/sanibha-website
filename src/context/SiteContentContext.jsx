import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "sanibha_site_config_v1";
const AUTH_KEY = "sanibha_admin_auth_v1";
export const ADMIN_PASSWORD = "bharathsanibha";

export const FONT_THEMES = [
  {
    id: "original",
    name: "Sanibha 1:1 Original",
    subtitle: "Bricolage Grotesque + Manrope + Instrument Serif",
    description: "Exact 1:1 typography from sanibha-studio: Bricolage Grotesque for bold display titles, Instrument Serif for radiant italic highlights, Manrope for clean body copy, and JetBrains Mono for monospace metadata.",
    display: "'Bricolage Grotesque', sans-serif",
    body: "'Manrope', sans-serif",
  },
  {
    id: "urbanist",
    name: "Urbanist",
    subtitle: "Geometric Architectural",
    description: "Ultra-clean, modern geometric lines with perfectly balanced proportions and zero quirks. Crisp, sleek, and high-end.",
    display: "'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: "geist",
    name: "Geist",
    subtitle: "Modern Software Precision",
    description: "Designed by Vercel for software craftspeople. Razor-sharp, engineered, and disciplined. The gold standard for modern tech minimalism.",
    display: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: "outfit",
    name: "Outfit",
    subtitle: "Contemporary Refined Neo-Grotesque",
    description: "Smooth, friendly, modern geometric curves crafted for premium mobile interfaces and Apple-inspired clarity.",
    display: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: "sora",
    name: "Sora",
    subtitle: "Cybernetic Interface",
    description: "Tailored for digital screens with distinctive geometric character and sleek mechanical curves.",
    display: "'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: "syne",
    name: "Syne",
    subtitle: "Avant-Garde Studio",
    description: "Expressive editorial fashion-forward display font paired with clean body text for high-concept luxury aesthetics.",
    display: "'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Manrope', sans-serif",
  },
];

export const DEFAULT_CONFIG = {
  // 0. Typography Theme (Default is exact 1:1 original from reference site)
  fontTheme: "original",

  // 1. App Visibility (Live vs Offline)
  appVisibility: {
    "storage-cleaner": true,
    "baby-tracker": true,
    "resume-builder": true,
    "calorie-counter": true,
    "plant-identifier": true,
    "habit-tracker": true,
    "fax": true,
    "sleep-tracker": true,
    "tv-remote": true,
    "recipe-importer": true,
    "pdf-toolkit": true,
    "immigration-tracker": true,
  },

  // 2. Hero Section
  hero: {
    eyebrow: "Sanibha · iOS utility studio",
    headingPart1: "Utilities that",
    headingHighlight: "radiate",
    headingPart2: "pure clarity.",
    description:
      "Sanibha means one who resembles a bright light. We build iOS apps in that spirit — simple, graceful tools that make everyday life a little brighter.",
    ctaPrimaryText: "Explore our apps",
    ctaSecondaryText: "Our story",
    badgeText: "Radiant iOS Utilities • Crafted with Care •",
  },

  // 3. Bento Grid
  bento: {
    prismaticTitle: "Prismatic clarity",
    prismaticDesc: "Every interaction is tuned to feel natural and instantaneous.",
    prismaticImage: "/img/prism.jpg",
    swiftTitle: "100% Swift",
    swiftDesc: "Native frameworks, zero web wrappers, zero compromise.",
    hapticsTitle: "Tactile haptics",
    hapticsDesc: "Engineered to feel physical through the Apple Taptic Engine.",
    audioTitle: "Acoustic calm",
    audioDesc: "Subtle binaural feedback tones crafted in-house.",
  },

  // 4. Manifesto Section
  manifesto: {
    eyebrow: "( Our philosophy )",
    titlePart1: "We craft tools that",
    titleHighlight: "respect",
    titlePart2: "your attention.",
    paragraph:
      "The modern App Store is cluttered with subscriptions, ads, and notification traps. Sanibha exists as an antidote. We believe the best utilities do their job in seconds and get out of your way.",
    stat1Value: "100%",
    stat1Label: "Native Swift & SwiftUI",
    stat2Value: "0",
    stat2Label: "Ad trackers or analytics SDKs",
    stat3Value: "< 15MB",
    stat3Label: "Featherweight download size",
    stat4Value: "60 FPS",
    stat4Label: "Fluid pro-motion responsiveness",
  },

  // 5. The Sanibha Method
  method: {
    eyebrow: "( The Sanibha method )",
    titlePart1: "From spark to",
    titleHighlight: "radiance.",
    steps: [
      {
        no: "01",
        title: "Distill the core",
        desc: "Strip every non-essential feature until only the pure, focused utility remains.",
      },
      {
        no: "02",
        title: "Native engineering",
        desc: "Handcrafted using Swift, Metal, and CoreData for instant, local responsiveness.",
      },
      {
        no: "03",
        title: "Tactile choreography",
        desc: "Calibrated haptic feedback, acoustic chimes, and smooth physical spring curves.",
      },
      {
        no: "04",
        title: "Privacy by default",
        desc: "On-device processing. Your files, logs, and photos never touch our servers.",
      },
    ],
  },

  // 6. About Page
  about: {
    heroEyebrow: "About the studio",
    heroTitlePart1: "A studio named for a",
    heroTitleHighlight: "bright light.",
    bannerImage: "/img/prism.jpg",
    storyParagraph1:
      "Sanibha is an ancient Sanskrit word meaning 'resembling light' or 'radiant'. We chose this name because we believe utility apps should bring clarity, warmth, and ease to your everyday digital rituals.",
    storyParagraph2:
      "Every app we make is engineered for iOS from the ground up. We do not use cross-platform web wrappers, ad SDKs, or aggressive push notifications.",
    principles: [
      {
        title: "Zero Noise",
        desc: "No banner ads, no popups, no review nagging. Just clean craftsmanship.",
      },
      {
        title: "Native First",
        desc: "Harnessing the full performance and efficiency of Apple Silicon.",
      },
      {
        title: "Light & Fast",
        desc: "Sub-second launch times and featherweight storage footprints.",
      },
      {
        title: "Respect by Default",
        desc: "Your phone is deeply personal. We treat your focus with complete reverence.",
      },
    ],
  },

  // 7. Contact & FAQ
  contact: {
    heroEyebrow: "Direct access",
    heroTitlePart1: "Say hello.",
    heroTitleHighlight: "We're listening.",
    email: "support@sanibha.com",
    address: "451P, 2nd Floor, The Palm Crest, Sector 50, Gurgaon, Haryana 122018, India",
    faqs: [
      {
        q: "Are Sanibha apps one-time purchases or subscriptions?",
        a: "All of our utility apps are designed with upfront lifetime access or honest, transparent pricing. We do not believe in hidden renewals or deceptive dark patterns.",
      },
      {
        q: "Do your apps collect any personal telemetry or data?",
        a: "No. All processing — from photo cleanup and calorie math to plant vision and OCR scanning — takes place on your device via CoreML and Apple Silicon.",
      },
      {
        q: "Which iOS versions are supported?",
        a: "Our apps are optimized for iOS 17 and iOS 18, taking full advantage of Interactive Widgets, Dynamic Island, and ProMotion displays.",
      },
      {
        q: "How can I request a new feature or utility?",
        a: "Send us a note through the contact form or email support@sanibha.com. We read every single dispatch directly.",
      },
    ],
  },

  // 8. Footer
  footer: {
    wordmark: "sanibha",
    tagline: "Utilities as pure and radiant as a bright light.",
    copyright: "© 2026 Sanibha Private Limited. All rights reserved.",
  },

  // 9. Company Legal & Platform Compliance
  company: {
    legalName: "Sanibha Private Limited",
    cin: "",
    country: "India",
    addressLines: [
      "451P, 2nd Floor, The Palm Crest",
      "Sector 50, Gurgaon",
      "Haryana 122018, India",
    ],
    addressOneLine: "451P, 2nd Floor, The Palm Crest, Sector 50, Gurgaon, Haryana 122018, India",
    jurisdictionCity: "Gurugram, Haryana",
    founder: "Bharat Bhatia",
    yearFounded: "2026",
    supportEmail: "support@sanibha.com",
    privacyEmail: "support@sanibha.com",
    responseTime: "2 business days",
    grievanceOfficer: "Bharat Bhatia",
    grievanceTitle: "Director",
    policyUpdated: "13 October 2026",
    hostingProvider: "Vercel / Cloudflare",
  },
};

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          fontTheme: (parsed.fontTheme && parsed.fontTheme !== "urbanist" && FONT_THEMES.some((f) => f.id === parsed.fontTheme))
            ? parsed.fontTheme
            : "original",
          appVisibility: {
            ...DEFAULT_CONFIG.appVisibility,
            ...(parsed.appVisibility || {}),
          },
          company: {
            ...DEFAULT_CONFIG.company,
            ...(parsed.company || {}),
          },
          contact: {
            ...DEFAULT_CONFIG.contact,
            ...(parsed.contact || {}),
          },
          footer: {
            ...DEFAULT_CONFIG.footer,
            ...(parsed.footer || {}),
          },
        };
      }
    } catch (e) {
      console.error("Failed to load site config from storage:", e);
    }
    return DEFAULT_CONFIG;
  });

  // Dynamically apply selected font theme to :root CSS variables
  useEffect(() => {
    const currentThemeId = config?.fontTheme || "original";
    const found = FONT_THEMES.find((f) => f.id === currentThemeId) || FONT_THEMES[0];
    document.documentElement.style.setProperty("--font-display", found.display);
    document.documentElement.style.setProperty("--font-body", found.body);
  }, [config?.fontTheme]);

  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  });

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error("Failed to save site config:", e);
    }
  };

  const updateSection = (section, data) => {
    saveConfig({
      ...config,
      [section]: {
        ...config[section],
        ...data,
      },
    });
  };

  const toggleAppVisibility = (appId) => {
    const current = config.appVisibility[appId] !== false;
    saveConfig({
      ...config,
      appVisibility: {
        ...config.appVisibility,
        [appId]: !current,
      },
    });
  };

  const setAllAppsVisibility = (val) => {
    const updated = {};
    Object.keys(DEFAULT_CONFIG.appVisibility).forEach((id) => {
      updated[id] = val;
    });
    saveConfig({
      ...config,
      appVisibility: updated,
    });
  };

  const resetToDefaults = () => {
    saveConfig(DEFAULT_CONFIG);
  };

  const setFontTheme = (themeId) => {
    saveConfig({
      ...config,
      fontTheme: themeId,
    });
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sanibha-content-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      saveConfig({
        ...DEFAULT_CONFIG,
        ...parsed,
      });
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuth(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuth(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return (
    <SiteContentContext.Provider
      value={{
        config,
        fontThemes: FONT_THEMES,
        setFontTheme,
        updateSection,
        toggleAppVisibility,
        setAllAppsVisibility,
        resetToDefaults,
        exportJSON,
        importJSON,
        isAdminAuth,
        login,
        logout,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
};
