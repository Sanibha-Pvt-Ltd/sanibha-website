import { Signal, Wifi, BatteryFull } from "lucide-react";

export const StatusBar = ({ light = true }) => (
  <div className={`flex items-center justify-between px-2 text-[11px] font-semibold ${light ? "text-white" : "text-neutral-900"}`}>
    <span>9:41</span>
    <span className="flex items-center gap-1"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-3.5 w-3.5" /></span>
  </div>
);

export const PhoneFrame = ({ children, className = "", testid }) => (
  <div data-testid={testid} className={`relative h-[540px] w-[262px] shrink-0 rounded-[48px] bg-gradient-to-b from-neutral-700 via-neutral-900 to-neutral-800 p-[9px] shadow-phone ${className}`}>
    <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-black">
      <div className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
    <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12]" />
  </div>
);
