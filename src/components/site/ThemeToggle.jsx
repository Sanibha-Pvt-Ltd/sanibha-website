import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export const ThemeToggle = ({ testid = "theme-toggle-btn" }) => {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      data-testid={testid}
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      className="relative flex h-9 w-16 items-center rounded-full border hairline bg-surface/60 p-1 transition-colors hover:border-ink/30"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full prism-bg text-white shadow-lg ${dark ? "ml-auto" : ""}`}
      >
        <motion.span key={theme} initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ duration: 0.4 }}>
          {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </motion.span>
      </motion.span>
    </button>
  );
};
