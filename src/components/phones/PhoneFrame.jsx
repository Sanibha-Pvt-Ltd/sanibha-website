import { Signal, Wifi, BatteryFull } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export const StatusBar = ({ light = true }) => (
  <div className={`flex items-center justify-between px-2 text-[11px] font-semibold ${light ? "text-white" : "text-neutral-900"}`}>
    <span>9:41</span>
    <span className="flex items-center gap-1">
      <Signal className="h-3 w-3" />
      <Wifi className="h-3 w-3" />
      <BatteryFull className="h-3.5 w-3.5" />
    </span>
  </div>
);

export const PhoneFrame = ({
  children,
  className = "",
  testid,
  appId,
  isComingSoon: explicitComingSoon,
}) => {
  let isComingSoon = false;
  try {
    const { isAppComingSoon } = useSiteContent() || {};
    isComingSoon = explicitComingSoon ?? (appId ? Boolean(isAppComingSoon?.(appId)) : false);
  } catch {
    isComingSoon = Boolean(explicitComingSoon);
  }

  return (
    <div
      data-testid={testid}
      className={`relative h-[540px] w-[262px] shrink-0 rounded-[48px] bg-gradient-to-b from-neutral-700 via-neutral-900 to-neutral-800 p-[9px] shadow-phone ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-black">
        {/* Dynamic Island Notch */}
        <div className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black pointer-events-none" />

        {/* Interactive App Screen Container (Blurred and frozen when Coming Soon) */}
        <div
          className={`h-full w-full transition-[filter,opacity] duration-500 ${
            isComingSoon ? "filter blur-[6px] brightness-[0.7] pointer-events-none select-none" : ""
          }`}
        >
          {children}
        </div>

        {/* Coming Soon Stamp Overlay (Frozen app window overlay) */}
        {isComingSoon && (
          <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center p-5 bg-black/30 backdrop-blur-[1px]">
            <img
              src="/img/coming-soon-stamp.png"
              alt="Coming Soon"
              className="w-[84%] max-w-[210px] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)] -rotate-[14deg] select-none"
            />
            <span className="mt-4 rounded-full border border-red-500/40 bg-black/85 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-red-300 uppercase shadow-xl backdrop-blur-md">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Screen Glare Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12]" />
    </div>
  );
};
