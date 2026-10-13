import { useId } from "react";

export const LogoMark = ({ className = "h-8 w-8", spin = false }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F59E0B" />
          <stop offset=".5" stopColor="#EC4899" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="22" fill="none" stroke={`url(#g${id})`} strokeWidth="1.6" opacity=".55" strokeDasharray={spin ? "4 6" : "0"} />
      <path d="M32 6C32 22 42 32 58 32C42 32 32 42 32 58C32 42 22 32 6 32C22 32 32 22 32 6Z" fill={`url(#g${id})`} />
    </svg>
  );
};

export const Wordmark = () => (
  <span className="flex items-center gap-2.5">
    <LogoMark className="h-7 w-7 transition-transform duration-700 group-hover:rotate-[135deg]" />
    <span className="font-display text-lg font-semibold tracking-tight">Sanibha</span>
  </span>
);
