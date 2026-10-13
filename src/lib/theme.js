import { createContext, useContext, useState, createElement } from "react";
import { flushSync } from "react-dom";

const ThemeCtx = createContext({ theme: "dark", toggle: () => {} });

const apply = (t) => {
  const el = document.documentElement;
  el.classList.remove("light", "dark");
  el.classList.add(t);
  localStorage.setItem("sanibha-theme", t);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark"
  );

  const toggle = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    const swap = () => flushSync(() => { apply(next); setTheme(next); });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { swap(); return; }
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? 40;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(swap);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(.76,0,.24,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return createElement(ThemeCtx.Provider, { value: { theme, toggle } }, children);
};

export const useTheme = () => useContext(ThemeCtx);
